'use client';

import { useState } from 'react';
import { Braces, Copy, RotateCcw } from 'lucide-react';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function formatJson() {
    try {
      const parsed: unknown = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
      setCopied(false);
    } catch (reason) {
      setOutput('');
      setError(reason instanceof Error ? reason.message : 'The input is not valid JSON.');
    }
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10 text-center">
        <Braces className="mx-auto mb-5 h-12 w-12 text-blue-600" />
        <h1 className="mb-4 text-3xl font-extrabold text-slate-900">JSON Formatter and Validator</h1>
        <p className="text-lg text-slate-600">
          Format JSON and catch syntax errors without sending your data to a server.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Input JSON</span>
          <textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setError('');
            }}
            placeholder='{"name":"DevsAgentic"}'
            className="min-h-80 w-full resize-y rounded-xl border border-slate-300 p-4 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            spellCheck={false}
          />
        </label>
        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">Formatted output</span>
          <pre className="min-h-80 overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100">
            {output || 'Formatted JSON will appear here.'}
          </pre>
        </div>
      </div>
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">
          Invalid JSON: {error}
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={formatJson} className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
          Format JSON
        </button>
        <button type="button" onClick={copyOutput} disabled={!output} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
          <Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy output'}
        </button>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Privacy note: formatting happens locally in your browser. This tool does not upload or store
        the JSON you enter.
      </p>
    </div>
  );
}
