import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <h1>Jogo da memória</h1>
      <p>Escolha uma dificuldade</p>
    <Link href="/Easy">Easy</Link><br />
    <Link href="/Normal">Normal</Link><br />
    <Link href="/Hard">Hard</Link><br />
    </div>
  );
}
