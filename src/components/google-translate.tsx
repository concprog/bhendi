// components/GoogleTranslateWidget.tsx
import React, { useState, useEffect } from 'react';
import Script from 'next/script';

// Define the languages you want to support
const languages = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Hindi', value: 'hi' },
  // Add more languages as needed
];

// Function to initialize the Google Translate Element (remains the same)
function googleTranslateElementInit() {
  // ... (initialization logic as before) ...
  if (window.google && window.google.translate) {
    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: languages.map(lang => lang.value).join(','),
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  } else {
    console.error("Google Translate script not loaded yet.");
  }
}


// Custom Language Selector Component - UPDATED WITH TAILWIND CLASSES
function LanguageSelector({ onChange, value }: { onChange: (value: string) => void; value: string }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
      // --- Add Tailwind classes here ---
      className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors duration-150 ease-in-out"
      // --- End Tailwind classes ---
      aria-label="Select language"
    >
      {languages.map((it) => (
        <option className="bg-gray-800 text-gray-200" value={it.value} key={it.value}> {/* Optional: Style options too */}
          {it.label}
        </option>
      ))}
    </select>
  );
}


export function GoogleTranslateWidget() {
  const [selectedValue, setSelectedValue] = useState('en');

  useEffect(() => {
    // ... (useEffect logic as before) ...
    window.googleTranslateElementInit = googleTranslateElementInit;

    const gTranslateElement = document.getElementById('google_translate_element');
    if (window.google && window.google.translate && gTranslateElement && !gTranslateElement.hasChildNodes()) {
        googleTranslateElementInit();
    }

    const observer = new MutationObserver(() => {
      const langCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('googtrans='))
        ?.split('=')[1];

      if (langCookie) {
        const selectedLang = langCookie.split('/')[2];
        if (selectedLang && selectedLang !== selectedValue && languages.some(l => l.value === selectedLang)) {
          setSelectedValue(selectedLang);
        }
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['lang'] });

    return () => {
       observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = (value: string) => {
     // ... (handleLanguageChange logic as before) ...
     setSelectedValue(value);
     const googleTranslateElement = document.getElementById('google_translate_element');
     const selectElement = googleTranslateElement?.querySelector('.goog-te-combo') as HTMLSelectElement | null;

     if (selectElement) {
       selectElement.value = value;
       selectElement.dispatchEvent(new Event('change'));
     } else {
        console.error("Could not find the Google Translate select element (.goog-te-combo).");
     }
  };

  return (
    <div className="google-translate-container">
      {/* Hidden div (remains the same) */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* Our custom language selector (now styled) */}
      <LanguageSelector onChange={handleLanguageChange} value={selectedValue} />

      {/* Script tag (remains the same) */}
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        onError={(e) => {
            console.error('Google Translate script failed to load:', e);
        }}
      />
    </div>
  );
}

// Global type definition (remains the same)
declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: any;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}