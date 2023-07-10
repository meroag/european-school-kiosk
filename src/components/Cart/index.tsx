import { useState } from "react"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import ProductCard from "../ProductCard"
import styles from "./cart.module.scss"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Cart = () => {
    const location = useLocation()
    const { t } = useTranslation()
    const isOrderSummayPage = location.pathname == "/order-summary"
    const [isOrderListVisible, setisOrderListVisible] = useState(true)

    if(isOrderSummayPage){
        return (
            <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>{t("Order summary")}</h2>
                <ul>
                    <li>
                        {t("Products")}:
                        <span>5</span>
                    </li>
                    <li>
                        {t("Calories")}:
                        <span>850kcal</span>
                    </li>
                </ul>
                <div className={styles.totalPrice}>
                    {t("Total Price")}:
                    <span>124.99₾</span>
                </div>
            </div>
            <div className={styles.footer}>
                <button className={styles.cancelOrderBtn}>{t("GO BACK")}</button>
                <button className={styles.placeOrderBtn}>{t("FINALIZE ORDER")}</button>
            </div>
        </div>
        )
    }else{
        return (
          <div className={styles.wrapper}>
              <div className={styles.header}>
                  <h2>{t("Your order")}</h2>
                  <ul>
                  <li>
                        {t("Products")}:
                        <span>5</span>
                    </li>
                    <li>
                        {t("Calories")}:
                        <span>850kcal</span>
                    </li>
                      <li>
                        {t("Total Price")}:
                          <span>56.99₾</span>
                      </li>
                  </ul>
                    {isOrderListVisible ? <button onClick={() => setisOrderListVisible(false)}>
                        {t("HIDE ORDER")}
                        <SvgIcon 
                            wrapperStyle={styles.dropdownWrapper}
                            iconName="dropdown-arrow"
                        />
                    </button> : <button className={styles.upsidedown} onClick={() => setisOrderListVisible(true)}>
                        {t("SHOW ORDER")}
                        <SvgIcon 
                            wrapperStyle={styles.dropdownWrapper}
                            iconName="dropdown-arrow"
                        />
                    </button>}
              </div>
              {isOrderListVisible && <div className={styles.products}>
                  {Array(7).fill("").map((_, i) => (
                      <ProductCard key={i} className={styles.productCard} withRightControl={true} />
                  ))}
              </div>}
              <div className={styles.footer}>
                  <button className={styles.cancelOrderBtn}>{t("CANCEL ORDER")}</button>
                  <button className={styles.placeOrderBtn}>{t("PLACE ORDER")}</button>
              </div>
          </div>
        )
    }
}

export default Cart
