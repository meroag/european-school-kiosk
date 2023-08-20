import { useNavigate } from "react-router-dom"
import TerminalStatuses from "../../components/TerminalStatuses"
import { useEffect } from "react"

const PaymentSuccessful = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/")
    }, 5000);
    return () => clearTimeout(timer);
  }, [])
  

  return (
    <TerminalStatuses status="Payment successful Enjoy your meal!" />
  )
}

export default PaymentSuccessful