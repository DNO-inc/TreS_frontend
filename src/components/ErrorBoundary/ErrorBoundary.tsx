import { Component, ReactNode } from 'react'

import ErrorPage from 'pages/ErrorPage'

/**
 * Props for the {@link ErrorBoundary} component.
 */
interface ErrorBoundaryProps {
  /**
   * React child components that the error boundary wraps.
   */
  children: ReactNode
}

/**
 * State for the {@link ErrorBoundary} component.
 */
interface ErrorBoundaryState {
  /**
   * Whether an error has occurred.
   */
  hasError: boolean

  /**
   * Optional error message to display when an error occurs.
   */
  errorMessage?: string
}

/**
 * `ErrorBoundary` is a React class component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI (`ErrorPage`) instead of the crashed component tree.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * @remarks
 * React Error Boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
 *
 * @see {@link https://reactjs.org/docs/error-boundaries.html | React Error Boundaries}
 *
 * @category Components
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Creates a new instance of the ErrorBoundary component.
   *
   * @param props - The props passed to the component.
   */
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  /**
   * Lifecycle method that updates state when an error is thrown.
   *
   * @param _ - The error that was thrown (not used here).
   * @returns The updated state indicating an error has occurred.
   */
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  /**
   * Lifecycle method that catches the error and updates the state with the error message.
   *
   * @param error - The error that was caught.
   */
  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMessage: error.message })
  }

  /**
   * Renders either the fallback UI (`ErrorPage`) if an error occurred,
   * or the child components otherwise.
   *
   * @returns The rendered output.
   */
  render() {
    if (this.state.hasError) {
      return <ErrorPage message={this.state.errorMessage} />
    }

    return this.props.children
  }
}

export { ErrorBoundary }
