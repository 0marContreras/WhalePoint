import Image from 'next/image'
import { Inter } from 'next/font/google'
import toast, {Toaster} from "react-hot-toast"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Connection, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, SendTransactionError } from '@solana/web3.js'

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
      <h1>
        Conecta el wallet
      </h1>

        {publicKey ?(

          <div>
            <h1>Tu numero de wallet es {publicKey}</h1>
            <br />
            <h1>Tienes {balance} SOL</h1>
            <br />

            <h1>Enviar a</h1>
            <input type='text' className='border-4 border-slate-950' onChange={handleReciverChange} />

            <br />

            <h1>Cuanto</h1>
            <input type='text' className='border-4 border-slate-950' onChange={handleAmmountChange} />
            <br />
            <button className='bg-blue-500' onClick={() => {handleSubmit()}}>Mandar feria</button>
            <br />
            <button className='bg-blue-500' onClick={() => {signOut()}}>Desconectar wallet</button>
          </div>

        ):(

        

      <div>
        <button className='bg-blue-500' onClick={() => {signIn()}}>Conectar wallet</button>
      </div>
      ) }
    </>
  )
}




