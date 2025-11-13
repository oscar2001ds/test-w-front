"use client";

import { useEffect, useRef } from "react";
import { AuthOption } from "../../../types/auth.types";

interface SliderProps {
  selectedOption: AuthOption;
}

export default function Slider({ selectedOption }: SliderProps) {
  const sliderRef1 = useRef<HTMLDivElement>(null);
  const sliderRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      if (selectedOption === "login") {
        sliderRef1.current.style.transform = "translateX(0%)";
        sliderRef2.current.style.transform = "translateX(0%)";
      } else if (selectedOption === "register") {
        sliderRef1.current.style.transform = "translateX(100%)";
        sliderRef2.current.style.transform = "translateX(-100%)";
      }
    }
  }, [selectedOption]);

  return (
    <div className="absolute flex w-full h-full rounded-[40px]">
      <div
        ref={sliderRef1}
        className="absolute z-0 flex w-1/2 h-full transition-transform duration-700 ease-in-out preserve-3d bg-[#f5f5f5]"
      />
      <div
        ref={sliderRef2}
        className="absolute z-10 flex w-1/2 h-full transition-all duration-700 ease-in-out preserve-3d translate-x-full"
        style={{
          backgroundImage: 'url(/images/isometric-building.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: selectedOption === "login" ? "right" : selectedOption === "register" ? "left" : "center",
        }}
      />
    </div>
  )
}