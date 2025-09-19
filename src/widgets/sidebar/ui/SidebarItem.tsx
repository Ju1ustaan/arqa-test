import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  title?: string
  path: string
  icon: React.ElementType
}

const SidebarItem = ({ title, path, icon: Icon }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
          isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"
        )
      }
    >
      <Icon className="h-4 w-4" />
      {title}
    </NavLink>
  )
}

export default SidebarItem