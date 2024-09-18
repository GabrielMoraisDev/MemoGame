"use client";

import '../app/globals.css';
import Image from 'next/image';

type StarProps = {
    apply: boolean;
};

export default function Stars({apply}: StarProps){
    return (
        <div>
        <Image className={`${apply? 'star1' : ''} z-40 duration-300 fixed w-28 h-28`} src='/img/star1.png' alt='' width={50} height={50}></Image>
        <Image className={`${apply? 'star2' : ''} z-40 duration-300 fixed w-28 h-28`} src='/img/star2.png' alt='' width={50} height={50}></Image>
        <Image className={`${apply? 'dot' : ''} z-40 duration-300 fixed w-8 h-8`} src='/img/dot.png' alt='' width={50} height={50}></Image>
        <Image className={`${apply? 'dot2' : ''} z-40 duration-300 fixed w-8 h-8`} src='/img/dot.png' alt='' width={50} height={50}></Image>
        </div>
    );
}