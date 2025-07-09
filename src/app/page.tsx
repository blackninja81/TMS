import Image from "next/image";

export default function Home() {
  return (
    <div className="homepage">
      <h1>Home</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} />
    </div>
  );
}

