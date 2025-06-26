import ComponentGenerator from "@/components/component-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">AI-Powered • Live Preview • Multi-Framework</span>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-4 leading-tight">
            AI Component
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into production-ready components with AI.
            <br />
            <span className="font-semibold text-slate-700">Describe, Generate, Customize, Export.</span>
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">6+</div>
              <div className="text-sm text-slate-600">Frameworks</div>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">∞</div>
              <div className="text-sm text-slate-600">Components</div>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">⚡</div>
              <div className="text-sm text-slate-600">Instant</div>
            </div>
          </div>
        </div>

        <ComponentGenerator />
      </div>
    </main>
  )
}
