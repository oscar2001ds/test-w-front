import { SidebarItem, SideBarMenuItem } from "../types/side-bar.types";
import { FaHome, FaUserShield, FaUserTie, FaUserCheck, FaUser, FaUsers } from "react-icons/fa";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { hasRouteAccess } from "@/src/core/config/protected-routes";
import { UserRole } from "../../auth";

export const BASE_URL = "/financial-simulator";

// Definir todos los items del sidebar
const ALL_SIDEBAR_ITEMS: SideBarMenuItem[] = [
  {
    title: "Home",
    slug: SidebarItem.Home,
    url: `${BASE_URL}/home`,
    icon: FaHome,
  },
  {
    title: "My Simulations",
    slug: SidebarItem.MySimulations,
    url: `${BASE_URL}/my-simulations`,
    icon: HiOutlineTrendingUp,
  },
  {
    title: "Super Admins",
    slug: SidebarItem.SuperAdmins,
    url: `${BASE_URL}/super-admins`,
    icon: FaUserShield,
  },
  {
    title: "Admins",
    slug: SidebarItem.Admins,
    url: `${BASE_URL}/admins`,
    icon: FaUserTie,
  },
  {
    title: "Supervisors",
    slug: SidebarItem.Supervisors,
    url: `${BASE_URL}/supervisors`,
    icon: FaUserCheck,
  },
  {
    title: "Clients",
    slug: SidebarItem.Clients,
    url: `${BASE_URL}/clients`,
    icon: FaUsers,
  },
  {
    title: "My Profile",
    slug: SidebarItem.MyProfile,
    url: `${BASE_URL}/my-profile`,
    icon: FaUser,
  }
]

// Función para obtener items filtrados por permisos
export function getFilteredSidebarItems(userRole?: UserRole): SideBarMenuItem[] {
  return ALL_SIDEBAR_ITEMS.filter(item => hasRouteAccess(item.slug, userRole))
}

// Export por compatibilidad (usa todos los items sin filtrar)
export const SIDE_BAR_ITEMS: SideBarMenuItem[] = ALL_SIDEBAR_ITEMS