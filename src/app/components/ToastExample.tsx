'use client';

import { useToast } from "@/app/hooks/useToast";

export const ToastExample = () => {
    const { showToast, promiseToast } = useToast();

    const handleSimpleToast = () => {
        showToast('Hello World!');
    };

    const handleSuccessToast = () => {
        showToast('Operation successful!', 'success');
    };

    const handleErrorToast = () => {
        showToast('Something went wrong!', 'error');
    };

    const handlePromiseToast = async () => {
        // Simulating an API call
        const fakePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve('Data fetched successfully!') : reject('Failed to fetch data');
            }, 2000);
        });

        promiseToast(fakePromise, {
            loading: 'Fetching data...',
            success: 'Data loaded successfully!',
            error: 'Failed to load data'
        });
    };

    return (
        <div className="flex flex-wrap gap-4">
            <button onClick={handleSimpleToast} className="btn btn-primary">
                Show Simple Toast
            </button>
            <button onClick={handleSuccessToast} className="btn btn-success">
                Show Success Toast
            </button>
            <button onClick={handleErrorToast} className="btn btn-error">
                Show Error Toast
            </button>
            <button onClick={handlePromiseToast} className="btn btn-info">
                Show Promise Toast
            </button>
        </div>
    );
};