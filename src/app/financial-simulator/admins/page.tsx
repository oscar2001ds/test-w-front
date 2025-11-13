import { UserRole } from "@/src/modules/auth";
import { UsersView } from "@modules/financial-simulator";

export default function FinancialSimulatorAdminsPage() {
  return (
    <UsersView userRole={UserRole.Admin} />
  )
}