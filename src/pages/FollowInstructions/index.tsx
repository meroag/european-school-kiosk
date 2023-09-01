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

  function setIframeHTML(iframe: any, html: any) {
    if (typeof iframe.srcdoc !== 'undefined') {
      iframe.srcdoc = html;
    } else {
      iframe.sandbox = 'allow-same-origin';
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
    }
  }
  
  function printDocument(html: any) {
      const iframe = document.createElement('iframe');
      // @ts-ignore: Unreachable code error
      iframe.sandbox = ''; 
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      
      const script = "script";
      setIframeHTML(iframe, `<html><body>${html}<${script}>document.addEventListener("load", () => window.print());</${script}></html>`);
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
      
      printDocument(resp)
      navigate("/payment-successful")

    } catch (err) {
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