import { useState } from "react"
import Counter from "./Counter"
import styles from "./card.module.scss"
import ProductDescription from "./ProductDescription"
import NotInStock from "./NotInStock"

interface ProductCardProps {
    className?: string;
    withRightControl?: boolean;
}
const ProductCard = ({className, withRightControl}:ProductCardProps) => {
    const [isCounterVisible, setisCounterVisible] = useState(!!withRightControl)

    const onImageWrapperMouseOver = () => {
        if(withRightControl) return;
        setisCounterVisible(true)
    }

    const onImageWrapperMouseLeave = () => {
        if(withRightControl) return;
        setisCounterVisible(false)
    }

  return (
    <div className={`${styles.productCardWrapper} ${className}`}>
        <div className={styles.imageWrapper} 
            onMouseOver={onImageWrapperMouseOver}
            onMouseLeave={onImageWrapperMouseLeave}
        >

            <img src="/images/product.png" alt="" />

            <Counter visible={isCounterVisible} withRightControl={withRightControl} />
            {!withRightControl && <ProductDescription />}
            {false && <NotInStock />}
        </div>
        <div className={styles.contentWrapper}>
            <h3>Dumplings (3 piece)</h3>
            <span>5.99₾</span>
        </div>
    </div>
  )
}

export default ProductCard
