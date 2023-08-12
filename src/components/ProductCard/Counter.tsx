import { MouseEvent, useState } from "react"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import styles from "./card.module.scss"

interface CounterProps {
    amount: number;
    visible?: boolean;
    withRightControl?: boolean;

    onPlusHandle: (e: MouseEvent<HTMLButtonElement>) => void;
    onMinusHandle: (e: MouseEvent<HTMLButtonElement>) => void;
    onCancelHandle: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Counter = ({amount, visible, withRightControl, onPlusHandle, onMinusHandle, onCancelHandle}: CounterProps) => {
    const [prevAmount, setPrevAmount] = useState(0)
    const [itemAmountClass, setItemAmountClass] = useState("")

    const onPluesBtn = (e: MouseEvent<HTMLButtonElement>) => {
        if(itemAmountClass != "") return
        setPrevAmount(amount)
        !withRightControl && setItemAmountClass(styles.incremented)
        
        setTimeout(() => {
            setItemAmountClass("")
        }, 200)
        onPlusHandle(e)
    }

    const onMinusBtn = (e: MouseEvent<HTMLButtonElement>) => {
        if(itemAmountClass != "") return
        setPrevAmount(amount)
        !withRightControl && setItemAmountClass(styles.decremented)
        
        setTimeout(() => {
            setItemAmountClass("")
        }, 200)
        onMinusHandle(e)
    }
  return (
    <div className={`${visible && styles.itemCounterVisible} ${withRightControl && styles.withRightControl} ${styles.itemCounter}`}>
        {amount == 1 ? <button className={styles.cancelButton} onClick={(e) => onCancelHandle(e)}>
            <SvgIcon iconName="cancel" />
        </button> : <button className={styles.minusButton} onClick={onMinusBtn}>
            <SvgIcon iconName="minus" />
        </button>}
        {!withRightControl ? <div className={`${styles.itemAmount} ${itemAmountClass}` }>
            <span className={styles.currentValue}>{amount}</span>
            {prevAmount > 0 && <span className={styles.prevValue}>{prevAmount}</span>}
        </div> : <div className={`${styles.itemAmount}`}>
            {amount}
        </div>}
        <button className={styles.plusButton} onClick={onPluesBtn}>
            <SvgIcon iconName="plus" />
        </button>
    </div>
  )
}

export default Counter
