import React from 'react'
import Banner1 from '../../public/assets/banner1.jpg'
import Banner2 from '../../public/assets/banner2.jpg'
import Banner3 from '../../public/assets/banner3.jpg'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Banner = () => {
  return (
    <div className='relative'>
        <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
        <Carousel 
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        >
            <div>
                <Image loading='lazy' src={Banner1} alt="" />
            </div>

            <div>
                <Image loading='lazy' src={Banner2} alt="" />
            </div>

            <div>
                <Image loading='lazy' src={Banner3} alt="" />
            </div>
        </Carousel>
    </div>
  )
}

export default Banner