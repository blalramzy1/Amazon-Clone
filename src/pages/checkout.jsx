import Header from '@/components/Header';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import {BsCurrencyDollar} from 'react-icons/bs'
import CheckOutImg from '../../public/assets/Check out.webp';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '@/slices/basketSlice';
import CheckoutProducts from '@/components/CheckoutProducts';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.stripe_public_key);

const CheckOut = () => {
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const totalPrice = useSelector(selectTotal);

  const createCheckOutSession = async () => {
        const stripe = await stripePromise

        // Call the backend to create a session
        const checkoutSession = await fetch('/api/create-checkout-session', {
            items: items,
            email: session.user.email
        })

        // Redirect
        
        const { sessionId } = await checkoutSession.json(); // Extract the session ID from the response

        // Redirect
        const result = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (result.error) alert(result.error.message)
    }
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon Check Out</title>
      </Head>
      <Header />
      <section className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left */}
        <div>
          <Image
            className=''
            src={CheckOutImg}
            width={1020}
            height={250}
            alt=''
          />
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0 ? 'Your Basket is empty' : 'Shopping Basket'}
            </h1>
            {items.map((item) => (
              <CheckoutProducts
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className='flex flex-col p-10 shadow-lg'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal({items.length} items)
                <div className='flex items-center mb-5'>
                  <BsCurrencyDollar />
                  <p className='-mr-2 font-bold'>{totalPrice}</p>
                </div>
              </h2>
              <button
                disabled={!session}
                onClick={createCheckOutSession}
                role='link'
                className={`button mt-2 w-full ${
                  !session && 'buttonCheckout'
                }`}
              >
                {!session ? 'Sign in to Checkout' : 'Checkout Now'}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CheckOut;
