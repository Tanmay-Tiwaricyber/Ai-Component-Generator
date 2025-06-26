interface GeneratedComponent {
  jsx: string
  css: string
  name: string
  description: string
}

export async function generateComponent(
  prompt: string,
  customizations: any,
  techStack: string,
): Promise<GeneratedComponent> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, customizations, techStack }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API Error:", errorData)

      // If there's a fallback in the error response, use it
      if (errorData.fallback) {
        return errorData.fallback
      }

      throw new Error(errorData.details || errorData.error || "Failed to generate component")
    }

    const data = await response.json()

    // Validate the response structure
    if (!data.name || !data.jsx) {
      console.error("Invalid response structure:", data)
      throw new Error("Invalid component data received")
    }

    return {
      name: data.name || "GeneratedComponent",
      description: data.description || "AI generated component",
      jsx: data.jsx || "// No component code generated",
      css: data.css || "",
    }
  } catch (error) {
    console.error("Error in generateComponent:", error)

    // Return a fallback component instead of throwing
    return {
      name: "ErrorComponent",
      description: "Error occurred during generation. Please try again.",
      jsx: `// Error generating ${techStack} component
// Please try again with a different prompt
// Error: ${error instanceof Error ? error.message : "Unknown error"}

export default function ErrorComponent() {
  return (
    <div className="p-4 border border-red-300 rounded-lg bg-red-50">
      <h3 className="text-red-800 font-semibold">Generation Error</h3>
      <p className="text-red-600 text-sm mt-1">
        Please try again with a different prompt or check your connection.
      </p>
    </div>
  )
}`,
      css: "",
    }
  }
}

export async function exportAsZip(component: GeneratedComponent, techStack: string) {
  try {
    const JSZip = (await import("jszip")).default
    const zip = new JSZip()

    // Get appropriate file extension
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

    const extension = getFileExtension(techStack)
    const fileName = `${component.name}.${extension}`

    // Add component file
    zip.file(fileName, component.jsx)

    // Add styles file if there's CSS
    if (component.css && component.css.trim()) {
      zip.file("styles.css", component.css)
    }

    // Add package.json
    const packageJson = generatePackageJson(techStack)
    zip.file("package.json", packageJson)

    // Add framework-specific files
    if (techStack === "react") {
      zip.file(
        "index.js",
        `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport ${component.name} from './${component.name}';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<${component.name} />);`,
      )
    }

    // Update README with tech stack info
    const readme = `# ${component.name}

${component.description}

## Tech Stack: ${techStack.charAt(0).toUpperCase() + techStack.slice(1)}

## Usage

\`\`\`${extension}
${component.jsx}
\`\`\`

## Installation

\`\`\`bash
npm install
\`\`\`

${component.css && component.css.trim() ? "## Additional CSS\n\nInclude the styles.css file in your project for additional styling." : ""}
`

    zip.file("README.md", readme)

    // Generate and download
    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const a = document.createElement("a")
    a.href = url
    a.download = `${component.name.toLowerCase()}-${techStack}-component.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error exporting ZIP:", error)
    alert("Error exporting component. Please try again.")
  }
}

function generatePackageJson(techStack: string) {
  const packages = {
    react: {
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        tailwindcss: "^3.3.0",
      },
      scripts: {
        start: "react-scripts start",
        build: "react-scripts build",
      },
    },
    vue: {
      dependencies: {
        vue: "^3.3.0",
        tailwindcss: "^3.3.0",
      },
      scripts: {
        dev: "vite",
        build: "vite build",
      },
    },
    angular: {
      dependencies: {
        "@angular/core": "^16.0.0",
        "@angular/common": "^16.0.0",
        tailwindcss: "^3.3.0",
      },
      scripts: {
        start: "ng serve",
        build: "ng build",
      },
    },
    svelte: {
      dependencies: {
        svelte: "^4.0.0",
        tailwindcss: "^3.3.0",
      },
      scripts: {
        dev: "vite dev",
        build: "vite build",
      },
    },
    html: {
      dependencies: {
        tailwindcss: "^3.3.0",
      },
      scripts: {
        build: "tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
      },
    },
    "react-native": {
      dependencies: {
        react: "^18.2.0",
        "react-native": "^0.72.0",
        nativewind: "^2.0.11",
      },
      scripts: {
        start: "expo start",
        android: "expo start --android",
        ios: "expo start --ios",
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
