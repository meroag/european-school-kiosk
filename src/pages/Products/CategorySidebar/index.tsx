import styles from "./sidebar.module.scss"
import categoryList from "./categoriesList"
import SvgIcon from "../../../vendor/svgr/SvgIcon"
import { useEffect } from "react"
import useStore from "../../../store/store"

const CategorySidebar = () => {
  const categories = useStore((state) => state.categories)

  const setSelectedCategoryId = useStore((state) => state.setSelectedCategoryId)
  const getProdGroup = useStore((state) => state.getProdGroup)

  useEffect(() => {
    getProdGroup()
  }, [])

  return (
    <div className={styles.wrapper}>
      
      {categories.map((category) => (
        <button key={category.IdProdGroup} className={styles.categoryItemWrapper} onClick={() => setSelectedCategoryId(category.IdProdGroup)}>
            <SvgIcon iconName={"Food"} />
            <h2>{category.ProdGroupName}</h2>
        </button>
      ))}
    </div>
  )
}

export default CategorySidebar