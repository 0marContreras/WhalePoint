import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal'
import { useState, useEffect } from 'react'
import Image from 'next/image'
 
export default function MyComponent() {
  const [mod, setMod] = useState(false)
  
  return (
<>
<Navbar/>
<section className="rounded-b-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 dark:bg-gray-900 drop-shadow-2xl">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">Whale Point</h1>
            <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
            <p  className=" inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:ring-primary-900">
                Click here to
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </p>
            <button onClick={() =>{setMod(true)}} className="bg-black inline-flex items-center justify-center px-8 py-4 font-medium text-center text-white rounded-lg border-2 border-black focus:ring-4 focus:ring-white focus:ring-white hover:border-white hover:shadow-white">
              Donate


          </button>
            <br/>
            <div className="mb-1 ml-5 text-base font-medium text-white ">Monthly goal</div>
                        <div className="w-full ml-4 bg-black rounded-full h-2.5 mb-4 ">
                          <div className="bg-blue-600 h-2.5 rounded-full w-2/5"></div>
                        </div>
            <Modal isvisible={mod} onClose={()=> setMod(false)}/>


        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image  width={5180 /10} height={100} src={require('/public/ballenas.png')} alt="mockup"/>
        </div>                
    </div>
</section>







<br/>


<h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-white">NFT's for the best partners</h5>

<br/>

  <br/>
  
    <div className=" grid grid-cols-3 gap-2 place-items-center">
      
      
            <div>
                <Image  width={5180 /10} height={100} className="h-auto max-w-xs rounded-lg hover:drop-shadow-2xl" src={require('/public/image/NFT2.jpeg')}
                alt=""/>
                <h3 className="text-center mb-2 text-2xl font-bold tracking-tight  text-white ">50 SOL Unic!</h3>
            </div>
            
      
      
            <div>
                <Image  width={5180 /10} height={100} className="h-auto max-w-sm rounded-lg hover:drop-shadow-2xl" src={require('/public/image/NFT1.jpeg') }/>
                <h3 className="text-center mb-2 text-2xl font-bold tracking-tight  text-white">100 SOL Unic!</h3>
            </div>          
      
            <div>
                <Image  width={5180 /10} height={100} className="h-auto max-w-xs rounded-lg hover:drop-shadow-2xl" src={require('/public/image/NFT3.jpeg')} alt=""/>
                <h3 className="text-center mb-2 text-2xl font-bold tracking-tight  text-white">25 SOL Unic!</h3>
            </div> 
    </div>
  <br/>

  <a href="#" className="ml-4 mr-4  p-10 md:space-y-0  md:flex md:items-center rounded-xl hover:drop-shadow-2xl">
      <Image width={5180 /10} height={100} className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src={require('/public/image/ballena.jpeg')} alt=""/>
      <div className="flex flex-col justify-between py-20 pl-10 bg-gray-950 leading-normal ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Conservation of endangered species</h5>
          <p className="mb-3 font-normal text-white">Many whale species are in danger of extinction due to indiscriminate hunting, ocean pollution, vessel collisions, and other threats. Fundraising is directed towards conservation programs that help protect these species and preserve their habitats.</p>
      </div>
    </a>
    <br/>
    <a href="#" className="ml-4 mr-4  p-10 md:space-y-0  md:flex md:items-center rounded-xl hover:drop-shadow-2xl">
      
      <div className="flex flex-col justify-between py-20 pl-10 md:py-[68px] bg-gray-950 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Implementation of conservation measures</h5>
          
          <p className="mb-3 font-normal text-white">To effectively protect whales, the implementation of conservation measures is required, such as the creation of marine protected areas, regulation of the fishing industry, and control of marine pollution. Fundraising plays a crucial role in supporting the implementation and enforcement of these measures, thereby ensuring a safe and healthy environment for whales.</p>
      </div>   
          <Image  width={5180 /10} height={100} className="object-cover w-full h-96 md:h-auto md:w-96 md:rounded-r-lg" src={require('/public/image/ballena2.jpeg')} alt=""/>
    </a>
    <br/>
    <a href="#" className="ml-4 mr-4  p-10 md:space-y-0  md:flex md:items-center rounded-xl hover:drop-shadow-2xl">
      <Image  width={5180 /10} height={100} className="object-cover w-full h-[15.5rem] md:w-96 md:rounded-l-lg" src={require('/public/image/ballena3.jpg')}/>
      <div className="flex flex-col justify-between py-20 pl-10 md:py-16 bg-gray-950 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Support for local communities</h5>
          <p className="mb-3 font-normal text-white">Many coastal communities in Mexico depend economically on whale-related tourism. The funds raised are used to support these communities by providing sustainable income-generating alternatives, reducing the pressure on natural resources, and helping foster a balanced relationship between the communities and the whales.</p>
      </div>
    </a>
    <br/>
    
  <footer className=" shadow bg-gray-950 ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a className="flex items-center mb-4 sm:mb-0">
            <Image src={require('../../public/logo.jpg')} className="h-8 w-8 mr-3 rounded-xl" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Whale Point</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6  sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-gray-400"><a href="/demo" className="hover:underline">We need your help,</a> They need your help</span>
    </div>
</footer>
  

</>
  )
}