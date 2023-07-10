import { Link } from 'react-router-dom'
import styles from "./header.module.scss"
import { useTranslation } from 'react-i18next'

const Header = () => {
    const { t, i18n } = useTranslation()
  return (
    <header className={styles.headerWrapper}>
        <Link to={"/"} className={styles.logo}>
            <img src="/logo.png" alt={t("European School Cafe")} />
            <h1>{t("European School Cafe")}</h1>
        </Link>
        <nav className={styles.languageNavigation}>
            <a 
                onClick={() => i18n.changeLanguage("en")}
                className={`${i18n.language == "en" && styles.languageNavigationActiveLink }`}>
                <img src="/flags/british-lg.png" alt="english" />
                EN           
            </a>
            <a 
                onClick={() => i18n.changeLanguage("ka")}
                className={`${i18n.language == "ka" && styles.languageNavigationActiveLink }`}>
                <img src="/flags/georgian-lg.png" alt="georgian" />
                GE           
            </a>
        </nav>
    </header>
  )
}

export default Header
