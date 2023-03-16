import VendinMachineAbi from "../../VendingMachineWeb3/abis/VendingMachine.json"

// const  porovider = new Web3.providers.HttpProvider(process.env.INFURA_API_URL)
// const web3 = new Web3(porovider);
const VendingMachineContract = web3 => 
{
    // return instance of the contract that we gonna work with 
    return new web3.eth.Contract(VendinMachineAbi.abi, "0xA932b152FC56fd5C084ceA98115CA04D8F5838D4");

}

export default VendingMachineContract 