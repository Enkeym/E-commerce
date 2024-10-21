import { useEffect, useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const resetError = () => {
    setHasError(false);
  };

  useEffect(() => {
    const handleError = (error) => {
      console.error("Caught by ErrorBoundary:", error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <button onClick={resetError}>Try again</button>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
