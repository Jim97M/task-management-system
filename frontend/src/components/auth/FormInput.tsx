import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  icon,
  endAdornment,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.id}
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full py-2 px-3 ${
            icon ? 'pl-10' : ''
          } ${endAdornment ? 'pr-10' : ''} border border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
          {...props}
        />
        {endAdornment && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {endAdornment}
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
