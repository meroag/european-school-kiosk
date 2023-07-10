import { useState } from "react"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import styles from "./card.module.scss"

interface CounterProps {
    visible: boolean;
    withRightControl?: boolean;
}

const Counter = ({visible, withRightControl}: CounterProps) => {
    const [count, setCount] = useState(1)

  return (
    <div className={`${visible && styles.itemCounterVisible} ${withRightControl && styles.withRightControl} ${styles.itemCounter}`}>
        {count == 1 ? <button className={styles.cancelButton}>
            <SvgIcon iconName="cancel" />
        </button> : <button className={styles.minusButton}>
            <SvgIcon iconName="minus" />
        </button>}
        <span className={styles.itemAmount}>1</span>
        <button className={styles.plusButton}>
            <SvgIcon iconName="plus" />
        </button>
    </div>
  )
}

export default Counter
