import ProductCard from "../../../components/ProductCard"
import styles from "./product-list.module.scss"

const ProductList = () => {
  return (
    <div className={styles.wrapper}>
      {Array(9).fill("").map(() => (
        <ProductCard />
      ))}
    </div>
  )
}

export default ProductList