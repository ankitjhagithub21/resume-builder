import {ThemeProvider} from '@/components/theme-provider'
import "./App.css"
import Navbar from './components/custom/Navbar'
import { Toaster } from "@/components/ui/sonner"
import Home from './pages/Home'
import Footer from './components/custom/Footer'

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Navbar/>
      <Home/>
      <Footer/>
      <Toaster />
    </ThemeProvider>
  )
}

export default App