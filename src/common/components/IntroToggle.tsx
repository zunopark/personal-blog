'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Intro } from '@/common/components/Intro';
import { Button } from '@/common/components/ui/button';

export function IntroToggle() {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <div className="shrink-0 w-full flex flex-col items-center py-4">
      {showIntro ? (
        <>
          <Intro />
          <Button
            variant="ghost"
            size="sm"
            className="rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 mt-2 gap-1.5 font-normal"
            onClick={() => setShowIntro(false)}
          >
            <ChevronUp className="size-4" />
            소개 접기
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 gap-1.5 font-normal"
          onClick={() => setShowIntro(true)}
        >
          <ChevronDown className="size-4" />
          블로그 소개 열기
        </Button>
      )}
    </div>
  );
}
