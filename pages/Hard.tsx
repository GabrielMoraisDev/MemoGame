import '../app/globals.css';
import Card from '../components/Card';
import HomeBtn from '../components/HomeBtn';
import Stars from '../components/Stars';
import Sucess from '../components/Sucess';
import Timer from '../components/Timer';
import { useState, useEffect, useCallback, useMemo } from 'react';

function shuffleArray(array: number[]) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default function Easy() {
  const [clickedCount, setClickedCount] = useState(0);
  const [cardStates, setCardStates] = useState(Array(40).fill(false));
  const [matchedCards, setMatchedCards] = useState<boolean[]>(Array(40).fill(false));
  const [disabled, setDisabled] = useState(false);
  const [lastImg, setLastImg] = useState<number | null>(null);
  const [randomArray, setRandomArray] = useState<number[]>([]);
  const [showStars, setShowStars] = useState(false); // Novo estado para controlar o Stars
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    const array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19];
    setRandomArray(shuffleArray(array));
  }, []);

  useEffect(() => {
    // Verifica se todos os elementos de matchedCards são true
    if (matchedCards.every(Boolean)) {
      setSucess(true)
    }
  }, [matchedCards, sucess]);

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
          setShowStars(true);
          
          setTimeout(() => {
            setShowStars(false);
          },1000);

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
          setCardStates(Array(40).fill(false));
          setDisabled(false);
          setLastImg(null);
          setShowStars(false); // Esconder o componente Stars após o reset
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
        color="hard"
        onCardClick={() => handleCardClick(index, img)}
        changed={cardStates[index] || matchedCards[index]}
        disabled={disabled || matchedCards[index]}
      />
    ))
  ), [randomArray, cardStates, handleCardClick, disabled, matchedCards]);
  return (
    <>    
    <div className='hidden'>{clickedCount}</div>
    <Sucess mode='Hard' op={sucess} />
    {showStars && <Stars apply={true} />}
    <div className='w-full flex items-center overflow-hidden'>
    {sucess === false ?<HomeBtn color='hard'/> : ''}
      <div className="inline w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className='text-2xl text-center mb-5 text-red-600 font-bold'>Hard Mode</p>
        {sucess === false ? <Timer></Timer>: <p className='text-center m-auto text-2xl mb-5 text-hard-600'>Parabéns!</p>}
        <div className='grid grid-rows-8 grid-cols-5 w-[95%] md:w-[30%] lg:w-[35%] xl:w-[23%] 2xl:w-[25%] gap-0 m-auto flex place-items-center h-[78vh]'>
          {cards}
        </div>
      </div>
    </div>
    </>
  );
}
