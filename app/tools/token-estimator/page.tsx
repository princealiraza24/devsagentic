'use client';

import { useState } from 'react';
import { Calculator, Check, Copy, RotateCcw } from 'lucide-react';

export default function TokenEstimator() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split(/\r?\n/).length : 0;
  // A common rough estimate is 1 token per 4 characters for English text.
  const tokenEstimate = Math.ceil(charCount / 4);

  async function copyEstimate() {
    try {
      await navigator.clipboard.writeText(String(tokenEstimate));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">LLM Token Estimator</h1>
        <p className="text-lg text-slate-600">
          Quickly estimate how many tokens your prompt will consume.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-12">
        <label htmlFor="prompt-input" className="block text-sm font-medium text-slate-700 mb-2">
          Paste your text here
        </label>
        <textarea
          id="prompt-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to estimate tokens..."
          className="w-full h-64 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y font-mono text-sm mb-6"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
            <span className="text-sm text-slate-500 font-medium mb-1">Characters</span>
            <span className="text-3xl font-bold text-slate-900">{charCount.toLocaleString()}</span>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center justify-center">
            <span className="text-sm text-blue-600 font-medium mb-1">Estimated Tokens</span>
            <span className="text-3xl font-bold text-blue-700">{tokenEstimate.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
            <span className="block text-xs font-medium text-slate-500">Words</span>
            <span className="text-xl font-bold text-slate-900">{wordCount.toLocaleString()}</span>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
            <span className="block text-xs font-medium text-slate-500">Lines</span>
            <span className="text-xl font-bold text-slate-900">{lineCount.toLocaleString()}</span>
          </div>
          <button
            type="button"
            onClick={copyEstimate}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy estimate'}
          </button>
          <button
            type="button"
            onClick={() => {
              setText('');
              setCopied(false);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Your text is processed in this browser and is not sent to a server by this tool.
        </p>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2>How do token limits work?</h2>
        <p>
          Language models read text in chunks called <strong>tokens</strong>. A token can be a word, a part of a word, or even a single character. 
        </p>
        <p>
          As a rough rule of thumb, for typical English text, <strong>1 token is approximately 4 characters</strong> or 0.75 words. This estimator uses this simple heuristic to provide a baseline estimate. 
        </p>
        <h3>Why does it matter?</h3>
        <ul>
          <li><strong>Context Window:</strong> Models have a maximum number of tokens they can process in a single request (e.g., 8k, 32k, 128k, 1m+).</li>
          <li><strong>Pricing:</strong> API providers usually charge based on the number of tokens processed (input tokens) and generated (output tokens).</li>
          <li><strong>Performance:</strong> Larger prompts can lead to slower response times and higher costs.</li>
        </ul>
        <p>
          <em>Note: This tool provides a rough estimate. Actual token counts vary significantly depending on the exact tokenizer used by a specific model (e.g., OpenAI&apos;s tiktoken, Gemini&apos;s tokenizer) and the language of the text. Code and non-English languages often require more tokens per word.</em>
        </p>
      </article>
    </div>
  );
}
