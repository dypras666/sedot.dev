import React, { useState, useEffect } from 'react';

const useTypingEffect = (text, typingSpeed = 150) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [index, text, typingSpeed]);

  return displayText;
};

const Logo = () => {
  const text = "./sedot.dev";
  const displayText = useTypingEffect(text);
  const isTypingComplete = displayText.length === text.length;

  return (
    <h1 className="text-2xl font-bold font-space-mono">
      <span className="inline-block min-w-[140px]">{displayText}</span>
      {!isTypingComplete && <span className="animate-blink">|</span>}
    </h1>
  );
};

export default Logo;