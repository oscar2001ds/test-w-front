import { UserRole } from "@/src/modules/auth";
import { UsersView } from "@modules/financial-simulator";

export default function FinancialSimulatorSupervisorsPage() {
  return (
     <UsersView userRole={UserRole.Supervisor} />
  )
}