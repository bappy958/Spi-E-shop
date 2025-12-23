import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-academic-50 dark:bg-academic-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-academic-800 rounded-lg shadow-lg p-6 border-2 border-burgundy-600">
            <h1 className="text-2xl font-display font-bold text-burgundy-600 mb-4">Something went wrong</h1>
            <p className="text-academic-700 dark:text-academic-300 mb-4">
              {this.state.error?.toString() || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-academic"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

