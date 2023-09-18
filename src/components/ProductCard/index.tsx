import { MouseEvent } from "react"
import Counter from "./Counter"
import styles from "./card.module.scss"
import ProductDescription from "./ProductDescription"
import NotInStock from "./NotInStock"
import { Product } from "../../interfaces"
import useCartStore from "../../store/useCartStore"
import { useTranslation } from "react-i18next"
import useStore from "../../store/store"
import useSettingStore from "../../store/useSettings"

interface ProductCardProps {
    product: Product; 
    className?: string;
    withRightControl?: boolean;
}
const ProductCard = ({product,className, withRightControl}:ProductCardProps) => {
    const { i18n } = useTranslation()
    
    const productsNashti = useStore(state => state.productsNashti)
    const storeCode = useSettingStore(state => state.selectedStoreId)

    const productNashti = productsNashti
    .find(store => store.StoreCode == storeCode?.toString() )
    ?.ProdNashtebi.find(pr => pr.ProdCode == product.ProdCode)?.Nashti || 0

    const productAmount = useCartStore(state => state.getProductAmount(product.ProdCode))
    const addProductInCart = useCartStore(state => state.addProductInCart)
    const increaseProductAmount = useCartStore(state => state.increaseProductAmount)
    const decreaseProductAmount = useCartStore(state => state.decreaseProductAmount)
    const deleteProductFromCart = useCartStore(state => state.deleteProductFromCart)

    const onImageWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
        console.log(productAmount, productNashti)
        if(withRightControl || productNashti <= 0) return;

        if(!productAmount){
            addProductInCart(product)
        }

        e.preventDefault()
    }

    const onPlusHandle = (e: MouseEvent<HTMLButtonElement>) => {
        increaseProductAmount(product.ProdCode)   
        e.stopPropagation()
    }
    
    const onCancelHandle = (e: MouseEvent<HTMLButtonElement>) => {
        deleteProductFromCart(product.ProdCode, true)   
        e.stopPropagation()
    }

    const onMinusHandle = (e: MouseEvent<HTMLButtonElement>) => {
        decreaseProductAmount(product.ProdCode)   
        e.stopPropagation()
    }
    
    const productImage = `https://fmg.mark4.ge/api/GetProductPicture?ProdCode=${product.ProdCode}`
    
  return (
    <div className={`${styles.productCardWrapper} ${className} ${withRightControl && styles.rightControll}`}>
        <div className={`${styles.imageWrapper}`} 
            onClick={onImageWrapperClick}
        >
            <img src={productImage || "/images/product.png"} alt="" />
            {productAmount && <Counter 
                amount={productAmount.amount}
                maxAmount={productNashti}
                visible={true}
                withRightControl={withRightControl} 
                onPlusHandle={onPlusHandle} 
                onMinusHandle={onMinusHandle} 
                onCancelHandle={onCancelHandle} 
            />}
            {!withRightControl && <ProductDescription product={product} />}
            {productNashti == 0 && <NotInStock />}
        </div>
        <div className={styles.contentWrapper}>
            <h3>{i18n.language == "en" ? product.ProductNameENG : product.ProductName}</h3>
            <span>{product.Fasi1.toFixed(2)}₾</span>
        </div>
    </div>
  )
}

export default ProductCard
