import { Component, ReactNode } from "react";

import { ErrorPage } from "../../pages/ErrorPage/ErrorPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage message={this.state.errorMessage} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
