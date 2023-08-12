
import create from "zustand"
import { axiosAutorization, axiosInstance, endpoints } from "../utils/api"
import { ProdGroup, Product, ProductsNashti } from "../interfaces"
import useSettingStore from "./useSettings"

interface Store {
    user: {
        ClientId: number,
        name: string,
        token: string,
    } | null
    isAutorized: boolean
    avaibleProducts: any
    products: Product[];
    categories: ProdGroup[];
    productsNashti: ProductsNashti[]
    selectedCategoryId: null | number,

    setSelectedCategoryId: (id: number) => void;
    autorization: () => void
    getProducts: (idProdGroup : number) => void
    getProdGroup: () => void;
    getProdNashti: () => void
}

const useStore  = create<Store>((set) => ({
    isAutorized: false,
    avaibleProducts: [],
    user: null,
    
    products: [],
    categories: [],
    productsNashti: [],

    selectedCategoryId: null,

    setSelectedCategoryId: (id: number) => {
        set((state) => ({...state, selectedCategoryId: id}))
    },

    autorization: async () => {
        const resp = await axiosAutorization.get(endpoints.Autorization, {
            params: {
                UserName: "mark4",
                UserPass: "bg#123456",
            }
        })
        const token = resp.data.token
        localStorage.setItem("markToken", token)
        set((state) => ({...state, user: resp.data, isAutorized: true}))
    },

    getProducts: async (categoryId: number) => {
        try{
            const res = await axiosInstance.get(endpoints.GetProduct, {
                params: {
                    IdProdGroup: categoryId
                }
            })
            set((state) => ({...state, products: res.data.Products}))
        }
        catch (error){
            console.log(error)
        }
    },

    getProdNashti: async () => {
        const storeCode = useSettingStore.getState().selectedStoreId
        try{
            const res = await axiosInstance.get(endpoints.GetProdNashti, {
                params: {
                    StoreCode: storeCode 
                }
            })
            set((state) => ({...state, productsNashti: res.data.StoreProdNashtebi}))
        }
        catch (error){
            console.log(error)
        }
    },

    getProdGroup: async () => {
        try{
            const res = await axiosInstance.get(endpoints.GetProdGroup, {
                params: {
                    showInToch: true
                }
            })
            set((state) => ({...state, categories: res.data.ProdGroups}))
        }
        catch (error){
            console.log(error)
        }
    }
}))

export default useStore