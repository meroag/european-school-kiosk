import { useState, MouseEvent } from "react"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import styles from "./card.module.scss"
import { Product } from "../../interfaces"
import { useTranslation } from "react-i18next"

const ProductDescription = ({product}: {product: Product }) => {
    const { t, i18n } = useTranslation()
  const [isProductDescriptionVisible, setIsProductDescriptionVisible] = useState(false)

  const infoButtonHandle = (e: MouseEvent<HTMLButtonElement>) => {
    setIsProductDescriptionVisible(!isProductDescriptionVisible)
    e.stopPropagation()
  }

  return (
    <>
        {isProductDescriptionVisible 
        ? (
            <button className={styles.closeButton} onClick={infoButtonHandle}>
                <SvgIcon iconName="close" />
            </button>
        ) : (
            <button className={styles.infoButton} onClick={infoButtonHandle}>
                <SvgIcon iconName="info" /> 
            </button>
        )}

        {isProductDescriptionVisible && <div className={styles.productDescriptionWrapper}>
            <div className={styles.productDescriptionGroup}>
                <h4>{t("Calories")}</h4>
                <p>{product.Description2}kcal</p>
            </div>
            <div className={styles.productDescriptionGroup}>
                <h4>{t("Ingredients")}</h4>
                <p>{i18n.language == "en" ? product.Description3 : product.Description1}</p>
            </div>
        </div>}
    </>
  )
}

export default ProductDescription
