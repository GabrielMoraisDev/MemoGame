"use client";

import '../app/globals.css';

type SucessProps = {
    mode: string;
    op: boolean;
};

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ({ mode, op }: SucessProps) {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!op) { // Só inicia o contador se 'op' for false
            const timerInterval = setInterval(() => {
                setTime(prevTime => {
                    let { hours, minutes, seconds } = prevTime;

                    seconds += 1;
                    if (seconds === 60) {
                        seconds = 0;
                        minutes += 1;
                    }
                    if (minutes === 60) {
                        minutes = 0;
                        hours += 1;
                    }

                    return { hours, minutes, seconds };
                });
            }, 1000);

            return () => clearInterval(timerInterval);
        }
    }, [op]); // Reexecuta o efeito quando 'op' mudar

    return (
        <div className={`absolute w-[80%] text-emerald-200 p-5 h-auto bg-emerald-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md duration-300 ${op ? 'visible z-50' : 'hidden z-10 '}`}>
            <div className=' justify-center items-center text-center text-2xl'>A dificuldade {mode} foi superada em <p className='text-4xl mt-3 text-white'>
                {String(time.hours).padStart(2, '0')}:
                {String(time.minutes).padStart(2, '0')}:
                {String(time.seconds).padStart(2, '0')}
            </p>
            <Link href='/' className="w-[80%] h-12 text-xl font-bold bg-emerald-300 text-emerald-900 rounded-md flex justify-center items-center m-auto text-center mt-5">Voltar ao início</Link>
            </div>
        </div>
    );
}
