import { useState } from "react";
import Web3 from "web3";

export default function VendingMachine() {
   const [err, setError] = useState("")
    const connectWalletHandler = async ()=>
    {

        let web3;
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
        {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                web3 = new  Web3(window.ethereum) 
                // await window.ethereum.enable();
            } catch (e:any) {
                console.log("ERRRRRRRR");
                
                setError(e.message)
            }
           

        }
        else
        {
            alert("Please install Metamask")
        }
    }
    return (
        <header className="">
            <nav className="mx-auto  flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>
              

                <div className="flex flex-1 justify-end">
                    <a href="#" className=" btn leading-6 btn-accent lowercase  text-white" onClick={connectWalletHandler}>connect wallet</a>
                </div>
            </nav>
            <div>
                <h1 className=" font-bold text-white">
                    {err}
                </h1>
            </div>

            
        </header>

    )
}