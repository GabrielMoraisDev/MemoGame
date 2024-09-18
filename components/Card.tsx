import '../app/globals.css';
import Image from 'next/image';

type CardProps = {
  img: number;
  color: string;
  onCardClick: () => void;
  changed: boolean;
  disabled: boolean;
};

const colorMap: { [key: string]: string } = {
  easy: 'bg-teal-600',
  normal: 'bg-sky-600',
  hard: 'bg-red-600',
  // Adicione mais cores conforme necessário
};

const colorBorderMap: { [key: string]: string } = {
  easy: 'border-teal-600',
  normal: 'border-sky-600',
  hard: 'border-red-600',
  // Adicione mais cores conforme necessário
};

const colorBgLightMap: { [key: string]: string } = {
  easy: 'bg-teal-300',
  normal: 'bg-sky-300',
  hard: 'bg-red-300',
  // Adicione mais cores conforme necessário
};

export default function Card({ img, color, onCardClick, changed, disabled }: CardProps) {
  const bgClass = colorMap[color] || 'bg-gray-600';
  const borderClass = colorBorderMap[color] || 'border-gray-600';
  const bgLightClass = colorBgLightMap[color] || 'bg-gray-200';

  return (
    <div className={`relative flex justify-center items-center m-4 ${color === 'easy' ? 'w-20 h-20' : (color === 'normal' ? 'w-16 h-16' : 'w-12 h-12')}`}>
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
        className={`absolute ${bgLightClass} h-full rounded-md duration-300 border-2 ${borderClass} ${changed ? 'w-full z-20' : 'w-0'}`} 
      />
    </div>
  );
}
