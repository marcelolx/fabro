import { useState, type FormEvent, type KeyboardEvent } from "react";

export interface SteerBarProps {
  runId: string;
}

export function SteerBar({ runId: _runId }: SteerBarProps) {
  const [text, setText] = useState("");
  const trimmed = text.trim();
  const canSubmit = trimmed.length > 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setText("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSubmit) {
        setText("");
      }
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
      <div className="bg-linear-to-t from-page via-page/80 to-transparent pt-10">
        <div className="pointer-events-auto mx-auto max-w-5xl px-4 pb-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            aria-label="Steer running agent"
            className="flex items-end gap-2 rounded-2xl bg-panel p-2 shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.5)] ring-1 ring-line-strong"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Steer the agent…"
              rows={1}
              maxLength={8192}
              aria-label="Steering message"
              className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-fg outline-hidden placeholder:text-fg-muted"
            />
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-teal-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
