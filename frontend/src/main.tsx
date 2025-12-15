import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query';
import { Toaster } from 'sonner';
import router from "@/router/router";

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}> 
    <RouterProvider router={router} />
    <Toaster richColors position="top-center" />
  </QueryClientProvider>
)
