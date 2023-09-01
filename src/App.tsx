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

const Test = () => {
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

  return <button onClick={() => printDocument("test tetet ttt ttttt tt")}>Test Btn</button>
}

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
  },
  {
    path: "/print",
    element: <Test />
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
