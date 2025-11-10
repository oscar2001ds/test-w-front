import { useState } from "react";
import { AuthOption } from "../types";

export default function useAuthSelector() {
  const [selectedOption, setSelectedOption] = useState<AuthOption>("login");

  const handleOptionChange = (option: AuthOption) => {
    setSelectedOption(option);
  }
  return {
    selectedOption,
    handleOptionChange,
  };
}
