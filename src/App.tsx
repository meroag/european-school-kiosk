import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/main.scss"
import Home from "./pages/Home";
import Products from "./pages/Products";
import OrderSummary from "./pages/OrderSummary";

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
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
