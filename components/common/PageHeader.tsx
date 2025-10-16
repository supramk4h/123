
import React from 'react';

interface PageHeaderProps {
  title: string;
  buttonText?: string;
  ButtonIcon?: React.FC<{className?: string}>;
  onButtonClick?: () => void;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, buttonText, ButtonIcon, onButtonClick, actions }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center space-x-2">
        {actions}
        {buttonText && ButtonIcon && onButtonClick && (
          <button 
            onClick={onButtonClick} 
            className="bg-primary hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md inline-flex items-center space-x-2 transition-colors"
          >
            <ButtonIcon className="w-5 h-5"/>
            <span>{buttonText}</span>
          </button>
        )}
      </div>
    </div>
  );
};
