import { useEffect, useState } from "react"
import Select from "../../../components/Select"
import useSettingStore from "../../../store/useSettings"
import styles from "./settings.module.scss"

const SettingsModal = () => {
    const selectedSalaroId = useSettingStore(state => state.selectedSalaroId)
    const salaros = useSettingStore(state => state.salaros).map((sal) => ({id: sal.SalaroCode, label: sal.SalaroName }))   
    const [salaroId, setSalaroId] = useState(selectedSalaroId)
    const setSelectedSalaroId = useSettingStore(state => state.setSelectedSalaroId)
    const getSalaro = useSettingStore(state => state.getSalaro)
     
    
    const selectedStoreId = useSettingStore(state => state.selectedStoreId)
    const stores = useSettingStore(state => state.stores).map((store) => ({id: store.StoreCode, label: store.StoreName }))
    const [storeId, setStoreId] = useState(selectedStoreId)
    const setSelectedStoreId = useSettingStore(state => state.setSelectedStoreId)
    const getStore = useSettingStore(state => state.getStore)

    const setIsSettingsModalOpen = useSettingStore(state => state.setIsSettingsModalOpen)
    

    useEffect(() => {
        getSalaro()
        getStore()
    }, [getSalaro])


    const saveSettings = () => {
        salaroId && setSelectedSalaroId(salaroId)
        storeId && setSelectedStoreId(storeId) 
        setIsSettingsModalOpen(false)
    }
    
  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Settings</h2>

            <div className={styles.selectsWrapper}>
                <div className={styles.selectGroup}>
                    <span>{"Select Salaro"}</span>
                    <Select options={salaros} selecedItemId={salaroId} onOptionHandle={(id) => setSalaroId(id)}/>
                </div>

                <div className={styles.selectGroup}>
                    <span>{"Select Stores"}</span>
                    <Select options={stores} selecedItemId={storeId} onOptionHandle={(id) => setStoreId(id)}/>
                </div>
            </div>

            <div className={styles.footerWrapper}>
                <button className={styles.saveBtn} onClick={saveSettings}>SAVE</button>
                <button className={styles.cancelBtn} onClick={() => setIsSettingsModalOpen(false)}>CANCEL</button>
            </div>
        </div>
    </div>
  )
}

export default SettingsModal