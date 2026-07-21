import { Component } from "react";

/** Keeps a render-time crash from leaving the user with a blank page. */
export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error", error, info);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="grid min-h-dvh place-items-center p-6">
        <div className="max-w-md space-y-3 rounded-panel border border-line bg-surface p-6 text-center">
          <h1 className="font-serif text-lg text-ink">Something went wrong</h1>
          <p className="text-[13px] leading-relaxed break-words text-muted">
            {error.message}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-9 rounded-control bg-ink px-4 text-[13px] font-medium text-paper transition-colors hover:bg-ink-hover"
          >
            Reload the app
          </button>
        </div>
      </div>
    );
  }
}
