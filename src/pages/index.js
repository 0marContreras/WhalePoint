import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import toast, {Toaster} from "react-hot-toast"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'



export default function MyComponent() {
  const [publicKey, setPublicKey] = useState(null);
  const router = useRouter();  

  useEffect(() => {
    let key = window.localStorage.getItem("publicKey");
    setPublicKey(key);
  }, []);

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
  return (
    <>
      <h1>
        Conecta el wallet
      </h1>

        {publicKey ?(

          <div>
            <h1>Tu numero de wallet es {publicKey}</h1>
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




