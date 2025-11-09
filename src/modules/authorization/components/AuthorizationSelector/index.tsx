"use client";

import { useBreakpoints } from "@core/context/BreakpointsContext";
import useAuthorizationSelector from "../../hooks/useAuthorizationSelector";
import LoginForm from "./Login/LoginForm";
import LoginPreview from "./Login/LoginPreview";
import RegisterForm from "./Register/RegisterForm";
import RegisterPreview from "./Register/RegisterPreview";
import ForgotPasswordForm from "./ForgotPassword/ForgotPasswordForm";
import ForgotPassword from "./ForgotPassword";
import Slider from "./Slider";


function AuthorizationSelectorDesktop() {
  const { selectedOption, handleOptionChange } = useAuthorizationSelector();
  return (
    <div data-aos="zoom-in"
      className="relative flex items-center h-full max-h-[600px] w-[90%] max-w-[1100px] rounded-[40px] shadow-2xl overflow-hidden"
    >
      <Slider selectedOption={selectedOption} />
      <div className="flex items-center w-full h-full">
        <div className="w-1/2 h-full">
          <div className={`absolute w-1/2 h-full z-5 transition-all duration-700 ${selectedOption === "login" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
            <LoginForm handleOptionChange={handleOptionChange} />
          </div>
          <div className={`absolute w-1/2 h-full z-15 transition-all duration-700 ${selectedOption === "register" ? "translate-x-0 opacity-100" : " translate-x-full opacity-0 pointer-events-none"}`}>
            <LoginPreview handleOptionChange={handleOptionChange} />
          </div>
        </div>
        <div className="w-1/2 h-full">
          <div className={`absolute w-1/2 h-full z-5 transition-all duration-700 ${selectedOption === "register" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}`}>
            <RegisterForm />
          </div>
          <div className={`absolute  w-1/2 h-full z-15 transition-all duration-700 ${selectedOption === "login" ? "translate-x-0 opacity-100" : selectedOption === "register" ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-full opacity-0 pointer-events-none"}`}>
            <RegisterPreview handleOptionChange={handleOptionChange} />
          </div>
        </div>
      </div>
      <ForgotPassword selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
    </div>
  )
}

function AuthorizationSelectorMobile() {
  const { selectedOption, handleOptionChange } = useAuthorizationSelector();
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {selectedOption === "login" &&
        <div data-aos="fade-right" className="flex items-center rounded-4xl shadow-2xl overflow-hidden bg-secondary">
          <LoginForm handleOptionChange={handleOptionChange} />
        </div>
      }
      {selectedOption === "register" &&
        <div data-aos="fade-left" className="flex items-center rounded-4xl shadow-2xl overflow-hidden bg-secondary">
          <RegisterForm handleOptionChange={handleOptionChange} />
        </div>
      }
      {selectedOption === "forgotPassword" &&
        <div data-aos="fade-up" className="flex items-center rounded-4xl shadow-2xl overflow-hidden bg-secondary">
          <ForgotPasswordForm handleOptionChange={handleOptionChange} />
        </div>
      }
    </div>
  );
}

export default function AuthorizationSelector() {
  const { isMobile, isTablet } = useBreakpoints();
  return (
    <>
      {
        isMobile || isTablet ? <AuthorizationSelectorMobile /> : <AuthorizationSelectorDesktop />
      }
    </>
  );
}
