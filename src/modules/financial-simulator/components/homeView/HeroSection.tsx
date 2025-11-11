"use client"

import { Calculator, TrendingUp } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { HERO_CONTENT } from "../../constants/home-view.constants"

interface HeroSectionProps {
  onCreateSimulation: () => void
}

export const HeroSection = ({ onCreateSimulation }: HeroSectionProps) => {
  return (
    <div className="relative bg-linear-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-12 w-12 text-blue-200" />
          <div>
            <h1 className="text-4xl font-bold">{HERO_CONTENT.title}</h1>
            <p className="text-blue-100 text-lg">{HERO_CONTENT.subtitle}</p>
          </div>
        </div>
        
        <p className="text-blue-50 text-lg mb-6 max-w-2xl">
          {HERO_CONTENT.description}
        </p>
        
        <div className="flex gap-4">
          <Button 
            className="bg-white text-blue-700 hover:bg-blue-50"
            onClick={onCreateSimulation}
          >
            {HERO_CONTENT.primaryButtonText}
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-10">
        <TrendingUp className="h-32 w-32" />
      </div>
    </div>
  )
}