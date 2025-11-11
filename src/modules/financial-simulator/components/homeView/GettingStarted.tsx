"use client"

import { Button } from "@/src/shared/components/ui/button"
import { GETTING_STARTED_STEPS, SECTION_TITLES } from "../../constants/home-view.constants"

interface GettingStartedProps {
  onCreateSimulation: () => void
}

const stepColorClasses = {
  blue: "bg-blue-600",
  green: "bg-green-600"
}

export const GettingStarted = ({ onCreateSimulation }: GettingStartedProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{SECTION_TITLES.howToStart}</h2>
      
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <div className="space-y-4">
          {GETTING_STARTED_STEPS.map((step) => {
            const colorClass = stepColorClasses[step.colorScheme]
            
            return (
              <div key={step.id} className="flex gap-3">
                <div className={`w-8 h-8 min-w-8 min-h-8 max-w-8 max-h-8 ${colorClass} text-white rounded-full flex items-center justify-center text-sm font-semibold`}>
                  {step.stepNumber}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={onCreateSimulation}
          >
            Comenzar mi simulación
          </Button>
        </div>
      </div>
    </div>
  )
}