// components/auth/AuthForm.tsx
import React, { useState } from 'react';
import FormInput from './FormInput';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

interface AuthFormProps {
  onSubmit: (credentials: { email: string; password: string; name?: string }) => void;
  isLogin?: boolean;
  error?: string;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  isLogin = true,
  error,
  isLoading,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(isLogin ? { email, password } : { email, password, name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-600 text-center p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {!isLogin && (
        <FormInput
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          icon={<FaUser />}
        />
      )}

      <FormInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        icon={<FaEnvelope />}
      />

      <FormInput
        id="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        icon={<FaLock />}
        endAdornment={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
      />

      <div className="pt-4">
        <button
          disabled={isLoading}
          className={`w-full flex justify-center items-center ${
            isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors duration-200`}
          type="submit"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : isLogin ? (
            'Sign In'
          ) : (
            'Register'
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
