"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

interface TechStackOption {
  id: string
  name: string
  description: string
  icon: string
  color: string
  gradient: string
}

const techStacks: TechStackOption[] = [
  {
    id: "react",
    name: "React + Tailwind",
    description: "Modern React with Tailwind CSS",
    icon: "⚛️",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "vue",
    name: "Vue + Tailwind",
    description: "Vue.js with Tailwind CSS",
    icon: "🟢",
    color: "bg-green-100 text-green-800 border-green-200",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "angular",
    name: "Angular + Tailwind",
    description: "Angular with Tailwind CSS",
    icon: "🅰️",
    color: "bg-red-100 text-red-800 border-red-200",
    gradient: "from-red-500 to-pink-500",
  },
  {
    id: "svelte",
    name: "Svelte + Tailwind",
    description: "Svelte with Tailwind CSS",
    icon: "🧡",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "html",
    name: "HTML + CSS",
    description: "Pure HTML with CSS",
    icon: "🌐",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "react-native",
    name: "React Native",
    description: "React Native components",
    icon: "📱",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    gradient: "from-indigo-500 to-blue-500",
  },
]

interface TechStackSelectorProps {
  value: string
  onChange: (value: string) => void
}

export default function TechStackSelector({ value, onChange }: TechStackSelectorProps) {
  const selectedStack = techStacks.find((stack) => stack.id === value)

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold text-slate-700 flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        Choose Your Tech Stack
      </Label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-14 border-2 border-slate-200 hover:border-blue-300 transition-colors bg-white/50 backdrop-blur-sm">
          <SelectValue>
            {selectedStack && (
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedStack.gradient} flex items-center justify-center text-white text-lg shadow-lg`}
                >
                  {selectedStack.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-800">{selectedStack.name}</div>
                  <div className="text-sm text-slate-500">{selectedStack.description}</div>
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-sm border-2">
          {techStacks.map((stack) => (
            <SelectItem key={stack.id} value={stack.id} className="p-4 hover:bg-slate-50">
              <div className="flex items-center gap-4 py-2">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stack.gradient} flex items-center justify-center text-white text-xl shadow-lg`}
                >
                  {stack.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">{stack.name}</span>
                  <span className="text-sm text-slate-500">{stack.description}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedStack && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${selectedStack.color} border-2 px-3 py-1`}>
            <span className="mr-2">{selectedStack.icon}</span>
            {selectedStack.name}
          </Badge>
          <div className="text-xs text-slate-500">Selected Framework</div>
        </div>
      )}
    </div>
  )
}
