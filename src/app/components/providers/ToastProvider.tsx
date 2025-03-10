'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Default options for all toasts
                className: 'bg-base-100 text-base-content',
                duration: 5000,
                style: {
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                },
                // Configuration for specific toast types
                success: {
                    className: 'bg-success/10 text-success-content border border-success',
                    icon: '✅',
                    duration: 3000,
                },
                error: {
                    className: 'bg-error/10 text-error-content border border-error',
                    icon: '❌',
                    duration: 4000,
                },
                loading: {
                    className: 'bg-info/10 text-info-content border border-info',
                    icon: '⏳',
                    duration: Infinity,
                },
            }}
        />
    );
}