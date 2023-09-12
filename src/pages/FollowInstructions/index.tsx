import { useEffect } from 'react'
import TerminalStatuses from '../../components/TerminalStatuses'
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import animationData from "../../animations/dataload.json"
import styles from "./following-instructions.module.scss"
import { axiosOperationInstance, endpoints } from '../../utils/api';
import useSettingStore from '../../store/useSettings';

const FollowInstructions = () => {
  const navigate = useNavigate();
  const total = useCartStore(state => state.getTotalPrice())
  const payOrders = useCartStore(state => state.payOrders)
  const salaroId = useSettingStore(state => state.selectedSalaroId)
  const finalizeOrder = useCartStore(state => state.finalizeOrder)

  const saleProduct = async () => {
    try {
      const orderId = await finalizeOrder()

      await axiosOperationInstance.post(
        endpoints.PayTerminal,
        {
          Amount: total.price,
          IdSalaro: salaroId,
          IdReal1: orderId
        }
      )

      await payOrders()

      navigate("/payment-successful")

    } catch (err: any) {
      console.log(err)
      navigate("/payment-declined")
    }
  } 


  const animationProps = {
    src: animationData,
    className: styles.lottieWrapper,
    autoplay: true,
    loop: true,
    style: { width: 300, height: 300}
  }

  useEffect(() => {
    saleProduct()
  }, [])

  return (
    <TerminalStatuses status={"Follow instructions on terminal"} animationProps={animationProps} />
  )
}

export default FollowInstructions