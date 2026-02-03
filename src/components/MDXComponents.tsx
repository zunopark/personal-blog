import React from 'react';

// Callout 컴포넌트 - info, warning, error 타입 지원
interface CalloutProps {
  type?: 'info' | 'warning' | 'error';
  children: React.ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900',
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <div className={`my-6 p-6 rounded-xl border-2 ${styles[type]} shadow-sm`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{icons[type]}</span>
        <div className="flex-1 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// AdSlot 컴포넌트 - Google AdSense 준비
interface AdSlotProps {
  id?: string;
}

export function AdSlot({ id }: AdSlotProps) {
  return (
    <div className="my-8 p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-center">
      <p className="text-gray-400 text-sm font-medium">
        📢 광고 영역 {id && `(${id})`}
      </p>
      <p className="text-gray-300 text-xs mt-2">Google AdSense 연동 예정</p>
    </div>
  );
}

// 커스텀 코드 블록 스타일링
function Code({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  );
}

function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-6 shadow-lg"
      {...props}
    >
      {children}
    </pre>
  );
}

// 커스텀 링크 스타일링
function A({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors"
      {...props}
    >
      {children}
    </a>
  );
}

// 커스텀 제목 스타일링
function H2({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className="text-3xl font-bold mt-12 mb-6 text-gray-900 border-b-2 border-gray-200 pb-3"
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className="text-2xl font-semibold mt-8 mb-4 text-gray-800"
      {...props}
    >
      {children}
    </h3>
  );
}

// 커스텀 문단 스타일링
function P({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="my-4 leading-relaxed text-gray-700" {...props}>
      {children}
    </p>
  );
}

// 커스텀 리스트 스타일링
function Ul({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className="my-6 space-y-2 list-disc list-inside text-gray-700" {...props}>
      {children}
    </ul>
  );
}

function Ol({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className="my-6 space-y-2 list-decimal list-inside text-gray-700" {...props}>
      {children}
    </ol>
  );
}

// 인용구 스타일링
function Blockquote({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className="border-l-4 border-gray-300 pl-6 py-2 my-6 italic text-gray-600 bg-gray-50 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  );
}

// 모든 커스텀 컴포넌트를 export
export const mdxComponents = {
  Callout,
  AdSlot,
  code: Code,
  pre: Pre,
  a: A,
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  blockquote: Blockquote,
};
