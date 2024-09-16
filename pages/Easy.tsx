import '../app/globals.css'
import Card from '../components/Card'
import { useState, useMemo, useCallback } from 'react';

export default function Easy() {
  const [clickedCount, setClickedCount] = useState(0);
  const [cardStates, setCardStates] = useState(Array(10).fill(false));
  const [disabled, setDisabled] = useState(false); 

  const handleCardClick = useCallback((index) => {
    if (disabled) return;

    setCardStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });

    setClickedCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 2) {
        setDisabled(true); 
        setTimeout(() => {
          setClickedCount(0); 
          setCardStates(Array(10).fill(false));
          setDisabled(false); 
        }, 1000);
      }
      return newCount;
    });
  }, [disabled]);

  const array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
  const randomArray = useMemo(() => array.sort(() => Math.random() - 0.5), []);

  const cards = useMemo(() => (
    Array.from({ length: 10 }, (_, index) => (
      <Card 
        key={index} 
        img={randomArray[index]} 
        dificulty="teal" 
        onCardClick={() => handleCardClick(index)}
        changed={cardStates[index]}
        disabled={disabled}
      />
    ))
  ), [randomArray, cardStates, handleCardClick, disabled]);

  return (
    <div className='h-screen w-full flex items-center'>
      <div className="inline w-full">
        <p className='text-2xl text-center mb-5 text-teal-600 font-bold'>Easy Mode</p>
        <p className='text-xl text-center mb-5 text-teal-600'>Cards Clicked: {clickedCount}</p>
        <div className='grid grid-rows-5 grid-cols-2 w-[55%] gap-0 m-auto flex place-items-center h-[78vh]'>
          {cards}
        </div>
      </div>
    </div>
  )
}
