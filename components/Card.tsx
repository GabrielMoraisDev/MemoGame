"use client";

import '../app/globals.css';
import Image from 'next/image';

type CardProps = {
  img: number;
  dificulty: string;
  onCardClick: () => void;
  changed: boolean;
  disabled: boolean;
};

export default function Card({ img, dificulty, onCardClick, changed, disabled }: CardProps) {
  const bgClass = `bg-${dificulty}-600`;

  return (
    <div className={`${dificulty === 'teal' ? 'w-20 h-20' : 'w-16 h-16'} relative flex justify-center items-center m-4`}>
      {/* <div className="absolute top-0 left-0 z-30">{img}</div> */}
      <Image 
        src="/img/mistery.png" 
        alt="" 
        width={50} 
        height={50} 
        className={`absolute ${bgClass} h-full rounded-md duration-300 ${changed ? 'w-0' : 'w-full z-20'}`} 
        onClick={!disabled ? onCardClick : undefined}
      />
      <Image 
        src={`/img/${img}.png`} 
        alt="" 
        width={50} 
        height={50} 
        className={`absolute bg-${dificulty}-200 h-full rounded-md duration-300 border-2 border-${dificulty}-600 ${changed ? 'w-full z-20' : 'w-0'}`} 
      />
    </div>
  );
}
