import { ThemeProvider } from '@/components/theme-provider'
import "./App.css"
import Navbar from './components/custom/Navbar'
import { Toaster } from "@/components/ui/sonner"
import Home from './pages/Home'
import Footer from './components/custom/Footer'
import { createBrowserRouter } from 'react-router-dom'
import Profile from './pages/Profile'
import { RouterProvider } from 'react-router'
import { ResumeDialogProvider } from './contexts/ResumeDialogContext'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Navbar />
        <Home/>
        <Footer />
      </>
    },
    {
      path: "/profile",
      element: <>
       <Navbar />
        <Profile/>
        <Footer />
      </>
    },

  ])
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ResumeDialogProvider>
      
        <RouterProvider router={router} />
        
        <Toaster />
      </ResumeDialogProvider>
    </ThemeProvider>
  )
}

export default App