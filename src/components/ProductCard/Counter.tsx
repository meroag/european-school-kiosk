import { MouseEvent } from "react"
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

  return (
    <div className={`${visible && styles.itemCounterVisible} ${withRightControl && styles.withRightControl} ${styles.itemCounter}`}>
        {amount == 1 ? <button className={styles.cancelButton} onClick={(e) => onCancelHandle(e)}>
            <SvgIcon iconName="cancel" />
        </button> : <button className={styles.minusButton} onClick={(e) => onMinusHandle(e)}>
            <SvgIcon iconName="minus" />
        </button>}
        <span className={styles.itemAmount}>{amount}</span>
        <button className={styles.plusButton} onClick={(e) => onPlusHandle(e)}>
            <SvgIcon iconName="plus" />
        </button>
    </div>
  )
}

export default Counter
