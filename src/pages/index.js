import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import toast, {Toaster} from "react-hot-toast"


export default function MyComponent() {

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

  }
  return (
    <>
      <h1>
        Conecta el wallet
      </h1>
      <div>
        <button className='bg-blue-500' onClick={() => {signIn()}}>Conectar wallet</button>
      </div>
    </>
  )
}




