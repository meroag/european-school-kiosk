import { useNavigate } from "react-router-dom"
import TerminalStatuses from "../../components/TerminalStatuses"
import { useEffect } from "react"
import animationData from "../../animations/data.json"
import styles from "./payment-successfull.module.scss"

const PaymentSuccessful = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/")
    }, 5000);
    return () => clearTimeout(timer);
  }, [])

  const animationProps = {
    src: animationData,
    autoplay: true,
    className: styles.lottieWrapper,
    loop: false,
    count: 1,
    style: { width: 300, height: 300},
  }

  return (
    <TerminalStatuses status="Payment successful Enjoy your meal!" animationProps={animationProps}  />
  )
}

export default PaymentSuccessful