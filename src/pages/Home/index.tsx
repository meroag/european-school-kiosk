import { useState, useEffect } from "react"
import styles from "./home.module.scss"
import { useTranslation } from "react-i18next"
import SvgIcon from "../../vendor/svgr/SvgIcon"
import PincodeModal from "./PincodeModal"
import SettingsModal from "./SettingsModal"
import useSettingStore from "../../store/useSettings"
import useStore from "../../store/store"
import useCartStore from "../../store/useCartStore"
import PiramidaModal from "./PiramidaModal"

interface LanguageItemProps {
  onClick: () => void, 
  img : string 
  title: string 
  alt: string
}

const LanguageItem = ({onClick, img, title, alt}: LanguageItemProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const storeCode = useSettingStore(state => state.selectedStoreId) 
  const salaroId = useSettingStore(state => state.selectedSalaroId) 


  const onLinkItemCLick = () => {
    if(!storeCode || !salaroId) return alert("Something went wrong")
  
    setIsClicked(true)
    setTimeout(() => {
      onClick && onClick()
    }, 200)
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
  
  const isAutorized = useStore(state => state.isAutorized)
  const getProdNashti = useStore(state => state.getProdNashti)
  const resetStoreStates = useStore(state => state.resetStates)
  const resetCartStates = useCartStore(state => state.resetStates)
  const autorization = useStore(state => state.autorization)
  const storeCode = useSettingStore(state => state.selectedStoreId)
  const [isPiramidaModalOpen, setIsPiramidaModalOpen] = useState(false)
  
  const { t, i18n } = useTranslation()

  useEffect(() => {
    resetStoreStates()
    resetCartStates()
    autorization()
  }, [])

  useEffect(() => {
    if(isAutorized && storeCode){
      getProdNashti()
    }
  }, [isAutorized, storeCode])

  const onLanguageItemClick = (lang: "ka" | "en") => {
    i18n.changeLanguage(lang)
    setIsPiramidaModalOpen(true)
  }

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
            onClick={() => onLanguageItemClick("ka")}
            img={"/flags/georgian-lg.png"}
            alt={"georgian flag"}
            title={"ქართული"}
          />
          <LanguageItem 
            onClick={() => onLanguageItemClick("en")}
            img={"/flags/british-lg.png"}
            alt={"british flag"}
            title={"English"}
          />
        </nav>
      </div>

      
      {isPiramidaModalOpen &&  <PiramidaModal close={() => setIsPiramidaModalOpen(false)} />}
      {isPincodModalOpen  && <PincodeModal />}
      {isSettingsModalOpen && <SettingsModal />}
    </div>
  )
}

export default Home
