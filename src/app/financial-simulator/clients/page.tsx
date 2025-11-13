import { UserRole } from "@/src/modules/auth";
import { UsersView } from "@modules/financial-simulator";

export default function FinancialSimulatorClientsPage() {
  return (
    <UsersView userRole={UserRole.Client} />
  );
}