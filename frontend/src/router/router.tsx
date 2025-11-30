import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import Categories from "@/pages/Categories";
import Login from "@/pages/auth/Login";
import { authMiddleware } from "@/stores/middlewares/authMiddleware";

const router = createBrowserRouter([
  {
    Component: Layout,
    middleware: [authMiddleware],
    children: [
      { path: "/", 
        Component: Dashboard, 
        handle: { title: "Dashboard" } 
      },
      { path: "/account", 
        Component: Accounts, 
        handle: { title: "Contas" } 
      },
      { path: "/category",
         Component: Categories,
          handle: { title: "Categorias" }
      },
    ]
  },
  { 
    path: "/login",
    Component: Login
  }
]);

export default router;