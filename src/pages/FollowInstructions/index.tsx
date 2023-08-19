import { useEffect } from 'react'
import TerminalStatuses from '../../components/TerminalStatuses'
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';

const FollowInstructions = () => {
  const navigate = useNavigate();
  const sale = useCartStore(state => state.sale)

  const saleProduct = async () => {
    try {
      const resp = await sale()
      console.log(resp)
    } catch (err) {
      alert(err)
      navigate("/")
      console.error("sale error", err)
    }
  } 

  useEffect(() => {
    saleProduct()
  }, [])

  return (
    <TerminalStatuses status={"Follow instructions on terminal"} />
  )
}

export default FollowInstructions