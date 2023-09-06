import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/main.scss"
import Home from "./pages/Home";
import Products from "./pages/Products";
import OrderSummary from "./pages/OrderSummary";
import { useEffect } from "react";
import useStore from "./store/store";
import FollowInstructions from "./pages/FollowInstructions";
import PaymentSuccessful from "./pages/PaymentSuccessful";
import PaymentDeclined from "./pages/PaymentDeclined";
import useSettingStore from "./store/useSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/order-summary",
    element: <OrderSummary />,
  },
  {
    path: "/follow-instructions",
    element: <FollowInstructions />,
  },
  {
    path: "/payment-successful",
    element: <PaymentSuccessful />,
  },
  {
    path: "/payment-declined",
    element: <PaymentDeclined />,
  }
]);

function App() {
  const isAutorized = useStore(state => state.isAutorized)
  const getMdzgoli = useSettingStore(store => store.getMdzgoli)
  const getProdNashti = useStore(state => state.getProdNashti)
  const storeCode = useSettingStore(state => state.selectedStoreId)
  const autorization = useStore(state => state.autorization)

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  }

  useEffect(() => {
    if (performance.navigation.type === 1) {
      window.location.pathname = '/';
    }
    toggleFullScreen()
    autorization()
    
  }, [])

  useEffect(() => {
    getMdzgoli()
  }, [isAutorized, getMdzgoli])


  useEffect(() => {
    if(isAutorized && storeCode){
      getProdNashti()
    }
  }, [isAutorized, storeCode])

  return (
    <RouterProvider router={router} />
  )
}

export default App
