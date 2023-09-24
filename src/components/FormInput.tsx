import React, { ChangeEvent } from 'react';

interface FormInputProps<T> {
    label: string;
    type: 'text' | 'date' | 'number' | 'checkbox';
    id?: string;
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    error?: string | number;
}

export const FormInput = <T,>({ label, type, id, value, onChange, placeholder, error }: FormInputProps<T>) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (type === 'checkbox') {
            onChange(event.target.checked as T);
        } else if (type === 'number') {
            onChange(parseFloat(event.target.value) as T);
        } else {
            onChange(event.target.value as T);
        }
    };

    return (
        <div className="flex-1">
            <label htmlFor={id} className="text-gray-900 dark:text-gray-200 text-sm font-medium whitespace-nowrap px-1">
                {label}
            </label>
            {type === 'checkbox' ? (
                <input
                    type={type}
                    id={id}
                    checked={value as any}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`h-5 accent-colorPrimary text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary p-3 w-full bg-whiteSecondary placeholder-gray-400 text-gray-900 dark:bg-darkSecondary dark:placeholder-gray-400 dark:text-gray-200 rounded-md focus:z-10 sm:text-sm ${error ? 'border-red-500' : ''}`}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    value={value as any}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary p-3 w-full bg-whiteSecondary placeholder-gray-400 text-gray-900 dark:bg-darkSecondary dark:placeholder-gray-400 dark:text-gray-200 rounded-md focus:z-10 sm:text-sm ${error ? 'border-red-500' : ''}`}
                />
            )}
            {error && typeof error === 'string' && (
                <span className="text-red-500 text-sm">{error}</span>
            )}
        </div>
    );
};