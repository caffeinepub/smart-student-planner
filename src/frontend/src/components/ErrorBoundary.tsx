import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            background: "#070818",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
            gap: "16px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              marginBottom: "8px",
            }}
          >
            ⚠
          </div>
          <h2 style={{ color: "#FF5A6A", margin: 0, fontSize: "20px" }}>
            Something went wrong
          </h2>
          <p
            style={{
              color: "#AAB2C5",
              fontSize: "13px",
              maxWidth: "400px",
              margin: 0,
            }}
          >
            {this.state.error?.message ?? "An unexpected error occurred"}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              background: "linear-gradient(135deg, #9B6CFF, #4FE6FF)",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              marginTop: "4px",
            }}
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
