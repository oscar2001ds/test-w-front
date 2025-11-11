"use client"

import { FEATURES_LIST, SECTION_TITLES } from "../../constants/home-view.constants"

const colorSchemeClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600"
}

export const FeaturesList = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{SECTION_TITLES.whatCanYouDo}</h2>

      <div className="space-y-4">
        {FEATURES_LIST.map((feature) => {
          const Icon = feature.icon
          const colorClasses = colorSchemeClasses[feature.colorScheme]

          return (
            <div key={feature.id} className="flex gap-4 p-4 bg-white rounded-lg border shadow-sm">
              <div className={`p-2 w-10 h-10 rounded-lg shrink-0 ${colorClasses}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}