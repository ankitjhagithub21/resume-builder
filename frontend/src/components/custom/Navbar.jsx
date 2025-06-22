import { useUser } from "../contexts/UserContext"
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


const Navbar = () => {
  const { user } = useUser();

  return (
   <header className="shadow-xl">
     <nav className="flex items-center container mx-auto  px-4 py-3 justify-between">
      <ModeToggle />
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> : <div className="flex items-center gap-2">
          <Login />
          <Register />
        </div>
      }
    </nav>
   </header>
  )
}

export default Navbar