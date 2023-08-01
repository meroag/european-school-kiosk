import { useTranslation } from "react-i18next"
import styles from "./terminal-statuses.module.scss"

interface TerminalStatusesProps {
    status: string
}

const TerminalStatuses = ({status}: TerminalStatusesProps) => {
    const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.logoWrapper}>
        <img src="/logo.png" alt={t("European School Cafe")} />
      </div>

      <h1>{status}</h1>
    </div>
  )
}

export default TerminalStatuses