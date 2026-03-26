import { LogoFull, LogoCompact } from '@/components/Logo';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-coal flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <LogoCompact />
      </div>

      <div className="flex flex-col items-center text-center max-w-2xl mx-auto w-full z-10 pt-16 pb-24">
        <h1 className="font-condensed font-black text-chalk text-[64px] leading-[1.1] md:text-[120px] md:leading-[1] uppercase tracking-[2px] mb-6">
          PADEL. ELEVATED.
        </h1>
        
        <p className="font-sans font-normal text-[#666] text-[18px] max-w-[520px] mb-12">
          Pakistan&apos;s first padel matchmaking and court booking app. Launching in Lahore.
        </p>

        <div className="mb-16">
          <LogoFull />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-6">
          <Link 
            href="/player" 
            className="w-full sm:w-1/2 flex items-center justify-center h-[42px] px-6 rounded-lg bg-volt text-coal font-condensed font-bold text-[16px] uppercase tracking-[2px] transition-opacity hover:opacity-90"
          >
            I&apos;M A PLAYER
          </Link>
          <Link 
            href="/court" 
            className="w-full sm:w-1/2 flex items-center justify-center h-[42px] px-6 rounded-lg bg-transparent border-[0.75px] border-plasma text-plasma font-condensed font-bold text-[16px] uppercase tracking-[2px] transition-colors hover:bg-plasma/10"
          >
            I&apos;M A COURT
          </Link>
        </div>

        <p className="font-sans font-light text-[#444] text-[12px]">
          Be among the first. No spam.
        </p>
      </div>

      <footer className="absolute bottom-6 w-full text-center">
        <p className="font-sans font-light text-[#444] text-[12px]">
          © 2025 Padel Eleven. Lahore, Pakistan.
        </p>
      </footer>
    </main>
  );
}
