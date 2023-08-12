import ProductCard from "../ProductCard"
import styles from "./cart.module.scss"
import { useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import "./cart.scss"
import { FreeMode } from 'swiper/modules';
import useCartStore from "../../store/useCartStore";
import useCartTotal from "../../hooks/useCartTotal";

const CartHeader = () => {
    const { t } = useTranslation()
    // const total = useCartTotal()
    const total = useCartStore(state => state.getTotalPrice())
    
    return (
        <div className={styles.header}>
            <h2>{t("Order summary")}</h2>
            <ul>
                <li>
                    {t("Products")}:
                    <span>{total.products}</span>
                </li>
                <li>
                    {t("Calories")}:
                    <span>{total.calories}kcal</span>
                </li>
            </ul>
            <div className={styles.totalPrice}>
                {t("Total Price")}:
                <span>{total.price.toFixed(2)}₾</span>
            </div>
        </div>
    )
}

const Cart = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const { t } = useTranslation()
    const isOrderSummayPage = location.pathname == "/order-summary"

    const products = useCartStore(state => state.products)
    const resetStates = useCartStore(state => state.resetStates)
    const finalizeOrder = useCartStore(state => state.finalizeOrder)
    
    const onOrderClick = () => {
        navigate("/order-summary")
    }

    const onGoBackClick = () => {
        navigate("/products")
    }

    const onCancelOrder = () => {
        resetStates()
        navigate("/")
    }

    const onFinalizeOrder = () => {
        finalizeOrder()
    }

    return (
        <div className={`${styles.wrapper} ${isOrderSummayPage && styles.onOrerPage}`}>
        <CartHeader />
        {isOrderSummayPage ? <>
            <div className={styles.footer}>
                <button className={styles.cancelOrderBtn} onClick={onGoBackClick}>{t("GO BACK")}</button>
                <button className={styles.placeOrderBtn} onClick={onFinalizeOrder}>{t("FINALIZE ORDER")}</button>
            </div>
        </> : <>
            <div className={styles.products} >
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={80}
                freeMode={true}
                pagination={{
                clickable: true,
                }}
                modules={[FreeMode]}
                className="mySwiper"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.ProdCode}>
                        <ProductCard className={styles.productCard} withRightControl={true} product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
            <div className={styles.footer}>
                <button className={styles.cancelOrderBtn} onClick={onCancelOrder}>{t("CANCEL ORDER")}</button>
                <button className={styles.placeOrderBtn} disabled={products.length == 0} onClick={onOrderClick}>{t("ORDER")}</button>
            </div>
        </>}
        </div>
    )
}

export default Cart
