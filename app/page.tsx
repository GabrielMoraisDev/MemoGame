import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <h1 className='absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl w-full bg-emerald-600 text-center p-6 text-white'>Jogo da Memória</h1>
      <div className='ani absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-emerald-600 pb-12 pt-7 px-7 w-[75%] md:w-[30%] lg:w-[30%] xl:w-[25%] 2xl:w-[20%] rounded-md duration-300'>
        <p className='text-xl mb-4 text-white'>Escolha uma dificuldade</p>
        <Link href="/Easy" className='w-[80%] bg-emerald-700 text-white m-auto mt-8 h-12 flex justify-center items-center rounded-md'>Easy</Link>
        <Link href="/Normal" className='w-[80%] bg-emerald-700 text-white m-auto mt-8 h-12 flex justify-center items-center rounded-md'>Normal</Link>
        <Link href="/Hard" className='w-[80%] bg-emerald-700 text-white m-auto mt-8 h-12 flex justify-center items-center rounded-md'>Hard</Link>
      </div>
    </div>
  );
}
