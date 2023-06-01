import { addToBasket , removeFromBasket as removeItemFromBasket } from '@/slices/basketSlice';
import Image from 'next/image'
import React from 'react'
import {AiOutlineStar} from 'react-icons/ai'
import { BsCurrencyDollar } from 'react-icons/bs';
import { useDispatch } from 'react-redux';


const CheckoutProducts = ({  id, title, price, description, rating, category, image, hasPrime }) => {
  const dispatch = useDispatch()

  const addItemsToBasket = () => {
    const product = {
      id, title, price, description, category, image, hasPrime
    }
    // sending the product as action to the Redux store
    dispatch(addToBasket(product))
  }
  const removeFromBasket = () =>{
    dispatch(removeItemFromBasket({ id }))
  }
  return (
    <div className='grid grid-cols-5'>
        <Image src={image} alt='' height={200} width={200}/>
        {/* Middle */}
        <div className='col-span-3 mx-5'>
            <p>{title}</p>
        <div className='flex'>
        {Array(rating)
            .fill()
        .map((_, i) => (
            <AiOutlineStar key={i} className='h-5 text-yellow-500' />
        ))}
        </div>

        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <div className='flex items-center'>
          <BsCurrencyDollar />
          <p className='-ml-1'>{price}</p>
        </div>
        {hasPrime && (
          <div className='flex items-center space-x-2'>
            <img className='w-12 -mb-2' src='https://m.media-amazon.com/images/G/40/X-Site/Prime/New_Prime_Logo_80x80._FMpng_SY80_.png' alt=''/>
            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
          </div>
        )}
        </div>
        <div className='flex flex-col space-y-2 my-auto justify-self-auto'>
          <button onClick={addItemsToBasket} className='button mt-auto focus:outline-none focus:ring-yellow-500 active:from-yellow-600'>Add to Basket</button>
          <button onClick={removeFromBasket} className='button mt-auto focus:outline-none focus:ring-yellow-500 active:from-yellow-600'>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProducts