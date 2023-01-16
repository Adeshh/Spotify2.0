import type { NextPage } from 'next'
import Sidebar from "../components/Sidebar"
import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
     
    <main className='flex'>
      <Sidebar />
      <Center />
    </main>
    <div>
      {/*player*/}
    </div>
   
    </div>
    
    
  )
}

export default Home

// export const getServerSideProps = async() => {
//   const session = await getSession();

//   return{
//     props:{
//       session,
//     }
//   }
// }
