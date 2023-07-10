import { Link } from "react-router-dom"
import styles from "./home.module.scss"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t, i18n } = useTranslation()
  return (
    <div className={styles.wrapper}>
      
      <div className={styles.topWrapper}>
        <div className={styles.logoWrapper}>
          <img src="/logo.png" alt={t("European School Cafe")} />
          <h1>{t("European School Cafe")}</h1>
        </div>
      </div>

      <div className={styles.navWrapper}>
        <nav>
          <Link to={'/products'} onClick={() => i18n.changeLanguage("en")}>
            <img src="/flags/british-lg.png" alt="british flag" />
          </Link>
          <Link to={'/products'} onClick={() => i18n.changeLanguage("ka")}>
            <img src="/flags/georgian-lg.png" alt="georgian flag" />
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Home
