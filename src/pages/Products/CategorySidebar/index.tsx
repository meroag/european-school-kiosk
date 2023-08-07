import styles from "./sidebar.module.scss"
import SvgIcon from "../../../vendor/svgr/SvgIcon"
import { useEffect } from "react"
import useStore from "../../../store/store"
import { useTranslation } from "react-i18next"

const CategorySidebar = () => {
  const { i18n } = useTranslation()
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
            <h2>{i18n.language == "ka" ? category.ProdGroupName : category.ProdGroupENG }</h2>
        </button>
      ))}
    </div>
  )
}

export default CategorySidebar