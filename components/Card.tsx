'use client'
import '../app/globals.css'
import Image from 'next/image';

type CardProps = {
  img: number;
  dificulty: string; 
  onCardClick: () => void;
  changed: boolean; 
  disabled: boolean; 
};

export default function Card({ img, dificulty, onCardClick, changed, disabled }: CardProps) {
  return (
    <div className="w-20 h-20 relative flex justify-center items-center m-4">
      <Image 
        src="/img/mistery.png" 
        alt="" 
        width={50} 
        height={50} 
        className={`absolute bg-${dificulty}-600 h-full rounded-md duration-300 ${changed ? 'w-0': 'w-full z-20'}`} 
        onClick={!disabled ? onCardClick : undefined}
      />
      <Image 
        src={`/img/${img}.png`} 
        alt="" 
        width={50} 
        height={50} 
        className={`absolute bg-${dificulty}-200 h-full rounded-md duration-300 border-2 border-${dificulty}-600 ${changed ? 'w-full z-20': 'w-0'}`} 
        onClick={!disabled ? onCardClick : undefined}
      />
    </div>
  );
}
