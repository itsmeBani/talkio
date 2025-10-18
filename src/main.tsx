import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/themeProvider.tsx'
import {AuthProvider} from "@/context/authProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import { Toaster} from 'sonner'


const queryClient=new QueryClient
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <App/>
            <Toaster theme={"dark"} richColors={true} />

        </QueryClientProvider>
     </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
