import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import toast, {Toaster} from "react-hot-toast"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Connection, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, SendTransactionError } from '@solana/web3.js'
import Navbar from '@/components/Navbar'
 

const SOLANA_NETWORK = "devnet";

export default function MyComponent() {
  const [publicKey, setPublicKey] = useState(null);
  const router = useRouter();
  const [balance, setBalance] = useState(0); 
  const [reciver, setReciver] = useState(null);
  const [ammount, setAmmount] = useState(null);  

  useEffect(() => {
    let key = window.localStorage.getItem("publicKey");
    setPublicKey(key);
    if (key) getBalance(key);
  }, []);

  const handleReciverChange = (event) =>{
    setReciver(event.target.value);
  }

  const handleAmmountChange = (event) =>{
    setAmmount(event.target.value);
  }

  const handleSubmit = async () =>{
    console.log(reciver, ammount);
    sendTransaction();
  }

  const signIn = async () =>{
    const provider = window?.phantom?.solana;
    const {solana} = window;

    if(!provider?.isPhantom || !solana.isPhantom){
      toast.error("Phantom no esta instalado");
      setTimeout(() =>{
        window.open("https://phantom.app/", "_blank");
      }, 2000);
      return;
    }

    let phantom;
    if(provider?.isPhantom) phantom = provider;

    const {publicKey} = await phantom.connect();
    console.log("publicKey", publicKey.toString());
    setPublicKey(publicKey.toString());
    window.localStorage.setItem("publicKey", publicKey.toString());
    getBalance(publicKey);

    toast.success("Ya vinculaste tu wallet ");

  };

  const signOut = async () =>{
    if (window){
      const {solana} = window;
      window.localStorage.removeItem("publicKey");
      setPublicKey(null);
      solana.disconnect();
      router.reload(window?.location?.pathname);
    }
  }

  const sendTransaction = async () =>{
    try{
      getBalance(publicKey);

      if(balance < ammount){
        console.log("No tienes suficiente balance");
        return;
      }

      const provider = window?.phantom?.solana;
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      )

      const fromPubkey = new PublicKey(publicKey);
      const toPubkey = new PublicKey(reciver);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: ammount * LAMPORTS_PER_SOL,
        })
      );

        const {blockhash} = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = fromPubkey;

        const transactionsignature = await provider.signTransaction(
          transaction
        );

        const txid = await connection.sendRawTransaction(
          transactionsignature.serialize()
        );
        console.info(`Transaction ${txid} sent`);

        const confirmation = await connection.confirmTransaction(txid, {
          commitment: "singleGossip",
        });

        const {slot} = confirmation.value;

        console.info(`transaccion: ${txid} en el bloque: ${slot}`);

        getBalance(publicKey);
        setAmmount(null);
        setReciver(null);
        return;

    }catch (error){
      console.error("Error en la transaction", error)
    }
  }

  const getBalance = async (publicKey) =>{
    try{
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      );

      const balance = await connection.getBalance(
        new PublicKey(publicKey)
      );

      const balancenew = balance  / LAMPORTS_PER_SOL;
       setBalance(balancenew);

    }catch (error){
      console.log("Error obteniendo el balance", error);
      toast.error("Algo salio mal")
    }
  }
  return (
<>
<Navbar/>
<section class="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">Whale Point</h1>
            <p class="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
            <a href="#" class=" inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:ring-primary-900">
                Click here to
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="#" class="bg-black inline-flex items-center justify-center px-8 py-4 font-medium text-center text-white rounded-lg border-2 border-black focus:ring-4 focus:ring-white focus:ring-white hover:border-white hover:shadow-white">
              Donate
          </a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/ballenas.png" alt="mockup"/>
        </div>                
    </div>
</section>
<br/>

<h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white white: text-white">NFT's for the best partner</h5>

<br/>
<div class="bg-white">
  <br/>
    <div class=" grid grid-cols-3 gap-2 place-items-center">
      
      <br/>
            <div>
                <img class="h-auto max-w-md rounded-lg" src="/image/NFT1.jpeg" alt=""/>
                <h3 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white white: text-black">+100$ unic</h3>
            </div>
            
      
      <br/>
            <div>
                <img class="h-auto max-w-sm rounded-lg" src="/image/NFT2.jpeg" alt=""/>
                <h3 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white white: text-black">+50$ unic</h3>
            </div>          
      <br/>
            <div>
                <img class="h-auto max-w-xs rounded-lg" src="/image/NFT3.jpeg" alt=""/>
                <h3 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white white: text-black">+25$ unic</h3>
            </div>
            
      <br/>
    </div>
  </div>
  <br/>
  <a href="#" class="ml-4 mr-4 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-700 p-10 md:space-y-0 md:space-x-8 md:flex md:items-center rounded-xl">
      <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src="/image/ballena.jpeg" alt=""/>
      <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Conservation of endangered species:</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Many whale species are in danger of extinction due to indiscriminate hunting, ocean pollution, vessel collisions, and other threats. Fundraising is directed towards conservation programs that help protect these species and preserve their habitats.</p>
      </div>
    </a>
    <br/>
    <a href="#" class="ml-4 mr-4 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-700 p-10 md:space-y-0 md:space-x-8 md:flex md:items-center rounded-xl">
      
      <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Implementation of conservation measures:</h5>
          
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">To effectively protect whales, the implementation of conservation measures is required, such as the creation of marine protected areas, regulation of the fishing industry, and control of marine pollution. Fundraising plays a crucial role in supporting the implementation and enforcement of these measures, thereby ensuring a safe and healthy environment for whales.</p>
      </div>   
          <img class="object-cover w-full rounded-s-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-s-lg" src="/image/ballena2.jpeg" alt=""/>
    </a>
    <br/>
    <a href="#" class="ml-4 mr-4 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-700 p-10 md:space-y-0 md:space-x-8 md:flex md:items-center rounded-xl">
      <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src="/image/ballena3.jpg" alt=""/>
      <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Support for local communities:</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Many coastal communities in Mexico depend economically on whale-related tourism. The funds raised are used to support these communities by providing sustainable income-generating alternatives, reducing the pressure on natural resources, and helping foster a balanced relationship between the communities and the whales.</p>
      </div>
    </a>
    <br/>
  <footer class="bg-white shadow dark:bg-gray-950 ">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a class="flex items-center mb-4 sm:mb-0">
            <Image src={require('../../public/logo.jpg')} className="h-8 w-8 mr-3 rounded-xl" alt="Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Whale Point</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"><a href="/demo" class="hover:underline">We need your help,</a> They need your help</span>
    </div>
</footer>
  

</>
  )
}