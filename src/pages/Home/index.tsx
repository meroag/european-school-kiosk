import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./home.module.scss"
import { useTranslation } from "react-i18next"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import PincodeModal from "./PincodeModal"
import SettingsModal from "./SettingsModal"
import useSettingStore from "../../store/useSettings"
import { useEffect } from "react"

interface LanguageItemProps {
  onClick: () => void, 
  img : string 
  title: string 
  alt: string
}

const LanguageItem = ({onClick, img, title, alt}: LanguageItemProps) => {
  const navigate = useNavigate()
  const [isClicked, setIsClicked] = useState(false)
  const storeCode = useSettingStore(state => state.selectedStoreId) 
  const salaroId = useSettingStore(state => state.selectedSalaroId) 


  const onLinkItemCLick = () => {
    if(!storeCode || !salaroId) return alert("Something went wrong")
  
    setIsClicked(true)
    setTimeout(() => {
      onClick && onClick()
      navigate("/products")
    }, 300)
  }

  return (
    <a onClick={onLinkItemCLick} className={isClicked ? "onItemClick" : ""}>
      <img src={img} alt={alt} />
      <span>{title}</span>
    </a>
  )
}

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
          <LanguageItem 
            onClick={() => i18n.changeLanguage("ka")}
            img={"/flags/georgian-lg.png"}
            alt={"georgian flag"}
            title={"ქართული"}
          />
          <LanguageItem 
            onClick={() => i18n.changeLanguage("en")}
            img={"/flags/british-lg.png"}
            alt={"british flag"}
            title={"English"}
          />
        </nav>
      </div>

      {isPincodModalOpen  && <PincodeModal />}
      {isSettingsModalOpen && <SettingsModal />}
    </div>
  )
}

export default Home
