"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarItem, SideBarMenuItem } from "../types/side-bar.types";
import { BASE_URL, getFilteredSidebarItems } from "../constants/side-bar.constants";
import { useAuth } from "@/src/core/context/AuthContext";
import { useToast } from "@/src/shared";

export function useSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useToast();
  const [selectedItem, setSelectedItem] = useState<SidebarItem | null>(null);
  const [authSideBarItems, setAuthSideBarItems] = useState<SideBarMenuItem[]>([]);

  const handleOptionClick = (item: SideBarMenuItem) => {
    setSelectedItem(item.slug);
    router.push(item.url);
  };

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Sesión cerrada exitosamente.");
      router.push("/auth");
    } catch (error) {
      showError("Error al cerrar sesión.");
      console.error(error);
    }
  }

  // Detectar item seleccionado basado en la URL
  useEffect(() => {
    const urlHash = pathname.split(`${BASE_URL}/`)[1];
    const hash = urlHash ? Object.values(SidebarItem).find(item => item === urlHash.toLowerCase()) : null;
    if (hash) {
      setSelectedItem(hash);
    }
  }, [pathname]);

  // Filtrar items del sidebar basado en permisos
  useEffect(() => {
    const userRole = user?.role; // Ajusta según tu estructura de usuario
    const filteredItems = getFilteredSidebarItems(userRole);
    setAuthSideBarItems(filteredItems);
  }, [user]);

  return {
    selectedItem,
    authSideBarItems,
    handleOptionClick,
    handleLogout,
  };
}