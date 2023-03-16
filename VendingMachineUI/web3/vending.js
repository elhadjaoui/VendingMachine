import VendinMachineAbi from "../../VendingMachineWeb3/abis/VendingMachine.json"

// const  porovider = new Web3.providers.HttpProvider(process.env.INFURA_API_URL)
// const web3 = new Web3(porovider);
const VendingMachineContract = web3 => 
{
    // return instance of the contract that we gonna work with 
    return new web3.eth.Contract(VendinMachineAbi.abi, "0x7C84FCA6964171168D561eEBd6F5c2d54906f5Bd");

}

export default VendingMachineContract 