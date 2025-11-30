import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from "@/router/router";
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <Toaster richColors position="top-center" />
  </>
)
