import { useUser } from "../../contexts/UserContext"
import { ModeToggle } from "../mode-toggle"
import Login from "./Login"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Register from "./Register"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Link } from "react-router-dom"


const Navbar = () => {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`, {
        credentials: 'include'
      })
      setUser(null)
      toast("Logout successfull.")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <header>
      <nav className="flex items-center container mx-auto border-b h-16 px-1 justify-between">
        <Link to={"/"} className="cursor-pointer">
          <img src="./logo.png" alt="logo" width={200} />

        </Link>
        {
          user ? <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://cdn-icons-png.flaticon.com/512/219/219983.png" />
                <AvatarFallback>{user.name}</AvatarFallback>

              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : <div className="flex items-center gap-2">
            <Login />
            <Register />
            <ModeToggle />
          </div>
        }
      </nav>
    </header>
  )
}

export default Navbar