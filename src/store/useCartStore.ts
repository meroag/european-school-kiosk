import { create } from "zustand";
import { Product } from "../interfaces";
import { axiosInstance, axiosOperationInstance, endpoints } from "../utils/api";
import useSettingStore from "./useSettings";

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

    finalizeOrder: () => {
        interface finalizeOrderBodyDetail {
            "Id": number,
            "ProductId": string | number,
            "ProductName": string,
            "Quantity": number,
            "Price": number,
            "Total": number
        }

        interface finalizeOrderBody {
            OrderId: number,
            StoreId: number,
            // "StoreName": "string",
            DriverID: number,
            // "Driver": "string",
            Details: finalizeOrderBodyDetail[]
        }  

        const storeCode = useSettingStore.getState().selectedStoreId 
        const driverCode = useSettingStore.getState().selectedDriver 

        if(!storeCode || !driverCode) return alert("Sometging went wrong")

        // {
        //     "OrderId": 0,
        //     "Date": "2023-08-01T13:38:52.275Z",
        //     "InvoiceNumber": "string",
        //     "OrderTypeId": 0,
        //     "OrderType": "string",
        //     "StoreId": 0,
        //     "StoreName": "string",
        //     "ClientId": 0,
        //     "ClientName": "string",
        //     "EmployeeId": 0,
        //     "Employee": "string",
        //     "DriverID": 0,
        //     "Driver": "string",
        //     "CarNumber": "string",
        //     "TransportationAddress": "string",
        //     "NeedsTransportation": true,
        //     "SenderName": "string",
        //     "ReceiverName": "string",
        //     "WayBillId": 0,
        //     "Comment": "string",
        //     "Details": [
        //       {
        //         "Id": 0,
        //         "ProductId": "string",
        //         "ProductName": "string",
        //         "Quantity": 0,
        //         "Price": 0,
        //         "Total": 0,
        //         "Points": 0,
        //         "ActionsId": "string",
        //         "ProdVariation": "string"
        //       }
        //     ]
        // }
        
        const body: any = {
            "OrderId": 0,
            ClientId: "4395",
            ClientName: "WebSite კლიენტი",
            "Date": new Date().toISOString(),
            "StoreId": storeCode,
            // "StoreName": "string",
            "DriverID": driverCode,
            // "Driver": "string",
            "Comment": "",
            NeedsTransportation: true,
            "TransportationAddress": "",
            "SenderName": "",
            "ReceiverName": "",
            CarNumber: "",
            "EmployeeId": 1,
            "Employee": "-",
            "Details": []
            // "Details": [
            //     {
            //     "Id": 0,
            //     "ProductId": "string",
            //     "ProductName": "string",
            //     "Quantity": 0,
            //     "Price": 0,
            //     "Total": 0,
            //     "Points": 0,
            //     "ProdVariation": "string"
            //     }
            // ]
        }
        // const body = {
        //     "OrderId": 0,
        //     "Date": '2023-08-01T13:55:34.410Z',
        //     "InvoiceNumber": "", 
        //     "OrderTypeId": 0, 
        //     "OrderType": "",  
        //     "StoreId": 3,
        //     "StoreName": "102/103 ZVE",
        //     "ClientId": 4395,
        //     "ClientName": "WebSite კლიენტი",
        //     "EmployeeId": 0, 
        //     "Employee": "", 
        //     "DriverID": 1,
        //     "Driver": "-",
        //     "CarNumber": "",
        //     "TransportationAddress": "",
        //     "NeedsTransportation": true,
        //     "SenderName": "",
        //     "ReceiverName": "",
        //     "WayBillId": 0,
        //     "Comment": "",
        //     "Details": [
        //         {
        //             "Id": 0,
        //             "ProductId": "1022",
        //             "ProductName": "ჰელიუმის ბუშტი სადა N1",
        //             "Quantity": 1,
        //             "Price": 2,
        //             "Total": 2
        //         }
        //     ]
        // }
        const products = get().products
        get().productsByAmount.forEach((pr) => {
            const product = products.find(product => product.ProdCode == pr.id)
            if(product){
                body.Details.push({
                    Id: 0,
                    ProductId: pr.id,
                    ProductName: product.ProductName,
                    Quantity: pr.amount,
                    Price: product.Fasi1,
                    Total: product.Fasi1 * pr.amount
                })
            }
        })

        axiosOperationInstance.post(endpoints.SaveOrder, body)
    },

    resetStates: () => set(initialState)
}))

export default useCartStore