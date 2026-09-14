'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-end overflow-hidden px-8 pb-16 pt-24 md:justify-center md:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(123,163,201,0.22),_transparent_55%),linear-gradient(160deg,#0C1016_0%,#161C26_55%,#0C1016_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 46px, rgba(168,196,222,0.12) 47px)',
        }}
      />
      <motion.div
        className="relative z-10 max-w-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="font-display text-5xl text-brand md:text-6xl">Pilotspan</p>
        <h1 className="mt-6 font-display text-3xl leading-tight text-ink md:text-4xl">
          Graduate pilots that prove value
        </h1>
        <p className="mt-4 max-w-md text-steel">
          Readiness, anonymisation gates, custodians, and cadence — not a model factory.
        </p>
        <Link
          href="/portfolio"
          className="mt-10 inline-flex rounded-md bg-chalk px-5 py-3 text-sm font-medium text-graphite-950 transition hover:bg-chalk-soft"
        >
          Enter portfolio desk
        </Link>
      </motion.div>
    </div>
  );
}
