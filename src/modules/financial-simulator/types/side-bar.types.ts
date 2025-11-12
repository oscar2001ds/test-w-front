export enum SidebarItem {
  Home = "home",
  MySimulations = "my-simulations",
  SuperAdmins = "super-admins",
  Admins = "admins",
  Supervisors = "supervisors",
  Clients = "clients",
  MyProfile = "my-profile",
}

export interface SideBarMenuItem {
  title: string;
  slug: SidebarItem;
  url: string;
  icon: React.ComponentType<any>;
}