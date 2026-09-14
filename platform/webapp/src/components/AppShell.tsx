'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { ReactNode } from 'react';

const NAV = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/readiness', label: 'Readiness' },
  { href: '/pilots', label: 'Pilots' },
  { href: '/gates', label: 'Gates' },
  { href: '/custodians', label: 'Custodians' },
  { href: '/talent', label: 'Talent' },
  { href: '/shadow', label: 'Shadow AI' },
  { href: '/reviews', label: 'Reviews' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideShell = pathname === '/login' || pathname === '/';

  if (hideShell) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-graphite-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/portfolio" className="font-display text-2xl tracking-tight text-brand">
            Pilotspan
          </Link>
          <div className="hidden text-sm text-steel md:block">
            Org · Pilotspan Demo
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition',
                  active
                    ? 'bg-chalk/20 text-ink'
                    : 'text-steel hover:bg-white/5 hover:text-ink'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8 animate-admit">{children}</main>
    </div>
  );
}
