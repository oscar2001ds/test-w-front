"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shared/components/ui/sidebar"
import { useSidebar } from "../../hooks/useSideBar";
import { Button, buttonVariants } from "@/src/shared/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose } from "@/src/shared/components/ui/dialog";

export default function AppSidebar({ sideBarWidth = "300px" }: { sideBarWidth?: string }) {
  const { selectedItem, authSideBarItems, handleOptionClick, handleLogout } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon" style={{ width: sideBarWidth }}>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FS</span>
          </div>
          <span className="font-semibold">Simulador Financiero</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authSideBarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={selectedItem === item.slug}
                    onClick={() => handleOptionClick(item)}
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: "outline", size: "default" })}>
            Cerrar sesión
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                ¿Estás seguro de que deseas cerrar sesión?
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Revisa bien que tus simulaciones estén guardadas antes de cerrar sesión.
            </DialogDescription>
            <div className="w-full flex justify-end items-center gap-2">
              <DialogClose asChild>
                <Button variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarFooter >
    </Sidebar>
  )
}