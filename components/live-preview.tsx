"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Monitor, Smartphone, Tablet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LivePreviewProps {
  jsx: string
  customizations: {
    primaryColor: string
    secondaryColor: string
    borderRadius: string
    spacing: string
  }
  techStack: string
}

export default function LivePreview({ jsx, customizations, techStack }: LivePreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  // Apply customizations to the JSX
  const customizedJsx = jsx
    .replace(/bg-blue-500/g, `bg-[${customizations.primaryColor}]`)
    .replace(/text-blue-500/g, `text-[${customizations.primaryColor}]`)
    .replace(/border-blue-500/g, `border-[${customizations.primaryColor}]`)
    .replace(/rounded-lg/g, customizations.borderRadius)
    .replace(/p-4/g, customizations.spacing)

  const getViewportClass = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-2xl mx-auto"
      default:
        return "w-full"
    }
  }

  return (
    <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg text-white">
              <Eye className="h-5 w-5" />
            </div>
            Live Preview
          </CardTitle>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white rounded-lg p-1 border-2 border-slate-200">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
                className="h-8 w-8 p-0"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tablet")}
                className="h-8 w-8 p-0"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="outline" className="bg-white border-2 border-green-200 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 min-h-[500px]">
          {/* Browser-like header */}
          <div className="bg-white border-b px-6 py-3 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 bg-slate-100 rounded-lg px-4 py-1 text-sm text-slate-600">
              localhost:3000 • {techStack.toUpperCase()} Component
            </div>
            <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
              {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
            </Badge>
          </div>

          {/* Preview Content */}
          <div className="p-8 flex items-center justify-center min-h-[400px]">
            <div className={getViewportClass()}>
              {techStack === "react" || techStack === "vue" || techStack === "svelte" ? (
                <div
                  dangerouslySetInnerHTML={{ __html: customizedJsx }}
                  className="w-full transition-all duration-300"
                />
              ) : techStack === "html" ? (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <iframe srcDoc={jsx} className="w-full h-96 border-0" title="HTML Preview" />
                </div>
              ) : techStack === "react-native" ? (
                <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-sm mx-auto shadow-2xl">
                  <div className="bg-white rounded-xl p-4">
                    <div className="text-center text-slate-600 mb-4 text-sm font-medium">📱 React Native Preview</div>
                    <pre className="text-xs bg-slate-50 p-3 rounded-lg border overflow-auto max-h-64 font-mono">
                      {jsx}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 bg-white rounded-lg p-8 shadow-lg">
                  <div className="text-4xl mb-4">🚧</div>
                  <div className="font-medium">Preview not available for {techStack}</div>
                  <div className="text-sm mt-2">Check the code tab to see the generated component</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border-t px-6 py-3 flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Preview updates automatically
          </div>
          <div className="flex items-center gap-4">
            <span>{techStack.charAt(0).toUpperCase() + techStack.slice(1)} component</span>
            <span>•</span>
            <span>Responsive design</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
