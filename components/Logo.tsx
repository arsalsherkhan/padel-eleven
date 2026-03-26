import React from 'react';
import Link from 'next/link';

export const LogoFull = () => {
  return (
    <div className="flex flex-col items-start font-condensed font-extrabold tracking-[5px] text-6xl md:text-[92px] leading-none inline-block">
      <div className="text-chalk">PADEL</div>
      <div className="text-volt">ELEVEN</div>
      <div className="w-full h-[2px] bg-volt mt-4 mb-2"></div>
    </div>
  );
};

export const LogoCompact = () => {
  return (
    <Link href="/" className="flex items-center font-condensed font-black text-3xl md:text-5xl tracking-normal">
      <span className="text-chalk">P</span>
      <span className="text-volt">11</span>
    </Link>
  );
};
