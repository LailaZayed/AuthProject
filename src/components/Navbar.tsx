import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; 
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import UserAccountnav from './UserAccountnav';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='bg-pink-50 py-2 border-b border-pink-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link 
          href='/' 
          className='text-pink-600 text-3xl font-bold rounded-lg hover:text-pink-700 transition-colors'
        >
          Main Page
        </Link>
        {session?.user ? (
          <UserAccountnav/>
        ) : (
           <Link className={`${buttonVariants()} bg-pink-600 text-white hover:bg-pink-700`} href='/sign-in'>
           Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
