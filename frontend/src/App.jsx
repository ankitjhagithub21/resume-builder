import {ThemeProvider} from '@/components/theme-provider'
import "./App.css"
import { Button } from './components/ui/button'
import Navbar from './components/custom/Navbar'
const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Navbar/>
      <Button>Hello world</Button>
    </ThemeProvider>
  )
}

export default App