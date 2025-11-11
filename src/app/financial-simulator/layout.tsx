import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/src/shared/components/ui/sidebar"
import { AppSidebar } from "@modules/financial-simulator"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar sideBarWidth="300px" />
      <SidebarInset className="w-screen h-screen min-h-screen bg-linear-to-l from-[#97b5d3] via-[#c2ccd1] to-[#d0d0e2]">
        <header className="flex shrink-0 items-center gap-2 px-5 pt-6 pb-4 bg-[#0c192a] border-b border-gray-700 text-white md:hidden">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold text-white">Simulador Financiero</h1>
        </header>
        <main className={`flex-1 p-6 overflow-auto ml-0 md:ml-[300px]`}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}