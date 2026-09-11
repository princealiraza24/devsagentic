import Link from 'next/link';
import { Bot, Zap, Code2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Architecting the Future of <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Agentic Workflows</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore deep technical insights, modern web development strategies, and robust tooling for the next generation of AI-powered applications.
          </p>
          <div className="flex justify-center gap-4 pt-6">
            <Link href="/blog" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Read Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools/token-estimator" className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
              Try Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">AI Agents</h3>
            <p className="text-slate-600 leading-relaxed">
              Deep dives into building, orchestrating, and scaling autonomous agents using modern frameworks and LLMs.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Automation</h3>
            <p className="text-slate-600 leading-relaxed">
              Strategies and tools for automating developer workflows, CI/CD pipelines, and data processing tasks.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Web Development</h3>
            <p className="text-slate-600 leading-relaxed">
              Modern frontend architecture, React patterns, Next.js optimization, and full-stack integration guides.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
