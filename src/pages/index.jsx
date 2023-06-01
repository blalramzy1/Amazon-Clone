import Banner from '@/components/Banner'
import ProductFeed from '@/components/ProductFeed'
import Head from 'next/head'
import Header from '@/components/Header'


const Index = ({ products }) => {
  // console.log(products)
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon Next.js</title>
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        <Banner />

        {/* Productfeed */}
        <ProductFeed products={products}/>
      </main>
    </div>
  )
}

export default Index

export const getServerSideProps = async (context) => {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
};
