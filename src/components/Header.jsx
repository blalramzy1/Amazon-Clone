import Image from 'next/image'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Logo from '/public/assets/Logo_amazon.png'
import {BsSearch} from 'react-icons/bs'
import {MdMenu, MdOutlineShoppingCart} from 'react-icons/md'
import {FiMenu} from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '@/slices/basketSlice'

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);
    return (
    <header>
        {/* top nav */}
        <div className='flex items-center bg-amazon_blue p-2 flex-grow py-2'>
            <div className='mt-2 px-2 flex flex-grow items-center justify-center sm:flex-grow-0'>
                <Image onClick={() => router.push('/')} src={Logo} alt='' width={150} height={40} className='cursor-pointer -mb-3'/>
            </div>
            {/* Search */}
            <div className='hidden px-2 sm:flex h-10 items-center rounded-md cursor-pointer flex-grow border-none'>
                <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md  focus:outline-none' />
                <div className='px-4 bg-yellow-400 h-full flex  items-center rounded-r-md hover:bg-yellow-500 '>
                    <BsSearch className='h-12'/>
                </div>
            </div>
            {/* Right */}
            <div  className='text-white flex items-center text-xs space-x-6 mx-4 whitespace-nowrap'>
                <div onClick={!session ? signIn : signOut} className='link'>
                    <p>
                        {session ? `Hello, ${session.user.name}` : "Sign in"}
                    </p>
                    <p className='font-extrabold md:text-sm'>Account & Lists</p>
                </div>
                <div className='link'>
                    <p >Returns</p>
                    <p className='font-extrabold md:text-sm'>& Orders</p>
                </div>
                <div onClick={() => router.push('/checkout')} className='link relative flex items-center'>
                <span className='absolute top-0 right-0 md:right-12 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold'>
                    {items.length}
                    </span>
                    <MdOutlineShoppingCart className=' text-4xl text-center '/>
                    <p className='hidden md:inline p-1 mt-2 font-extrabold md:text-sm'>Basket</p>
                </div >
            </div>
        </div>
        {/* bottom nav */}
        <div className='flex items-center bg-amazon_blue-light p-1 pl-6 space-x-3 text-white text-sm'>
            <p className='link flex items-center'>
                <MdMenu className='h-6 mr-3'/>
                All
            </p>
            <p className='link'>Prime Video</p>
            <p className='link'>Amazon Business</p>
            <p className='link'>Today&apos;s Deals</p>
            <p className='link hidden lg:inline-flex'>Electronics</p>
            <p className='link hidden md:inline-flex'>Food & Grocery</p>
            <p className='link hidden lg:inline-flex'>Prime</p>
            <p className='link hidden md:inline-flex'>Shopper Toolkit</p>
            <p className='link hidden lg:inline-flex'>Health & personal</p>

        </div>
    </header>
  )
}

export default Header