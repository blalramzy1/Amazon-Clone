import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, price, description, category, image }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 text-sm italic text-gray-400'>{category}</p>
      <div>
          <Image className='mx-auto' src={image} alt='' width={200} height={200} />
      </div>
      <h4 className='my-3'>{title}</h4>
      <div className='flex'>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <AiOutlineStar key={i} className='h-5 text-yellow-500' />
          ))}
      </div>
      <p className='text-xs my-2 line-clamp-2'>{description}</p>

      <div className='flex items-center mb-5'>
        <BsCurrencyDollar/>
        <p className='-ml-1'>{price}</p>
      </div>
      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-4 py-3'>
          <img className='w-10 -mb-2' src="https://m.media-amazon.com/images/G/40/X-Site/Prime/New_Prime_Logo_80x80._FMpng_SY80_.png" alt="" />
          <p className='text-xs text-gray-500'>FREE Next-day Delvery</p>
        </div>
      )}
      <button className='mt-auto button'>Add to Basket</button>
    </div>
  );
};

export default Product;
