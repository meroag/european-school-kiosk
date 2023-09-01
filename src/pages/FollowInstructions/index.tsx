import { useEffect } from 'react'
import TerminalStatuses from '../../components/TerminalStatuses'
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import animationData from "../../animations/dataload.json"
import styles from "./following-instructions.module.scss"
import { axiosInstance, axiosOperationInstance, endpoints } from '../../utils/api';
import useSettingStore from '../../store/useSettings';

const FollowInstructions = () => {
  const navigate = useNavigate();
  const total = useCartStore(state => state.getTotalPrice())
  const salaroId = useSettingStore(state => state.selectedSalaroId)

  const print = (text: any) => {
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    if(WinPrint){
      WinPrint.document.write(text);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }
  }
  const saleProduct = async () => {
    try {
      const resp: any = await axiosOperationInstance.post(
        endpoints.PayTerminal,
        {
          Amount: total.price,
          IdSalaro: salaroId
        }
      )
        

      print(resp.data)
      navigate("/payment-successful")

    } catch (err: any) {
      console.log(err)
      print(err.response.data)
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