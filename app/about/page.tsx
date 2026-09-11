export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">About DevsAgentic</h1>
      
      <div className="prose prose-slate prose-lg max-w-none">
        <p>
          Welcome to <strong>DevsAgentic</strong>. We are a technical blog and resource hub dedicated to exploring the frontier of web development and artificial intelligence.
        </p>
        
        <p>
          Our mission is to help developers navigate the rapidly evolving landscape of AI agents, automated workflows, and modern full-stack architectures. We believe that the future of software engineering lies in the seamless integration of intelligent systems with robust web platforms.
        </p>
        
        <h2>What We Cover</h2>
        <ul>
          <li><strong>Agentic Workflows:</strong> Architectural patterns for building autonomous AI agents that can reason, plan, and execute complex tasks.</li>
          <li><strong>Modern Web Development:</strong> Deep technical guides on Next.js, React, TypeScript, and serverless architectures.</li>
          <li><strong>Practical Tooling:</strong> Building internal tools and automations to supercharge developer productivity.</li>
        </ul>

        <h2>Who We Are</h2>
        <p>
          DevsAgentic is maintained by a small team of passionate software engineers and AI enthusiasts. We write about what we build, sharing the lessons we learn from real-world projects and experiments.
        </p>
      </div>
    </div>
  );
}
