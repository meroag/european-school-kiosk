import { useEffect } from 'react'
import TerminalStatuses from '../../components/TerminalStatuses'
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import animationData from "../../animations/dataload.json"
import styles from "./following-instructions.module.scss"

const FollowInstructions = () => {
  const navigate = useNavigate();
  const sale = useCartStore(state => state.sale)
  const total = useCartStore(state => state.getTotalPrice())

  const saleProduct = async () => {
    try {
      const resp: any = await sale(
        "http://192.168.0.14:9015/",
        "SH042017",
        total.price
      )

      const xmlResponse = await resp.text()
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
      
      if(xmlDoc.getElementById("39")?.textContent === "1"){
        navigate("/payment-successful")
      }else{
        navigate("/payment-declined")
      }

    } catch (err) {
      alert(err)
      navigate("/")
      console.error("sale error", err)
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