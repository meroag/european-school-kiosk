
import create from "zustand"
import { axiosAutorization, axiosInstance, endpoints } from "../utils/api"
import { ProdGroup, Product, ProductsNashti } from "../interfaces"

interface Store {
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
        set((state) => ({...state, isAutorized: true}))
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
        try{
            const res = await axiosInstance.get(endpoints.GetProdNashti)
            set((state) => ({...state, productsNashti: res.data.StoreProdNashtebi}))
        }
        catch (error){
            console.log(error)
        }
    },

    getProdGroup: async () => {
        try{
            const res = await axiosInstance.get(endpoints.GetProdGroup)
            set((state) => ({...state, categories: res.data.ProdGroups.filter((prod:ProdGroup) => prod.IdProdGroup == 281)}))
        }
        catch (error){
            console.log(error)
        }
    }
}))

export default useStore