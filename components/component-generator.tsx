"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Download, Copy, Check, Sparkles, Zap, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LivePreview from "./live-preview"
import CodeEditor from "./code-editor"
import CustomizationPanel from "./customization-panel"
import { generateComponent, exportAsZip } from "@/lib/component-utils"
import TechStackSelector from "./tech-stack-selector"

interface GeneratedComponent {
  jsx: string
  css: string
  name: string
  description: string
}

const examplePrompts = [
  "Modern pricing card with three tiers, gradient background, and hover effects",
  "Navigation bar with logo, menu items, and mobile hamburger menu",
  "Contact form with validation, modern styling, and submit button",
  "Hero section with background image, call-to-action, and centered text",
  "Product card with image, title, price, and add to cart button",
  "Dashboard sidebar with navigation icons and user profile",
  "Modal dialog with form inputs and action buttons",
  "Timeline component with events and progress indicators",
]

export default function ComponentGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedComponent, setGeneratedComponent] = useState<GeneratedComponent | null>(null)
  const [customizations, setCustomizations] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    borderRadius: "rounded-lg",
    spacing: "p-4",
  })
  const [copied, setCopied] = useState(false)
  const [techStack, setTechStack] = useState("react")
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      const component = await generateComponent(prompt, customizations, techStack)
      setGeneratedComponent(component)

      // Check if it's an error component
      if (component.name === "ErrorComponent") {
        setError("There was an issue generating your component. The fallback component is displayed below.")
      }
    } catch (error) {
      console.error("Error generating component:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExport = async () => {
    if (!generatedComponent) return
    await exportAsZip(generatedComponent, techStack)
  }

  const handleCopy = async () => {
    if (!generatedComponent) return
    await navigator.clipboard.writeText(generatedComponent.jsx)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCustomizationChange = (key: string, value: string) => {
    setCustomizations((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Input Section */}
      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            Describe Your Component
          </CardTitle>
          <p className="text-slate-600 mt-2">Tell us what you want to build, and we'll generate it for you</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <TechStackSelector value={techStack} onChange={setTechStack} />

          <div className="relative">
            <Textarea
              placeholder="Describe the component you want to generate... 

Examples:
• A modern pricing card with three tiers and hover effects
• A responsive navigation bar with mobile menu
• A contact form with validation and animations"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[140px] resize-none border-2 border-slate-200 focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm"
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400">{prompt.length}/500</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <p className="text-sm font-medium text-slate-700">Quick Examples:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {examplePrompts.map((example, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 p-3 text-left justify-start h-auto whitespace-normal border-slate-200"
                  onClick={() => setPrompt(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>

          {error && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Generating Component...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-5 w-5" />
                Generate Component
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {generatedComponent && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
          {/* Customization Panel */}
          <div className="lg:col-span-1">
            <CustomizationPanel customizations={customizations} onChange={handleCustomizationChange} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Component Info */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-white to-blue-50/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <CardTitle className="text-xl">{generatedComponent.name}</CardTitle>
                  </div>
                  <p className="text-slate-600">{generatedComponent.description}</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="border-2 hover:bg-blue-50 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleExport}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export ZIP
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Preview and Code */}
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border-2 border-slate-200 h-12">
                <TabsTrigger
                  value="preview"
                  className="text-base font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Live Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="text-base font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-6">
                <LivePreview jsx={generatedComponent.jsx} customizations={customizations} techStack={techStack} />
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <CodeEditor jsx={generatedComponent.jsx} css={generatedComponent.css} techStack={techStack} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
