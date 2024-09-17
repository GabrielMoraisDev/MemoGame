"use client";

import '../app/globals.css';
import Card from '../components/Card';
import { useState, useEffect, useCallback, useMemo } from 'react';

function shuffleArray(array:number[]) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default function Normal() {
  const [clickedCount, setClickedCount] = useState(0);
  const [cardStates, setCardStates] = useState(Array(10).fill(false));
  const [matchedCards, setMatchedCards] = useState<boolean[]>(Array(20).fill(false));
  const [disabled, setDisabled] = useState(false);
  const [lastImg, setLastImg] = useState<number | null>(null);
  const [randomArray, setRandomArray] = useState<number[]>([]);

  useEffect(() => {
    const array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    setRandomArray(shuffleArray(array));
  }, []);

  const handleCardClick = useCallback((index: number, img: number) => {
    if (disabled || matchedCards[index]) return;

    setCardStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });

    setClickedCount(prevCount => {
      if (prevCount > 0 && lastImg !== null) {
        setLastImg(img);

        if (img === lastImg) {
          alert('SIM, as imagens são iguais!');

          setMatchedCards(prevMatchedCards => 
            prevMatchedCards.map((matched, idx) => 
              matched || randomArray[idx] === img
            )
          );
        }
      } else {
        setLastImg(img);
      }

      const newCount = prevCount + 1;
      if (newCount >= 2) {
        setDisabled(true);
        setTimeout(() => {
          setClickedCount(0);
          setCardStates(Array(10).fill(false));
          setDisabled(false);
          setLastImg(null);
        }, 1000);
      }
      return newCount;
    });
  }, [disabled, lastImg, matchedCards, randomArray]);

  const cards = useMemo(() => (
    randomArray.map((img, index) => (
      <Card 
        key={index} 
        img={img} 
        dificulty="sky" 
        onCardClick={() => handleCardClick(index, img)}
        changed={cardStates[index] || matchedCards[index]}
        disabled={disabled || matchedCards[index]}
      />
    ))
  ), [randomArray, cardStates, handleCardClick, disabled, matchedCards]);

  return (
    <div className='h-screen w-full flex items-center'>
      <div className="inline w-full">
        <p className='text-2xl text-center mb-5 text-teal-600 font-bold'>Easy Mode</p>
        <p className='text-xl text-center mb-5 text-teal-600'>Cards clicados: {clickedCount}</p>
        <div className='grid grid-rows-6 grid-cols-4 w-[85%] gap-0 m-auto flex place-items-center h-[78vh]'>
          {cards}
        </div>
      </div>
    </div>
  );
}
