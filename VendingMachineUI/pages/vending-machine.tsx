import { useEffect, useState } from "react";
import Web3 from "web3";
import VendingMachineContract from "../web3/vending"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function VendingMachine() {
    const [err, setError] = useState("")
    const [inventory, setInventory] = useState(1)
    const [accountAddress, setAccountAddress] = useState<string | null>(null)
    const [isConnected, setisConnected] = useState(false)
    const [mydonutCount, setDonutCount] = useState('')
    const [vmContract, setVmContract] = useState<any>(null)
    const [purchaseAmount, setPurchaseAmount] = useState(1)
    const [purchaseTracker, setpurchaseTracker] = useState(0)
    const [web3, setWeb3] = useState<Web3 | null>(null)
    const [restockAmount, setrestockAmount] = useState(1)
    

    useEffect(() => {
        if (vmContract)
             InventoryHandler();
        if (vmContract && accountAddress)
            getDonutCountHandler()
    }, [vmContract, accountAddress, purchaseTracker])

    const updatedonutAmount = (e: any) => {
        const value = e.target.value;
        setPurchaseAmount(value)
    }
    const updateRestockAmount = (e: any) => {
        const value = e.target.value;
        setrestockAmount(value)
    }
    const byDonutHandler = async () => {
        try {
            await vmContract.methods.purchase(purchaseAmount).send({ from: accountAddress, value:  (Number(web3?.utils.toWei('0.001', "ether")) * purchaseAmount)});
            setPurchaseAmount(1)
            setpurchaseTracker(purchaseTracker + 1)
            toast.success("Purchase Succeeded ")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
       
    }
    const restockHandler = async () => {
        try {
            await vmContract.methods.restock(restockAmount).send({ from: accountAddress});
            setPurchaseAmount(1)
            setpurchaseTracker(purchaseTracker + 1)
            toast.success("Restock Succeeded ")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
       
    }
    const InventoryHandler = async () => {
        try {
            const inventory = await vmContract.methods.getVendingMachineBalance().call();
            setInventory(inventory)
        } catch (error) {
            toast.error("Something went wrong");
        }
       
    }
    const getDonutCountHandler = async () => {
        try {
            const mydonutCount = await vmContract.methods.donutBalances(accountAddress).call();
            setDonutCount(mydonutCount)
        } catch (error) {
            toast.error("Something went wrong");
        }
       
    }
    const connectWalletHandler = async () => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                let web3 = new Web3(window.ethereum)
                setWeb3(web3);
                // await window.ethereum.enable();

                const accounts = await web3.eth.getAccounts();
                setAccountAddress(accounts[0])
                const vm = VendingMachineContract(web3);
                setVmContract(vm)
                setisConnected(true);
            } catch (e: any) {
                toast.error("Something went wrong");
                setisConnected(false);
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

                <div className=" w-full min-w-[200px]"><h1 className="text-accent text-center truncate mx-2">{accountAddress}</h1></div>
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
                        <input  onChange={updateRestockAmount} value={restockAmount} type="number" min={1} placeholder="Type here" className="input mt-3 input-bordered input-accent w-full max-w-xs" />
                        <button onClick={restockHandler} className="btn btn-accent  mt-3">Restock</button>
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