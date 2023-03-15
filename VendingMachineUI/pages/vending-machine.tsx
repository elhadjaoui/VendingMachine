import { useEffect, useState } from "react";
import Web3 from "web3";
import VendingMachineContract from "../web3/vending"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function VendingMachine() {
    const [err, setError] = useState("")
    const [inventory, setInventory] = useState("")
    const [Account, setAccount] = useState("")
    const [isConnected, setisConnected] = useState(false)
    const [mydonutCount, setDonutCount] = useState('')
    const [purchaseAmount, setPurchaseAmount] = useState(1)
    const [restockAmount, setrestockAmount] = useState(1)
    let web3: Web3;

    useEffect(() => {
        InventoryHandler();
    }, [])
    const updatedonutAmount = (e: any) => {
        const value = e.target.value;
        setPurchaseAmount(value)
    }
    const byDonutHandler = async () => {
        // const account = await web3.eth.getAccounts();   
        console.log(Account);
        try {
            await VendingMachineContract.methods.purchase(purchaseAmount).send({ from: Account });
            setPurchaseAmount(1)
        } catch (error:any) {
            toast.error(error.message)
            
        }
       
    }

    const InventoryHandler = async () => {
        const inventory = await VendingMachineContract.methods.getVendingMachineBalance().call();
        setInventory(inventory)
    }
    const getDonutCountHandler = async (address: string) => {
        // const account = await web3.eth.getAccounts(); 
        const mydonutCount = await VendingMachineContract.methods.donutBalances(address).call();
        setDonutCount(mydonutCount)
    }
    const connectWalletHandler = async () => {

        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                web3 = new Web3(window.ethereum)

                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0])

                getDonutCountHandler(accounts[0]);
                setisConnected(true);
                // await window.ethereum.enable();
            } catch (e: any) {
                toast.error("Something went wrong");
            }


        }
        else {
            toast.error("Please install Metamask");
        }
    }
    return (
        <header className="">
            <nav className="mx-auto  flex max-w-7xl items-center justify-between p-6 px-4" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5 w-full">
                        <p className=" md:text-lg text-2xl text-white font-extrabold">Vending Machine Dapp</p>
                        {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
                    </a>
                </div>

                <div className=" w-full min-w-[200px]"><h1 className="text-accent text-center truncate mx-2">{Account}</h1></div>
                <div className="flex flex-1 justify-end">
                    {isConnected ? <a className=" btn leading-6 btn-secondary   text-white" onClick={connectWalletHandler}>Disconnect</a> : <a className=" btn leading-6 btn-accent lowercase  text-white" onClick={connectWalletHandler}>connect wallet</a>}
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
                        <button className="btn btn-accent  mt-3">Restock</button>
                    </div>

                    <div className="stat border-slate-50 place-items-center">
                        <div className="stat-title  text-white">Purchase A Donut</div>
                        <input onChange={updatedonutAmount} value={purchaseAmount} type="number" placeholder="Type here" className="input mt-3 input-bordered input-accent w-full max-w-xs" />
                        <button onClick={byDonutHandler} className="btn btn-accent  mt-3">Purchase</button>
                    </div>
                    <div className="stat  border-slate-50 place-items-center">
                        <div className="stat-title  text-white">DonutCount</div>
                        <div className="stat-value">{mydonutCount}</div>
                        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
                    </div>

                </div>
            </div>


        </header>

    )
}