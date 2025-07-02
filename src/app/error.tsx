"use client";

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
    return (
        <div className="p-4 text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-600 mb-4">{error.message}</p>
            <button
                onClick={resetErrorBoundary}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Try again
            </button>
        </div>
    );
};

export default ErrorFallback;