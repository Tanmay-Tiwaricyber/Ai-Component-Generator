"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, FileText, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface CodeEditorProps {
  jsx: string
  css: string
  techStack: string
}

export default function CodeEditor({ jsx, css, techStack }: CodeEditorProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const getFileExtension = (stack: string) => {
    switch (stack) {
      case "react":
        return "jsx"
      case "vue":
        return "vue"
      case "angular":
        return "ts"
      case "svelte":
        return "svelte"
      case "html":
        return "html"
      case "react-native":
        return "jsx"
      default:
        return "jsx"
    }
  }

  const getFileName = (stack: string) => {
    switch (stack) {
      case "react":
        return "Component.jsx"
      case "vue":
        return "Component.vue"
      case "angular":
        return "component.ts"
      case "svelte":
        return "Component.svelte"
      case "html":
        return "index.html"
      case "react-native":
        return "Component.jsx"
      default:
        return "Component.jsx"
    }
  }

  const handleCopy = async (content: string, tab: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  const fileName = getFileName(techStack)

  return (
    <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50/50 border-b">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg text-white">
            <Code className="h-5 w-5" />
          </div>
          Generated Code
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="component" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100 border-b-2 border-slate-200 rounded-none h-12">
            <TabsTrigger value="component" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4 mr-2" />
              {fileName}
            </TabsTrigger>
            <TabsTrigger value="styles" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Code className="h-4 w-4 mr-2" />
              styles.css
            </TabsTrigger>
            <TabsTrigger value="package" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Package className="h-4 w-4 mr-2" />
              package.json
            </TabsTrigger>
          </TabsList>

          <TabsContent value="component" className="m-0">
            <div className="relative">
              <div className="flex items-center justify-between p-4 bg-slate-50 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-700">{fileName}</span>
                  <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                    {techStack.toUpperCase()}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleCopy(jsx, "component")} className="border-2">
                  {copiedTab === "component" ? (
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
              </div>
              <div className="bg-slate-900 text-slate-100 p-6 overflow-x-auto max-h-96 font-mono text-sm leading-relaxed">
                <pre>
                  <code>{jsx}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="styles" className="m-0">
            <div className="relative">
              <div className="flex items-center justify-between p-4 bg-slate-50 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-700">styles.css</span>
                  <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                    CSS
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(css || "/* No additional CSS required */", "styles")}
                  className="border-2"
                >
                  {copiedTab === "styles" ? (
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
              </div>
              <div className="bg-slate-900 text-slate-100 p-6 overflow-x-auto max-h-96 font-mono text-sm leading-relaxed">
                <pre>
                  <code>{css || "/* No additional CSS required */"}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="package" className="m-0">
            <div className="relative">
              <div className="flex items-center justify-between p-4 bg-slate-50 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-700">package.json</span>
                  <Badge variant="outline" className="text-xs bg-purple-50 border-purple-200 text-purple-700">
                    JSON
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(generatePackageJson(techStack), "package")}
                  className="border-2"
                >
                  {copiedTab === "package" ? (
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
              </div>
              <div className="bg-slate-900 text-slate-100 p-6 overflow-x-auto max-h-96 font-mono text-sm leading-relaxed">
                <pre>
                  <code>{generatePackageJson(techStack)}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function generatePackageJson(techStack: string) {
  const packages = {
    react: {
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        tailwindcss: "^3.3.0",
      },
    },
    vue: {
      dependencies: {
        vue: "^3.3.0",
        tailwindcss: "^3.3.0",
      },
    },
    angular: {
      dependencies: {
        "@angular/core": "^16.0.0",
        "@angular/common": "^16.0.0",
        tailwindcss: "^3.3.0",
      },
    },
    svelte: {
      dependencies: {
        svelte: "^4.0.0",
        tailwindcss: "^3.3.0",
      },
    },
    html: {
      dependencies: {
        tailwindcss: "^3.3.0",
      },
    },
    "react-native": {
      dependencies: {
        react: "^18.2.0",
        "react-native": "^0.72.0",
        nativewind: "^2.0.11",
      },
    },
  }

  return JSON.stringify(
    {
      name: "generated-component",
      version: "1.0.0",
      description: "AI Generated Component",
      ...packages[techStack as keyof typeof packages],
    },
    null,
    2,
  )
}
