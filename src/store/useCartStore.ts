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
    deleteProductFromCart: (id: number | string, withredirect: boolean) => void

    checkCartProducts: () => any;
    saveOrder: () => any
    payOrders: () => void

    finalizeOrder: () => Promise<number>
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

    deleteProductFromCart: (id: number | string, withredirect = true) => {
        set((state) => ({...state, products: state.products.filter(pr => pr.ProdCode != id) }))
        set((state) => ({...state, productsByAmount: state.productsByAmount.filter(pr => pr.id != id) }))
        if(withredirect && get().productsByAmount.length == 0 && window.location.pathname == "/order-summary"){
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
            return new Promise(async (res) => {
                const product = await axiosInstance.get(endpoints.GetProdNashti, {
                    params: {
                        StoreCode: storeCode,
                        ProdCode: pr.id
                    }
                })

                const productInCart = pr
                const nashti = product.data.StoreProdNashtebi[0]?.ProdNashtebi?.find((pr: any) => pr.ProdCode == productInCart.id)?.Nashti || -1
                
                if(product.data.StoreProdNashtebi.length == 0 || (nashti > 0  && nashti < productInCart.amount)){
                    const product = get().products.find(pr => pr.ProdCode == productInCart.id)
                    get().deleteProductFromCart(productInCart.id, false)
    
                    res({
                        status: false,
                        product: product
                    })
                }else{
                    res({
                        status: true,
                        product: null
                    })
                }
            } ) 
        })

        const values = await Promise.all(promises)

        const erroredProduct = values.find((v: any) => v.status == false )
        if(erroredProduct){
            return erroredProduct
        }else{
            return {
                status: true,
                product: null
            }
        }
        // for ( const product of promises){
        //     const productInCart = productsByAmount[index]

        //     const nashti = product.data.StoreProdNashtebi[0]?.ProdNashtebi?.find((pr: any) => pr.ProdCode == productInCart.id)?.Nashti || -1
            
        //     if(product.data.StoreProdNashtebi.length == 0 || (nashti > 0  && nashti < productInCart.amount)){

        //         const product = get().products.find(pr => pr.ProdCode == productInCart.id)
        //         get().deleteProductFromCart(productInCart.id)

        //         if(product){
        //             return {
        //                 status: false,
        //                 product: product
        //             }    
        //         }else{
        //             alert("something went wrong")
        //             return {
        //                 status: false,
        //                 product: null
        //             }    
        //         }
        //     }

        //     index++
        // }



    },

    payOrders: async () => {
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
                    orderID: get().savedOrderId
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
        const piramidaNumber = useSettingStore.getState().piramidaNumber 
        
        const saveOrderBody: any = {
            "OrderId": 0,
            ClientId: cliendId,
            "Date": new Date().toISOString(),
            "StoreId": storeCode,
            "DriverID": driverCode,
            "Comment": `${piramidaNumber || ""}`,
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
            return orderId
        } catch (err) {
            console.log(err)
            return 0
        }

    },

    resetStates: () => set(initialState)
}))

export default useCartStore