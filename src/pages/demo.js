import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal'
import { useState, useEffect } from 'react'
 
export default function MyComponent() {
  const [mod, setMod] = useState(false)
  
  return (
<>
<Navbar/>
<section className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 dark:bg-gray-900">
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
            <img src="/ballenas.png" alt="mockup"/>
        </div>                
    </div>
</section>
 
</>
  )
}