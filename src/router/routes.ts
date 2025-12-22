import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import HomeScreen from "../screens/Home";
import ShopScreen from "../screens/Shop";
import AboutScreen from "../screens/About";
import CheckoutScreen from "../screens/Checkout";
import ThemeScreen  from "../screens/Theme";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomeScreen,
      },
      {
        path: "shop",
        Component: ShopScreen,
      },
      {
        path: "about",
        Component: AboutScreen,
      },
      {
        path: "checkout",
        Component: CheckoutScreen,
      },
      {
        path: "theme",  
        Component: ThemeScreen,
      }
    ]
  }
]);