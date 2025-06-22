import {ThemeProvider} from '@/components/theme-provider'
import "./App.css"
import Navbar from './components/custom/Navbar'
import { Toaster } from "@/components/ui/sonner"

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Navbar/>
      <Toaster />
    </ThemeProvider>
  )
}

export default App