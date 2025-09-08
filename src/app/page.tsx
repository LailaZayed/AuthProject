import { buttonVariants } from '@/components/ui/button';
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-pink-50 space-y-6">
      <h1 className='text-6xl font-bold text-pink-600 rounded-lg hover:text-pink-700 transition-colors'>
        Fairy World
      </h1>
      <Link 
        className={`${buttonVariants()} bg-pink-600 text-white hover:bg-pink-700`}
        href='/admin'
      >
        Open my Space
      </Link>
    </div>
  );
}
