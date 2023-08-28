import { useEffect } from "react"
import ProductCard from "../../../components/ProductCard"
import styles from "./product-list.module.scss"
import useStore from "../../../store/store"
import { Product } from "../../../interfaces"

const ProductList = () => {
  const selectedCategoryId = useStore((state) => state.selectedCategoryId)
  const products = useStore((state) => state.products)
  const getProducts = useStore((state) => state.getProducts)

  useEffect(() => {
    if(selectedCategoryId){
      getProducts(selectedCategoryId)
    }
  }, [selectedCategoryId])
  
  console.log(selectedCategoryId)

  return (
    <div className={styles.wrapper}>
      {products.map((product: Product) => (
        <ProductCard key={product.ProdCode} product={product} />
      ))}
    </div>
  )
}

export default ProductList