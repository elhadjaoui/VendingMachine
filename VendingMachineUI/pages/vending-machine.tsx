import { useEffect, useState } from "react";
import Web3 from "web3";
import VendingMachineContract from "../web3/vending"

export default function VendingMachine() {
    const [err, setError] = useState("")
    const [inventory, setInventory] = useState("")
    const [Account, setAccount] = useState("")
    const [isConnected, setisConnected] = useState(false)
    let web3 : Web3;

    useEffect(() => {
        InventoryHandler();
    },[])


    const getMyAccountHandler = async () =>
    {
        const account = await web3.eth.getAccounts();    
        setAccount(account[0])
    }
    const InventoryHandler = async () => {
        const inventory = await VendingMachineContract.methods.getVendingMachineBalance().call();
        setInventory(inventory)
    }
    const connectWalletHandler = async () => {

        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                web3 = new Web3(window.ethereum)
                getMyAccountHandler()
                setisConnected(true);
                // await window.ethereum.enable();
            } catch (e: any) {
                console.log("ERRRRRRRR");

                setError(e.message)
            }


        }
        else {
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

                <div><h1 className="text-white">{Account}</h1></div>
                <div className="flex flex-1 justify-end">
                    { isConnected ? <a className=" btn leading-6 btn-danger lowercase  text-white" onClick={connectWalletHandler}>disconnect</a> :<a className=" btn leading-6 btn-accent lowercase  text-white" onClick={connectWalletHandler}>connect wallet</a>}
                </div>
            </nav>
            <div className="mx-auto flex  items-center justify-center p-6  my-5">
                <div className="stats ring-2 ring-white  shadow-xl   ">

                    <div className="stat  border-slate-50 place-items-center">
                        <div className="stat-title  text-white">Inventory</div>
                        <div className="stat-value">{inventory}</div>
                        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
                    </div>

                    <div className="stat  border-slate-50 place-items-center">
                        <div className="stat-title text-white">Restock The Inventory</div>
                        <input type="number" min={1} placeholder="Type here" className="input mt-3 input-bordered input-accent w-full max-w-xs" />
                        <button  className="btn btn-accent  mt-3">Restock</button>
                    </div>

                    <div className="stat border-slate-50 place-items-center">
                        <div className="stat-title  text-white">Purchase A Donut</div>
                        <input type="number" placeholder="Type here" className="input mt-3 input-bordered input-accent w-full max-w-xs" />
                        <button  className="btn btn-accent  mt-3">Purchase</button>

                    </div>

                </div>
            </div>


        </header>

    )
}