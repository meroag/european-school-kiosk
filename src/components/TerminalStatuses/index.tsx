import { useTranslation } from "react-i18next"
import styles from "./terminal-statuses.module.scss"
import { Player } from '@lottiefiles/react-lottie-player';

interface TerminalStatusesProps {
    status: string
    animationProps?: any
}

const TerminalStatuses = ({status, animationProps}: TerminalStatusesProps) => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img src="/logo.png" alt={t("European School Cafe")} />
      </div>

        {animationProps && <Player
          {...animationProps}
        
        />}
      <h1 style={{ marginTop: (!animationProps ? "44rem": "") }}>{status}</h1>
    </div>
  )
}

export default TerminalStatuses