import {useState, MouseEvent} from "react"
import styles from "./piramida.module.scss"
import SvgIcon from "../../../vendor/svgr/SvgIcon"
import useSettingStore from "../../../store/useSettings"
import { useNavigate } from "react-router-dom"

interface PiramidaModal {
    close: () => void
}
const PiramidaModal = ({close}: PiramidaModal) => {
    const navigate = useNavigate()
    const [input, setInput] = useState("")

    const setPiramidaNumber = useSettingStore(state => state.setPiramidaNumber)

    const onSaveHandle = () => {
        setPiramidaNumber(Number(input))
        navigate("/products")
    }

    const onClose = () => {
        close()
        navigate("/products")
    }

  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Piramida Number</h2>
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
                <button className={styles.saveBtn} onClick={onSaveHandle} disabled={input.length == 0}>OK</button>
                <button className={styles.cancelBtn} onClick={onClose}>CANCEL</button>
            </div>
        </div>
    </div>
  )
}

export default PiramidaModal