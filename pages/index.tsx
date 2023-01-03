import type { NextPage } from 'next'
import Sidebar from "../components/Sidebar"
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
     
    <main className=''>
      <Sidebar />
      {/* centre */} 
    </main>
    <div>{/*player*/}</div>
   
    </div>
    
    
  )
}

export default Home
