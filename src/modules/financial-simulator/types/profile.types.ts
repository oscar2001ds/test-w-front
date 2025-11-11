import { User } from "../../auth"
import { UpdateUserPayload } from "../services/user.service"
import { SimulationStats } from "./simulation.types"


export interface ProfileStats extends SimulationStats {
  memberSince: string
  lastActivity: string
}

export interface ProfileData extends User {
  stats: ProfileStats
}

export interface ProfileHeaderProps {
  user: User
  stats: ProfileStats
}

export interface ProfileInfoProps {
  user: User
  onEditField: (field: EditableField, currentValue: string) => void
}

export interface ProfileViewProps {
  profileData: ProfileData
  isLoading?: boolean
  error?: string | null
}

// Tipos para el modal de edición
export type EditableField = 'firstName' | 'lastName' | 'username' | 'email'

export interface EditModalState {
  isOpen: boolean
  field: EditableField | null
  currentValue: string
  newValue: string
}

export interface EditFieldModalProps {
  isOpen: boolean
  field: EditableField | null
  currentValue: string
  onSave: (field: EditableField, newValue: string) => Promise<void>
  onClose: () => void
  isLoading: boolean
}

// Hook return type siguiendo el patrón establecido
export interface MyProfileHookReturn {
  // Data
  profileData: ProfileData | null
  isLoading: boolean
  error: string | null
  
  // Modal state
  editModalState: EditModalState
  
  // Actions
  updateProfile: (data: UpdateUserPayload) => Promise<void>
  refreshProfile: () => Promise<void>
  openEditModal: (field: EditableField, currentValue: string) => void
  closeEditModal: () => void
  saveFieldEdit: (field: EditableField, newValue: string) => Promise<void>
}