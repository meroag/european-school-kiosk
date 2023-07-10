import styles from "./modal..module.scss"

interface ModalProps {
  children: JSX.Element
}

const Modal = ({children}: ModalProps) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>
  )
}

export default Modal
