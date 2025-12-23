import { useState, useEffect } from 'react';
import { School } from 'lucide-react';

const Logo = ({ className = '', size = 'default', showText = false }) => {
  const [logoError, setLogoError] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');

  useEffect(() => {
    // Try different logo file names
    const possibleLogos = [
      '/logo.png',
      '/logo.jpg',
      '/logo.svg',
      '/institute-logo.png',
      '/institute-logo.jpg',
      '/institute-logo.svg',
      '/Screenshot 2025-12-23 073647.png', // Use the existing screenshot if it's the logo
    ];

    const testLogo = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    };

    const findLogo = async () => {
      for (const logoPath of possibleLogos) {
        const result = await testLogo(logoPath);
        if (result) {
          setLogoSrc(result);
          return;
        }
      }
      setLogoError(true);
    };

    findLogo();
  }, []);

  // Size variants
  const sizeClasses = {
    small: 'h-8 w-8',
    default: 'h-12 w-12',
    large: 'h-16 w-16',
    xl: 'h-20 w-20',
  };

  const iconSizes = {
    small: 'w-5 h-5',
    default: 'w-7 h-7',
    large: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  if (logoError) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-burgundy-600 to-burgundy-700 rounded-lg flex items-center justify-center shadow-md`}>
        <School className={`${iconSizes[size]} text-white`} />
      </div>
    );
  }

  return (
    <div className={`${className} flex items-center space-x-2`}>
      <img
        src={logoSrc}
        alt="Institute Logo"
        className={`${sizeClasses[size]} object-contain`}
        onError={() => setLogoError(true)}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-sm font-display font-bold text-burgundy-600 dark:text-burgundy-400">
            SATKHIRA POLYTECHNIC INSTITUTE
          </span>
          <span className="text-xs text-academic-600 dark:text-academic-400 font-medium">
            Departmental Store
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

