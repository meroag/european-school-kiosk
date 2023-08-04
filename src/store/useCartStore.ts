import { create } from "zustand";
import { Product } from "../interfaces";
import { axiosInstance, axiosOperationInstance, endpoints } from "../utils/api";
import useSettingStore from "./useSettings";
import useStore from "./store";
import useCartTotal from "../hooks/useCartTotal";

interface Store {
    productsByAmount: {
        amount: number,
        id: string | number
    }[],
    products: Product[];

    getProductAmount: (id: string | number) => {
        amount: number,
        id: string | number
    } | null;
    addProductInCart: (product: Product) => void;
    
    increaseProductAmount: (id: number | string) => void
    decreaseProductAmount: (id: number | string) => void
    deleteProductFromCart: (id: number | string) => void
    finalizeOrder: () => void
    getTotalPrice: () =>  {
        products: number,
        calories: number,
        price: number
    }

    resetStates: () => void
}

const initialState = {
    productsByAmount: [],
    products: [],
} 

const useCartStore = create<Store>((set, get) => ({
    ...initialState,

    getProductAmount: (id: string | number) => {
        return get().productsByAmount.find(pr => pr.id == id) || null
    },

    increaseProductAmount: (id: number | string) => {
        set((state) =>({...state, productsByAmount: state.productsByAmount.map(pr => pr.id == id ? {...pr, amount: pr.amount + 1} : pr)}))
    },

    decreaseProductAmount: (id: number | string) => {
        set((state) =>({...state, productsByAmount: state.productsByAmount.map(pr => pr.id == id ? {...pr, amount: pr.amount - 1} : pr)}))
    },

    addProductInCart: (product: Product) => {
        set((state) => ({...state, products: [...state.products, product]}))
        set((state) => ({...state, productsByAmount: [...state.productsByAmount,  {
            amount: 1,
            id: product.ProdCode
        }]}))
    },

    deleteProductFromCart: (id: number | string) => {
        set((state) => ({...state, products: state.products.filter(pr => pr.ProdCode != id) }))
        set((state) => ({...state, productsByAmount: state.productsByAmount.filter(pr => pr.id != id) }))
    },

    getTotalPrice: () => {
        const products = get().products 
        const productsByAmount = get().productsByAmount
      
        return productsByAmount.reduce((state, pr) => {
          const productPrice = products.find(p => p.ProdCode == pr.id)?.Fasi1 || 0
          const productCal = Number(products.find(p => p.ProdCode == pr.id)?.Description2) || 0
      
          return {
            products: state.products + pr.amount,
            calories: state.calories + productCal * pr.amount,
            price: state.price + productPrice * pr.amount
          }
        }, {
          price: 0,
          calories: 0,
          products: 0,
        })
    },

    finalizeOrder: async () => {
        interface finalizeOrderBodyDetail {
            "Id": number,
            "ProductId": string | number,
            "ProductName": string,
            "Quantity": number,
            "Price": number,
            "Total": number
        }

        const storeCode = useSettingStore.getState().selectedStoreId 
        const saalroId = useSettingStore.getState().selectedSalaroId 
        const driverCode = useSettingStore.getState().selectedDriver 
        const cliendId = useStore.getState()?.user?.ClientId

        if(!storeCode || !driverCode) return alert("Sometging went wrong")
        
        const saveOrderBody: any = {
            "OrderId": 0,
            ClientId: cliendId,
            "Date": new Date().toISOString(),
            "StoreId": storeCode,
            "DriverID": driverCode,
            "Comment": "",
            NeedsTransportation: true,
            "TransportationAddress": "",
            "SenderName": "",
            "ReceiverName": "",
            CarNumber: "",
            "EmployeeId": 1,
            "Details": []
        }
        const products = get().products
        get().productsByAmount.forEach((pr) => {
            const product = products.find(product => product.ProdCode == pr.id)
            if(product){
                saveOrderBody.Details.push({
                    Id: 0,
                    ProductId: pr.id,
                    ProductName: product.ProductName,
                    Quantity: pr.amount,
                    Price: product.Fasi1,
                    Total: product.Fasi1 * pr.amount
                })
            }
        })

        try{
            const resp = await axiosOperationInstance.post(endpoints.SaveOrder, saveOrderBody)
            const obj = resp.data.data[0]
            const total = get().getTotalPrice()
            console.log(total)

            const payOrderModel = {
                "PaymentId": 0,
                "Date": new Date().toISOString(),
                "PaymentNumber": "",
                "InvoiceNumber": "",
                "ClientId": cliendId,
                "CashDrawerId": saalroId,
                "PaymentTypeId": 0,
                "PurchaseType": "",
                "StoreId": storeCode,
                "Amount": total.price,
                "Comment": ""
              }

    
                const data = await axiosOperationInstance.post(endpoints.PayOrders, payOrderModel, {
                    params: {
                        orderID: obj.OrderId
                    }
                })
        } catch (err) {
            console.log(err)
        }
    },

    resetStates: () => set(initialState)
}))

export default useCartStore