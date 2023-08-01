import {useState} from "react"
import styles from "./pincode.module.scss"
import SvgIcon from "../../../vendor/svgr/SvgIcon"
import useSettingStore from "../../../store/useSettings"

const PASSWORD = "18170"

const PincodeModal = () => {
    const [input, setInput] = useState("")
    const setIsSettingsModalOpen = useSettingStore(state => state.setIsSettingsModalOpen)
    const setIsPincodModalOpen = useSettingStore(state => state.setIsPincodModalOpen)

    const onSaveHandle = () => {
        if(input == PASSWORD){
            setIsSettingsModalOpen(true)
        }
    }

  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Pin code</h2>
            <div className={styles.modalInput}>{input}</div>
            <div className={styles.pins}>
                {Array(9).fill("").map((_,i) => (
                    <button className={styles.pinBtn} onClick={() => setInput(input + i++)} key={i}>{++i}</button>
                ))}
                <button className={styles.pinBtn} onClick={() => setInput(input.slice(0, -1))}>
                    <SvgIcon iconName="clear-last" />
                </button>
                <button className={styles.pinBtn} onClick={() => setInput(input + 0)}>0</button>
                <button className={styles.pinBtn} onClick={() => setInput("")}>
                    <SvgIcon iconName="clear" />
                </button>
            </div>
            <div className={styles.footerWrapper}>
                <button className={styles.saveBtn} onClick={onSaveHandle}>OK</button>
                <button className={styles.cancelBtn} onClick={() => setIsPincodModalOpen(false)}>CANCEL</button>
            </div>
        </div>
    </div>
  )
}

export default PincodeModal