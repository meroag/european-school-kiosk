import styles from "./sidebar.module.scss"
import SvgIcon from "../../../vendor/svgr/SvgIcon"
import { useEffect } from "react"
import useStore from "../../../store/store"
import { useTranslation } from "react-i18next"

const CategorySidebar = () => {
  const { i18n } = useTranslation()
  const categories = useStore((state) => state.categories)

  const selectedCategoryId = useStore((state) => state.selectedCategoryId)
  const setSelectedCategoryId = useStore((state) => state.setSelectedCategoryId)
  const getProductsByCategoryIds = useStore((state) => state.getProductsByCategoryIds)
  const getProdGroup = useStore((state) => state.getProdGroup)

  const onMount = async () => {
    const categories = await getProdGroup()
    const categoryIds = categories.map(cat => cat.IdProdGroup)
    await getProductsByCategoryIds(categoryIds)
  }

  useEffect(() => {
    if(!selectedCategoryId){
      onMount()
    }
  }, [])

  const onAllCategoryHandle = async () => {
    setSelectedCategoryId(null)
    const categoryIds = categories.map(cat => cat.IdProdGroup)
    await getProductsByCategoryIds(categoryIds)
  }

  const svgsById: any = {
    254: <SvgIcon iconName={"drinks"} />,
    255: <SvgIcon iconName={"meals"} />,
    256: <SvgIcon iconName={"desert"} />,
    258: <SvgIcon iconName={"vegan"} />,

    127: <SvgIcon iconName={"drinks"} />,
    128: <SvgIcon iconName={"meals"} />,
    133: <SvgIcon iconName={"desert"} />,
    180: <SvgIcon iconName={"vegan"} />,
  }

  return (
    <div className={styles.wrapper}>
      {categories.length > 0 && <button className={`${styles.categoryItemWrapper} ${ selectedCategoryId == null ? styles.categoryItemWrapperActive : ""}`} onClick={onAllCategoryHandle}>
            <SvgIcon iconName={"Food"} />
            <h2>All</h2>
        </button>
      }
      {categories.map((category) => (
        <button key={category.IdProdGroup} className={`${styles.categoryItemWrapper} ${category.IdProdGroup == selectedCategoryId ? styles.categoryItemWrapperActive : ""}`} onClick={() => setSelectedCategoryId(category.IdProdGroup)}>
            {svgsById[category.IdProdGroup] || <SvgIcon iconName={"Food"} />}
            <h2>{i18n.language == "ka" ? category.ProdGroupName : category.ProdGroupENG }</h2>
        </button>
      ))}
    </div>
  )
}

export default CategorySidebar