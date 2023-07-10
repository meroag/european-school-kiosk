import { useState } from "react"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import styles from "./card.module.scss"

const ProductDescription = () => {
  const [isProductDescriptionVisible, setIsProductDescriptionVisible] = useState(false)

  return (
    <>
        {isProductDescriptionVisible 
        ? (
            <button className={styles.infoButton} onClick={() => setIsProductDescriptionVisible(false)}>
                <SvgIcon iconName="close" />
            </button>
        ) : (
            <button className={styles.infoButton} onClick={() => setIsProductDescriptionVisible(true)}>
                <SvgIcon iconName="info" /> 
            </button>
        )}

        {isProductDescriptionVisible && <div className={styles.productDescriptionWrapper}>
            <div className={styles.productDescriptionGroup}>
                <h4>Calories</h4>
                <p>428kcal</p>
            </div>
            <div className={styles.productDescriptionGroup}>
                <h4>Ingredients</h4>
                <p>Milk, Cheese, Pepper, Carrots, Potato, Lemon</p>
            </div>
        </div>}
    </>
  )
}

export default ProductDescription
