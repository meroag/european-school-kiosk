import styles from "./sidebar.module.scss"
import categoryList from "./categoriesList"

const CategorySidebar = () => {
  return (
    <div className={styles.wrapper}>
      {categoryList.map((category) => (
        <button key={category.id} className={styles.categoryItemWrapper}>
            <img src={category.icon} alt={category.title} />
            <h2>{category.title}</h2>
        </button>
      ))}
    </div>
  )
}

export default CategorySidebar