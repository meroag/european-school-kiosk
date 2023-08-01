import { useRef, useState } from "react"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import styles from "./select.module.scss"
import { useOutsideClick } from "../../hooks/useOutsideClick"

interface Option {
    id: number
    label: string
} 

interface SelectProps {
    selecedItemId: null | number,
    options: Option[];
    onOptionHandle: (id: number) => void
}

const Select = ({options, onOptionHandle, selecedItemId}: SelectProps) => {
    const [isSelectBodyOpen, setIsSelectBodyOpen] = useState(false)
    const [selecedId, setSelecedId] = useState(selecedItemId)
    const selectRef = useRef(null)

    useOutsideClick(selectRef, () => setIsSelectBodyOpen(false))

    const onOptionClick = (id: number) => {
        setSelecedId(id)
        setIsSelectBodyOpen(false)
        onOptionHandle(id)
    }

  return (
    <div className={styles.selectWrapper} ref={selectRef}>
        <div className={styles.selectHead} onClick={() => setIsSelectBodyOpen(!isSelectBodyOpen)}>
            <span className={styles.selectHeadValue}>{options.find(opt => opt.id == selecedId)?.label || "Select"}</span>
            <button className={styles.selectHeadBtn}>
                <SvgIcon iconName="anchor" />
            </button>
        </div>
        {isSelectBodyOpen && <div className={styles.selectBody}>
            <ul className={styles.selectOptions}>
                {options.map((option) => (
                    <li className={`${styles.selectOption} ${styles.selectOptionActive}`} key={option.id} onClick={() => onOptionClick(option.id)}>{option.label}</li>
                ))}
            </ul>
        </div>}
    </div>
  )
}

export default Select