import { MouseEvent, useState } from "react"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import styles from "./card.module.scss"

interface CounterProps {
    amount: number;
    visible?: boolean;
    withRightControl?: boolean;
    maxAmount: number

    onPlusHandle: (e: MouseEvent<HTMLButtonElement>) => void;
    onMinusHandle: (e: MouseEvent<HTMLButtonElement>) => void;
    onCancelHandle: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Counter = ({amount,maxAmount, withRightControl, onPlusHandle, onMinusHandle, onCancelHandle}: CounterProps) => {
    const [prevAmount, setPrevAmount] = useState(0)
    const [itemAmountClass, setItemAmountClass] = useState("")
    const [visible, setVisible] = useState(true)

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

    const onCancelBtn = (e: MouseEvent<HTMLButtonElement>) => {
        if(withRightControl){
            onCancelHandle(e)
        }else{
            setVisible(false)
            setTimeout(() => {
                onCancelHandle(e)
            }, 200)
        }
        
    }
  return (
    <div className={`${visible ? styles.itemCounterVisible : styles.itemCounterUnvisible} ${withRightControl && styles.withRightControl} ${styles.itemCounter}`}>
        {amount == 1 ? <button className={styles.cancelButton} onClick={onCancelBtn}>
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
        <button className={styles.plusButton} onClick={onPluesBtn} disabled={amount >= maxAmount}>
            <SvgIcon iconName="plus" />
        </button>
    </div>
  )
}

export default Counter
