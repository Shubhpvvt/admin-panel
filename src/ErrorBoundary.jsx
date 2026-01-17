import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crashed: false };
  }

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  render() {
    if (this.state.crashed) {
      return (
        <div style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial"
        }}>
          <h2>Something went wrong</h2>
          <p>Please reload the page</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 16px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "6px"
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
