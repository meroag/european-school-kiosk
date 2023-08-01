import { Link } from "react-router-dom"
import styles from "./home.module.scss"
import { useTranslation } from "react-i18next"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import PincodeModal from "./PincodeModal"
import SettingsModal from "./SettingsModal"
import useSettingStore from "../../store/useSettings"
import { useEffect } from "react"

const Home = () => {
  const isPincodModalOpen = useSettingStore(store => store.isPincodModalOpen)
  const setIsPincodModalOpen = useSettingStore(store => store.setIsPincodModalOpen)
  const isSettingsModalOpen = useSettingStore(store => store.isSettingsModalOpen)
  const getMdzgoli = useSettingStore(store => store.getMdzgoli)
  
  const { t, i18n } = useTranslation()

  useEffect(() => {
    getMdzgoli()
  }, [getMdzgoli])
  return (
    <div className={styles.wrapper}>

      <button className={styles.settingBtn} onClick={() => setIsPincodModalOpen(true)}>
        <SvgIcon iconName="settings" />
      </button>
      
      <div className={styles.logoWrapper}>
        <img src="/logo.png" alt={t("European School Cafe")} />
      </div>

      <div className={styles.navWrapper}>
        <h2>აირჩიეთ ენა</h2>
        <h2>Choose language</h2>
        <nav>
          <Link to={'/products'} onClick={() => i18n.changeLanguage("en")}>
            <img src="/flags/british-lg.png" alt="british flag" />
            <span>English</span>
          </Link>
          <Link to={'/products'} onClick={() => i18n.changeLanguage("ka")}>
            <img src="/flags/georgian-lg.png" alt="georgian flag" />
            <span>ქართული</span>
          </Link>
        </nav>
      </div>

      {isPincodModalOpen  && <PincodeModal />}
      {isSettingsModalOpen && <SettingsModal />}
    </div>
  )
}

export default Home
