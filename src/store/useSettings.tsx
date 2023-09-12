
import create from "zustand"
import { axiosInstance, axiosOperationInstance, endpoints } from "../utils/api"
import { DriverItem, SalaroItem, StoreItem } from "../interfaces"

interface Store {
    selectedDriver: null | number
    selectedSalaroId: null | number
    selectedStoreId: null | number
    piramidaNumber: null | number

    salaros: SalaroItem[]
    stores: StoreItem[]
    drivers: DriverItem[]
    
    isPincodModalOpen: boolean
    isSettingsModalOpen: boolean
    
    setSelectedStoreId: (id: number) => void;
    setSelectedSalaroId: (id: number) => void;
    setPiramidaNumber: (val : number) => void
    setIsPincodModalOpen: (val: boolean) => void
    setIsSettingsModalOpen: (val: boolean) => void

    closeDay: () => void;
    
    getMdzgoli: () => void
    getSalaro: () => void
    getStore: () => void
}

const useSettingStore  = create<Store>((set, get) => ({
    salaros: [],
    stores: [],    
    drivers: [],
    piramidaNumber: null,

    selectedDriver: null,
    selectedStoreId: Number(localStorage.getItem("storeId")) || null,
    selectedSalaroId:  Number(localStorage.getItem("salaroId")) || null,
    isPincodModalOpen: false,
    isSettingsModalOpen: false,

    getSalaro: async () => {
        try{
            const resp = await axiosInstance.get(endpoints.GetSalaro)
            set(state => ({...state, salaros: resp.data.Salaroebi}))
        } catch(err){
            console.log(err)
        }
    },

    getStore: async () => {
        try{
            const resp = await axiosInstance.get(endpoints.GetStore)
            set(state => ({...state, stores: resp.data.Stores}))
        } catch(err){
            console.log(err)
        }
    },

    getMdzgoli: async () => {
        const resp = await axiosInstance.get(endpoints.GetMdzgoli)
        set(state => ({
            ...state, 
            drivers: resp.data.Mdzgolebi, 
            selectedDriver: resp.data.Mdzgolebi[0]["MdzgoliCode"]
        }))
    },

    closeDay: async () => {
        try{
            axiosOperationInstance.get(endpoints.CloseDay, {
                params: {
                    IdSalaro: get().selectedSalaroId
                }
            })
        } catch (err) {
            alert(err)
        }
    },

    setSelectedSalaroId: (id: number) => {
        set(state => ({...state, selectedSalaroId: id}))
        localStorage.setItem("salaroId", id.toString())
    },

    setSelectedStoreId: (id: number) => {
        set(state => ({...state, selectedStoreId: id}))
        localStorage.setItem("storeId", id.toString())
    },

    setIsPincodModalOpen(val: boolean){
        set(state => ({...state, isPincodModalOpen: val}))
    },

    setIsSettingsModalOpen(val: boolean){
        if(val == true){
            set(state => ({...state, isPincodModalOpen: false}))
        }
        set(state => ({...state, isSettingsModalOpen: val}))
    },

    setPiramidaNumber: (val) => {
        set(state => ({...state, piramidaNumber: val}))
    }
}))


export default useSettingStore