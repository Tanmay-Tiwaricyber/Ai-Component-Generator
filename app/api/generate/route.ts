import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyCeM3IJPLstzF5vNveqqUfGfRxs2Tywqk0")

function getFrameworkRequirements(techStack: string): string {
  switch (techStack) {
    case "react":
      return `
- Use modern React functional components with hooks
- Use Tailwind CSS for styling
- Include proper TypeScript types if needed
- Use JSX syntax`

    case "vue":
      return `
- Use Vue 3 Composition API
- Use Tailwind CSS for styling
- Use single-file component format (.vue)
- Include proper TypeScript if needed`

    case "angular":
      return `
- Use Angular component architecture
- Use Tailwind CSS for styling
- Include proper TypeScript
- Use Angular template syntax`

    case "svelte":
      return `
- Use modern Svelte component syntax
- Use Tailwind CSS for styling
- Include proper script and style blocks
- Use Svelte reactive statements`

    case "html":
      return `
- Use semantic HTML5
- Use Tailwind CSS classes
- Include inline styles if needed
- Make it a complete HTML document`

    case "react-native":
      return `
- Use React Native components (View, Text, TouchableOpacity, etc.)
- Use StyleSheet for styling or NativeWind
- Follow React Native best practices
- Use proper React Native syntax`

    default:
      return "Use modern best practices for the selected framework"
  }
}

function extractJSON(text: string): any {
  // Remove markdown code blocks if present
  const cleanText = text.replace(/```json\s*/g, "").replace(/```\s*/g, "")

  // Try to find JSON object
  const jsonMatch = cleanText.match(/\{[\s\S]*?\}(?=\s*$|$)/m)
  if (!jsonMatch) {
    // Try alternative patterns
    const altMatch = cleanText.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/)
    if (!altMatch) {
      throw new Error("No valid JSON found in response")
    }
    return JSON.parse(altMatch[0])
  }

  return JSON.parse(jsonMatch[0])
}

function validateComponentData(data: any): boolean {
  return (
    data &&
    typeof data === "object" &&
    typeof data.name === "string" &&
    typeof data.description === "string" &&
    typeof data.jsx === "string" &&
    typeof data.css === "string"
  )
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, customizations, techStack } = await request.json()

    if (!prompt || !techStack) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const systemPrompt = `You are an expert component generator for multiple frameworks. Generate a complete, production-ready component based on the user's description for the ${techStack} framework.

Framework-specific requirements:
${getFrameworkRequirements(techStack)}

General requirements:
- Make it responsive and accessible
- Use modern best practices for ${techStack}
- Apply these customizations: ${JSON.stringify(customizations)}
- Generate clean, readable code

IMPORTANT: Return ONLY a valid JSON object with this EXACT structure (no markdown, no code blocks, no extra text):

{
  "name": "ComponentName",
  "description": "Brief description of the component",
  "jsx": "Complete component code as a string",
  "css": "Any additional CSS if needed (can be empty string)"
}

User request: ${prompt}`

    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const text = response.text()

    console.log("Raw Gemini response:", text) // Debug log

    // Extract and parse JSON
    let componentData
    try {
      componentData = extractJSON(text)
    } catch (parseError) {
      console.error("JSON parsing error:", parseError)
      console.error("Response text:", text)

      // Fallback: try to create a basic component structure
      return NextResponse.json({
        name: "GeneratedComponent",
        description: "AI generated component",
        jsx: `// Generated component for ${techStack}\n// Error parsing full response, please try again`,
        css: "",
      })
    }

    // Validate the structure
    if (!validateComponentData(componentData)) {
      console.error("Invalid component data structure:", componentData)
      return NextResponse.json({
        name: "GeneratedComponent",
        description: "AI generated component",
        jsx: `// Generated component for ${techStack}\n// Invalid response structure, please try again`,
        css: "",
      })
    }

    // Clean up the JSX to ensure it's properly formatted
    if (componentData.jsx) {
      componentData.jsx = componentData.jsx.trim()
    }
    if (componentData.css) {
      componentData.css = componentData.css.trim()
    }

    return NextResponse.json(componentData)
  } catch (error) {
    console.error("Error generating component:", error)

    // Return a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to generate component",
        details: error instanceof Error ? error.message : "Unknown error",
        fallback: {
          name: "ErrorComponent",
          description: "Error occurred during generation",
          jsx: "// Error generating component, please try again",
          css: "",
        },
      },
      { status: 500 },
    )
  }
}
