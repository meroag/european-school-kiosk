import { useTranslation } from "react-i18next"
import Layout from "../../components/Layout"
import ProductCard from "../../components/ProductCard"
import styles from "./order-summary.module.scss"

const OrderSummary = () => {
    const { t } = useTranslation()
  return (
    <Layout>
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <img src="/logo.png" alt="" />
                <h1>{t("European School Cafe")}</h1>
            </div>
            <div className={styles.orderWrapper}>
                <h2>{t("Order summary")}</h2>
                <div className={styles.orderList}>
                    {Array(8).fill("").map((_,i) => (
                        <ProductCard withRightControl={true} key={i} />
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default OrderSummary
