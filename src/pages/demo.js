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
 
</>
  )
}