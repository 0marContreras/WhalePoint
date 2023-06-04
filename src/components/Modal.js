import Image from 'next/image'
import { Inter } from 'next/font/google'
import toast, {Toaster} from "react-hot-toast"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Connection, SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, SendTransactionError } from '@solana/web3.js'
 

const SOLANA_NETWORK = "devnet";


const Modal = ({isvisible, onClose}) => {

  const [publicKey, setPublicKey] = useState(null);
  const router = useRouter();
  const [balance, setBalance] = useState(0); 
  const [reciver, setReciver] = useState(null);
  const [ammount, setAmmount] = useState(null);
  const [stepDos, setStepDos] = useState(false);
  

  useEffect(() => {
    let key = window.localStorage.getItem("publicKey");
    setPublicKey(key);
    if (key) getBalance(key);
    setReciver("DV94HK5WMyht89EQcZFqvxVKm2qmF8gVm3esJQC3m8fk");
  }, []);

 

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
        setStepDos(true);
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

  if (!isvisible) return null;
  const handleClose = (e) => {
      if(e.target.id === "wrapper") onClose();

  }
    return(
    
            <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClose} id='wrapper'>

                <div className='w-[1200px]  flex flex-col'>
                    <button onClick={()=>{onClose()}} className='text-white text-2xl place-self-end'>X</button>
                    <div className='bg-black  text-white p-6 rounded'>
                        
                    {publicKey ?(
                      <>
                      {stepDos ?(

                        <>

                        <div className="mb-1 text-base font-medium text-blue-700 dark:text-blue-500"></div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full w-2/2"></div>
                        </div>

                       <h1 className=' mb-40 text-4xl text-center'>Thanks for your contribution❤️</h1>
                        <br/>
                        <div className='flex justify-center items-center'>
                          <img src='https://i.pinimg.com/originals/2b/52/af/2b52afcdaffa6b3be68b4935b6e15b9d.gif'/>
                        </div>
                        <br/>
                        <div className='flex justify-center items-center'>
                          <button className=" mb-10 text-2xl bg-blue-600 text-center inline-flex items-center justify-center px-8 py-4 font-medium text-center text-white rounded-lg border-2 border-black focus:ring-4 focus:ring-white focus:ring-white hover:border-white hover:shadow-white" onClick={() => {onClose(), setStepDos(false), signOut();}}>Close</button>
                          </div>
                        </>

                      ):(


                      <>
                      <div className="mb-1 text-base font-medium text-blue-700 dark:text-blue-500"></div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full w-2/2"></div>
                        </div>
                      <h1 className=' mb-40 text-4xl text-center'>Insert the amount</h1>
                      <br/>
                      <div className='flex justify-center items-center'>
                      <input type='number' className='rounded-3xl border-none focus:outline-none focus:ring-0 appearance-none text-center mb-15 text-2xl dark:text-black' onChange={handleAmmountChange} />
                      </div>
                      <br/>
                        <div className='flex justify-center items-center'>
                        <button className=" mb-40 text-2xl bg-blue-600 text-center inline-flex items-center justify-center px-8 py-4 font-medium text-center text-white rounded-lg border-2 border-black focus:ring-4 focus:ring-white focus:ring-white hover:border-white hover:shadow-white" onClick={() => {handleSubmit()}}>Donate</button>
                        </div>
                      
                      </>
                      )}
                      </>
                    ):(
                      <>
                        <div className="mb-1 text-base font-medium text-blue-700 dark:text-blue-500"></div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full w-1/2"></div>
                        </div>

                       <h1 className=' mb-40 text-4xl text-center'>Connect your wallet</h1>
                        <br/>
                        <div className='flex justify-center items-center'>
                        <button className=" mb-40 text-2xl bg-blue-600 text-center inline-flex items-center justify-center px-8 py-4 font-medium text-center text-white rounded-lg border-2 border-black focus:ring-4 focus:ring-white focus:ring-white hover:border-white hover:shadow-white" onClick={() => {signIn()}}>Connect</button>
                        </div>
                      </>
                    )}

                     
                    </div>
                </div>

            </div>
        
    )
}
export default Modal;