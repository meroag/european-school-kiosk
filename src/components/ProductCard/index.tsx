import { MouseEvent } from "react"
import Counter from "./Counter"
import styles from "./card.module.scss"
import ProductDescription from "./ProductDescription"
import NotInStock from "./NotInStock"
import { Product } from "../../interfaces"
import useCartStore from "../../store/useCartStore"
import { useTranslation } from "react-i18next"

interface ProductCardProps {
    product: Product; 
    className?: string;
    withRightControl?: boolean;
}
const ProductCard = ({product,className, withRightControl}:ProductCardProps) => {
    const { i18n } = useTranslation()
    const isInStock = false
    
    const productAmount = useCartStore(state => state.getProductAmount(product.ProdCode))
    const addProductInCart = useCartStore(state => state.addProductInCart)
    const increaseProductAmount = useCartStore(state => state.increaseProductAmount)
    const decreaseProductAmount = useCartStore(state => state.decreaseProductAmount)
    const deleteProductFromCart = useCartStore(state => state.deleteProductFromCart)

    const onImageWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
        if(withRightControl) return;

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
        deleteProductFromCart(product.ProdCode)   
        e.stopPropagation()
    }

    const onMinusHandle = (e: MouseEvent<HTMLButtonElement>) => {
        decreaseProductAmount(product.ProdCode)   
        e.stopPropagation()
    }
    
    const productImage = `http://app.mark4.ge:8520/api/GetProductPicture?ProdCode=${product.ProdCode}`
  return (
    <div className={`${styles.productCardWrapper} ${className}`}>
        <div className={styles.imageWrapper} 
            onClick={onImageWrapperClick}
        >
            <img src={productImage || "/images/product.png"} alt="" />
            {productAmount && <Counter 
                amount={productAmount.amount}
                visible={true}
                withRightControl={withRightControl} 
                onPlusHandle={onPlusHandle} 
                onMinusHandle={onMinusHandle} 
                onCancelHandle={onCancelHandle} 
            />}
            {!withRightControl && <ProductDescription product={product} />}
            {isInStock && <NotInStock />}
        </div>
        <div className={styles.contentWrapper}>
            <h3>{i18n.language == "en" ? product.ProductNameENG : product.ProductName}</h3>
            <span>{product.Fasi1.toFixed(2)}₾</span>
        </div>
    </div>
  )
}

export default ProductCard
