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
<div className='grid grid-cols-3 bg-slate-900'>
<div class="col-span-2 p-6  bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Donate Now
        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
</div>
<div class='col-start-3'>
  <Image 
  src={require('../../public/ballenas.jpg')}
  width={1000}
  height={1000}
  alt='ballena'
  />
</div>
</div>  
</>
  )
}