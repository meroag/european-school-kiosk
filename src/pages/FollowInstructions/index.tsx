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


  // const print = (text: any) => {
  //   var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

  //   if(WinPrint){
  //     WinPrint.document.write(text);
  //     WinPrint.document.close();
  //     WinPrint.focus();
  //     WinPrint.print();
  //     WinPrint.close();
  //   }
  // }
  const printEthernalPrinter = async (text: string) => {
    // @ts-ignore: Unreachable code error
    const port = await window.navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    
    const writer = port.writable?.getWriter();
    if (writer != null) {
      await writer.write(text);
      writer.releaseLock();
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

      await finalizeOrder()
      await payOrders()

      // print(resp.data)
      printEthernalPrinter(resp.data)
      navigate("/payment-successful")

    } catch (err: any) {
      console.log(err)
      // print(err.response.data)
      // printEthernalPrinter(err.response.data)
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