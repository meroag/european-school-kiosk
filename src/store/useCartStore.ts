import { create } from "zustand";
import { Product } from "../interfaces";
import { axiosInstance, axiosOperationInstance, endpoints } from "../utils/api";
import useSettingStore from "./useSettings";
import useStore from "./store";

interface Store {
    productsByAmount: {
        amount: number,
        id: string | number
    }[],
    products: Product[];

    savedOrderId: null | number,

    getProductAmount: (id: string | number) => {
        amount: number,
        id: string | number
    } | null;
    addProductInCart: (product: Product) => void;
    
    increaseProductAmount: (id: number | string) => void
    decreaseProductAmount: (id: number | string) => void
    deleteProductFromCart: (id: number | string) => void

    checkCartProducts: () => Promise<{status: true, product: null} | {status: false, product: Product | null}>;
    saveOrder: () => any
    payOrders: (orderId: number) => void

    finalizeOrder: () => void
    sale: (ip: string, id: string, amount: number) => void
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
    savedOrderId: null
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
        if(get().productsByAmount.length == 0 && window.location.pathname == "/order-summary"){
            window.location.pathname = "/products"
        }
    },

    getTotalPrice: () => {
        const products = get().products 
        const productsByAmount = get().productsByAmount
      
        return productsByAmount.reduce((state, pr) => {
          const productPrice = products.find(p => p.ProdCode == pr.id)?.Fasi1 || 0
          const productCal = Number(products.find(p => p.ProdCode == pr.id)?.Description2) || 0
      
          const newPrice = state.price + ((productPrice * 100) * pr.amount) / 100
            
          return {
            products: state.products + pr.amount,
            calories: state.calories + productCal * pr.amount,
            price: newPrice
          }
        }, {
          price: 0,
          calories: 0,
          products: 0,
        })
    },

    checkCartProducts: async () => {
        const storeCode = useSettingStore.getState().selectedStoreId 
        const productsByAmount = get().productsByAmount

        const promises = productsByAmount.map((pr) => {
            return axiosInstance.get(endpoints.GetProdNashti, {
                params: {
                    StoreCode: storeCode,
                    ProdCode: pr.id
                }
            })
        })

        let index = 0
        for await( const product of promises){
            const productInCart = productsByAmount[index]
            if(product.data.StoreProdNashtebi[0]["ProdNashtebi"]
            .find((pr: any) => pr.ProdCode == productInCart.id)
            ?.Nashti < productInCart.amount){

                const product = get().products.find(pr => pr.ProdCode == productInCart.id)
                get().deleteProductFromCart(productInCart.id)

                if(product){
                    return {
                        status: false,
                        product: product
                    }    
                }else{
                    alert("something went wrong")
                    return {
                        status: false,
                        product: null
                    }    
                }
            }

            index++
        }


        return {
            status: true,
            product: null
        }
    },

    payOrders: async (orderId: number) => {
        try{
            const storeCode = useSettingStore.getState().selectedStoreId 
            const salaroId = useSettingStore.getState().selectedSalaroId 
            const cliendId = useStore.getState()?.user?.ClientId

            const total = get().getTotalPrice()

            const payOrderModel = {
                "PaymentId": 0,
                "Date": new Date().toISOString(),
                "PaymentNumber": "",
                "InvoiceNumber": "",
                "ClientId": cliendId,
                "CashDrawerId": salaroId,
                "PaymentTypeId": 0,
                "PurchaseType": "",
                "StoreId": storeCode,
                "Amount": parseFloat( total.price.toFixed(2) ),
                "Comment": ""
            }

    
            await axiosOperationInstance.post(endpoints.PayOrders, payOrderModel, {
                params: {
                    orderID: orderId
                }
            })
        } catch (err) {
            console.log(err)
        }
    },

    saveOrder: async () => {
        const storeCode = useSettingStore.getState().selectedStoreId 
        const driverCode = useSettingStore.getState().selectedDriver 
        const cliendId = useStore.getState()?.user?.ClientId
        
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

        const resp = await axiosOperationInstance.post(endpoints.SaveOrder, saveOrderBody)
        const orderId = resp.data.data[0]["OrderId"]
        return orderId
    },

    sale: async (ip, id, amount) => {
        // @ts-ignore: Unreachable code error
        let price = amount < 1 ? amount.toFixed(2).replace(".", "") : amount.toFixed(2) * 100
    
        const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
        <request>
            <field id="00">${price}</field>
            <field id="04">981</field>
            <field id="21">20150729121815</field>
            <field id="25">1</field>
            <field id="26"> </field>
            <field id="27">${id}</field>
        </request>`;
        
        return fetch(ip, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/xml'
          },
          body: xmlBody
        })
    },

    finalizeOrder: async () => {
        try {
            const orderId = await get().saveOrder()
            set((state) => ({...state, savedOrderId: orderId}))
        } catch (err) {
            console.log(err)
        }

    },

    resetStates: () => set(initialState)
}))

export default useCartStore