import type { Metadata } from 'next';
import RelatedArticles from '@/components/RelatedArticles';
import { getArticle } from '@/lib/articles';
import { absoluteUrl } from '@/lib/site';

const article = getArticle('reliable-ai-agent-error-handling')!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  authors: [{ name: article.author, url: '/author/ali-raza' }],
  alternates: { canonical: article.path },
  openGraph: {
    title: article.title,
    description: article.description,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author],
    images: ['/opengraph-image'],
  },
};

export default function AgentErrorHandlingArticle() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <div className="article-cover mb-8 rounded-2xl border border-blue-100 px-6 py-10 text-left shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Reliability guide</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">Designing agents that fail honestly</p>
        </div>
        <p className="mb-2 text-sm font-medium text-blue-600">{article.category}</p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {article.title}
        </h1>
        <div className="text-sm text-slate-500">
          By <a href="/author/ali-raza" className="hover:text-blue-600">{article.author}</a> •{' '}
          <time dateTime={article.publishedAt}>November 4, 2026</time> • {article.readingTime}
        </div>
        <p className="mt-3 text-sm text-slate-500">Updated November 4, 2026</p>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.description,
            url: absoluteUrl(article.path),
            mainEntityOfPage: absoluteUrl(article.path),
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: { '@type': 'Person', name: article.author, url: absoluteUrl('/author/ali-raza') },
            publisher: { '@type': 'Person', name: article.author, url: absoluteUrl('/author/ali-raza') },
          }),
        }}
      />

      <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-pre:bg-slate-900 prose-pre:text-slate-50">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-slate-700">
          <strong className="text-blue-700">TL;DR — </strong>
          Treat model output, tool arguments, tool results, and external services as fallible
          boundaries. Validate each transition, classify failures, use bounded retries, make
          side-effects idempotent, and give the user an honest fallback when automation cannot
          continue safely.
        </div>

        <h2>Why an AI agent needs more than a retry loop</h2>
        <p>
          A conventional request may call one service and return one response. An agent workflow
          can select a tool, generate arguments, call an external service, interpret the response,
          and decide whether another step is needed. A failure at each boundary has a different
          cause and a different recovery strategy.
        </p>
        <p>
          For example, retrying a timeout may be reasonable. Retrying invalid JSON with the same
          prompt is usually not. Repeating a payment, email, or data mutation without an idempotency
          key can create a duplicate side effect. Reliability begins by separating these cases
          instead of treating every error as “ask the model again.”
        </p>

        <h2>Map the workflow before adding recovery</h2>
        <p>
          Write down the steps of the workflow and mark where data changes form or crosses a
          trust boundary. A useful minimum map is:
        </p>
        <ol>
          <li>User request and authorization context</li>
          <li>Model response and selected tool call</li>
          <li>Tool argument validation</li>
          <li>External tool execution</li>
          <li>Tool result validation and redaction</li>
          <li>Final response or side effect</li>
        </ol>
        <p>
          This map gives each failure a location. It also shows where logs should carry a request
          identifier and where a human confirmation step may be required.
        </p>

        <h2>Validate model-generated arguments</h2>
        <p>
          Never pass model-generated arguments directly into a database, shell command, email
          provider, or third-party API. Parse them with a schema, enforce authorization separately,
          and reject values outside the tool’s allowed range. Validation is not a replacement for
          permission checks: a well-formed request can still be unauthorized.
        </p>
        <pre><code>{`const parsed = toolSchema.safeParse(modelToolCall.arguments);

if (!parsed.success) {
  return {
    status: 'needs_correction',
    message: 'The tool arguments did not match the required format.',
  };
}

if (!canRunTool(user, parsed.data)) {
  return { status: 'forbidden', message: 'This action is not allowed.' };
}

const result = await runTool(parsed.data);
return resultSchema.parse(result);`}</code></pre>
        <p>
          A structured validation result can be returned to the model for a limited correction
          attempt, but the system should still enforce a maximum number of attempts.
        </p>

        <h2>Classify failures before choosing a response</h2>
        <ul>
          <li><strong>Validation failure:</strong> repair or reject the input; do not blindly retry.</li>
          <li><strong>Authentication or authorization failure:</strong> stop and report the boundary.</li>
          <li><strong>Rate limit or temporary network failure:</strong> retry with backoff if safe.</li>
          <li><strong>Provider or dependency failure:</strong> use a known fallback or stop clearly.</li>
          <li><strong>Business-rule failure:</strong> explain what condition prevented the action.</li>
          <li><strong>Unknown failure:</strong> record diagnostics and avoid a success-shaped response.</li>
        </ul>

        <h2>Use bounded, safe retries</h2>
        <p>
          A retry policy should specify the maximum attempts, eligible failure classes, delay
          strategy, and total time budget. Exponential backoff with jitter prevents many workers
          from retrying at exactly the same moment. Do not retry a non-idempotent side effect
          unless the downstream operation supports an idempotency key or the application can prove
          that the first attempt did not complete.
        </p>
        <pre><code>{`for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
  try {
    return await callWithTimeout(tool, TIMEOUT_MS);
  } catch (error) {
    if (!isRetryable(error) || attempt === MAX_ATTEMPTS - 1) {
      throw error;
    }
    await sleep(backoffWithJitter(attempt));
  }
}`}</code></pre>

        <h2>Make side effects observable and idempotent</h2>
        <p>
          Reading data and changing data are different risk levels. Before an agent sends a
          message, creates a record, changes access, or triggers a deployment, define the
          operation identifier and the confirmation policy. Store enough state to recognize a
          repeated request. If the action is high impact, show the user what will happen and ask
          for confirmation after the agent has prepared the action but before it executes it.
        </p>

        <h2>Design an honest fallback</h2>
        <p>
          A fallback should preserve the truth about the operation. “The request was accepted” is
          not an acceptable fallback if the downstream system never confirmed it. Prefer messages
          such as “We could not verify the result; check the activity log before trying again.”
          For recoverable tasks, offer a retry button that starts a new, traceable attempt.
        </p>

        <h2>Log for diagnosis without logging secrets</h2>
        <p>
          Record a workflow identifier, step name, latency, retry count, failure category, and
          whether a fallback or human review was used. Redact access tokens, personal data, and
          full prompts when they are not required for diagnosis. A log that contains secrets is a
          new security problem, not an observability improvement.
        </p>
        <ul>
          <li>Workflow and request identifiers</li>
          <li>Tool name and schema version</li>
          <li>Validation result and failure category</li>
          <li>Timeout, retry, and provider status information</li>
          <li>Final outcome: completed, rejected, pending, or needs review</li>
        </ul>

        <h2>A practical test matrix</h2>
        <p>
          Reliability should be tested with deterministic failures, not only successful demos.
          Include malformed tool arguments, empty results, rate limits, timeouts, expired
          credentials, duplicate delivery, partial downstream success, and a model response that
          chooses an unavailable tool. Verify that every case produces the intended user-visible
          status and leaves no untracked side effect.
        </p>

        <h2>FAQ</h2>
        <h3>Should every model response be retried?</h3>
        <p>
          No. Retry only a classified, likely temporary failure. A malformed response should be
          rejected or corrected with additional context, while an authorization failure should
          stop the workflow.
        </p>
        <h3>How many retries should an agent have?</h3>
        <p>
          Start with a small explicit budget and measure latency, cost, and recovery rate. A
          read-only lookup can tolerate a different budget from a workflow that changes data.
        </p>
        <h3>How can I estimate prompt size before a run?</h3>
        <p>
          The <a href="/tools/token-estimator">LLM Token Estimator</a> provides a rough, browser-only
          estimate. It is not a tokenizer for a specific provider, so production code should use
          the exact tokenizer or usage data for the selected model.
        </p>

        <h2>References</h2>
        <ul>
          <li><a href="https://platform.openai.com/docs/guides/function-calling" target="_blank" rel="noopener noreferrer">OpenAI function-calling guidance</a></li>
          <li><a href="https://json-schema.org/learn/getting-started-step-by-step" target="_blank" rel="noopener noreferrer">JSON Schema fundamentals</a></li>
          <li><a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer">Google guidance on helpful, reliable content</a></li>
        </ul>
      </div>
      <RelatedArticles slug={article.slug} />
    </article>
  );
}
