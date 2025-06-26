"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Paintbrush } from "lucide-react"

interface CustomizationPanelProps {
  customizations: {
    primaryColor: string
    secondaryColor: string
    borderRadius: string
    spacing: string
  }
  onChange: (key: string, value: string) => void
}

const colorOptions = [
  { label: "Blue", value: "#3b82f6", bg: "bg-blue-500" },
  { label: "Green", value: "#10b981", bg: "bg-green-500" },
  { label: "Purple", value: "#8b5cf6", bg: "bg-purple-500" },
  { label: "Red", value: "#ef4444", bg: "bg-red-500" },
  { label: "Orange", value: "#f97316", bg: "bg-orange-500" },
  { label: "Pink", value: "#ec4899", bg: "bg-pink-500" },
  { label: "Indigo", value: "#6366f1", bg: "bg-indigo-500" },
  { label: "Teal", value: "#14b8a6", bg: "bg-teal-500" },
]

const radiusOptions = [
  { label: "None", value: "rounded-none", preview: "⬜" },
  { label: "Small", value: "rounded-sm", preview: "▢" },
  { label: "Medium", value: "rounded-md", preview: "◻️" },
  { label: "Large", value: "rounded-lg", preview: "🔲" },
  { label: "Extra Large", value: "rounded-xl", preview: "⬛" },
  { label: "Full", value: "rounded-full", preview: "⚫" },
]

const spacingOptions = [
  { label: "Tight", value: "p-2", preview: "▪️" },
  { label: "Normal", value: "p-4", preview: "◾" },
  { label: "Relaxed", value: "p-6", preview: "⬛" },
  { label: "Loose", value: "p-8", preview: "⬛" },
]

export default function CustomizationPanel({ customizations, onChange }: CustomizationPanelProps) {
  return (
    <Card className="h-fit border-0 shadow-xl bg-white/90 backdrop-blur-sm sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white">
            <Palette className="h-5 w-5" />
          </div>
          Customize Style
        </CardTitle>
        <p className="text-sm text-slate-600">Adjust colors and styling in real-time</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            Primary Color
          </Label>
          <Select value={customizations.primaryColor} onValueChange={(value) => onChange("primaryColor", value)}>
            <SelectTrigger className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm">
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg ${color.bg}`} />
                    <span className="font-medium">{color.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">Border Radius</Label>
          <Select value={customizations.borderRadius} onValueChange={(value) => onChange("borderRadius", value)}>
            <SelectTrigger className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm">
              {radiusOptions.map((radius) => (
                <SelectItem key={radius.value} value={radius.value}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{radius.preview}</span>
                    <span className="font-medium">{radius.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">Spacing</Label>
          <Select value={customizations.spacing} onValueChange={(value) => onChange("spacing", value)}>
            <SelectTrigger className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm">
              {spacingOptions.map((spacing) => (
                <SelectItem key={spacing.value} value={spacing.value}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{spacing.preview}</span>
                    <span className="font-medium">{spacing.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preview of current customizations */}
        <div className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-slate-200">
          <div className="text-xs font-semibold text-slate-600 mb-3">Style Preview</div>
          <div
            className={`w-full h-16 ${customizations.borderRadius} ${customizations.spacing} transition-all duration-200 shadow-lg`}
            style={{ backgroundColor: customizations.primaryColor }}
          >
            <div className="text-white text-sm font-medium">Sample Element</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
