export type AuthorizationOption = "login" | "register" | "forgotPassword";

export interface AuthorizationFormPreviewProps {
  selectedOption?: AuthorizationOption;
  handleOptionChange?: (option: AuthorizationOption) => void;
}