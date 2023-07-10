import Layout from "../../components/Layout"
import CategorySidebar from "./CategorySidebar"
import ProductList from "./ProductList"
import styles from "./products.module.scss"

const Products = () => {
  return (
		<Layout>
			<div className={styles.productsWrapper}>
				<CategorySidebar />
				<ProductList />
			</div>
		</Layout>
  )
}

export default Products
