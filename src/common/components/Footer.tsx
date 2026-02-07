import Link from 'next/link';
import { Separator } from '@/common/components/ui/separator';

const FOOTER_MENU = [
  { label: '이용약관', href: '/terms' },
  { label: '개인정보처리방침', href: '/privacy' },
  { label: '권리침해신고', href: '/report' },
  { label: '협업 문의', href: '/contact' },
] as const;

export const Footer = () => {
  return (
    <footer className="w-full bg-muted/30 mt-auto">
      <Separator />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm"
          aria-label="푸터 메뉴"
        >
          {FOOTER_MENU.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="pt-6 border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} 테르
          </p>
          <p className="text-muted-foreground/80 text-xs mt-1">
            Built with Next.js · React · MDX
          </p>
        </div>
      </div>
    </footer>
  );
};