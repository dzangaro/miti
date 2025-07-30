
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthProps {
  password: string;
}

interface PasswordChecks {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const checks: PasswordChecks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const strength = Object.values(checks).filter(Boolean).length;
  const percentage = (strength / 5) * 100;

  const getStrengthLabel = () => {
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-500">Password Strength</span>
        <span className={`text-sm ${
          strength <= 2 ? 'text-red-500' : strength <= 4 ? 'text-yellow-500' : 'text-green-500'
        }`}>
          {getStrengthLabel()}
        </span>
      </div>
      <Progress value={percentage} className={`h-1 ${getStrengthColor()}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
        <div className={`text-xs ${checks.length ? 'text-green-500' : 'text-gray-400'}`}>
          ✓ At least 12 characters
        </div>
        <div className={`text-xs ${checks.uppercase ? 'text-green-500' : 'text-gray-400'}`}>
          ✓ At least 1 uppercase letter
        </div>
        <div className={`text-xs ${checks.lowercase ? 'text-green-500' : 'text-gray-400'}`}>
          ✓ At least 1 lowercase letter
        </div>
        <div className={`text-xs ${checks.number ? 'text-green-500' : 'text-gray-400'}`}>
          ✓ At least 1 number
        </div>
        <div className={`text-xs ${checks.special ? 'text-green-500' : 'text-gray-400'}`}>
          ✓ At least 1 special character
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
