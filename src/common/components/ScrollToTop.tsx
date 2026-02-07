'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/common/components/ui/button';

const SCROLL_THRESHOLD = 200;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full border-border bg-background/95 shadow-md backdrop-blur hover:bg-accent"
      aria-label="맨 위로"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}
