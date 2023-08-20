import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import TerminalStatuses from "../../components/TerminalStatuses"

const PaymentDeclined = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/")
    }, 5000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <TerminalStatuses status="Payment declined Try again" />
  )
}

export default PaymentDeclined