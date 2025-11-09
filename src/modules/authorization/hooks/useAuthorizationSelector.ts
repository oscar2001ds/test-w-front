import { useState } from "react";
import { AuthorizationOption } from "../types/authorization";

export default function useAuthorizationSelector() {
  const [selectedOption, setSelectedOption] = useState<AuthorizationOption>("login");

  const handleOptionChange = (option: AuthorizationOption) => {
    setSelectedOption(option);
  }
  return {
    selectedOption,
    handleOptionChange,
  };
}
