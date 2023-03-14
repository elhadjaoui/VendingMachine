import Web3 from 'web3'
import VendinMachineAbi from "../../VendingMachineWeb3/abis/VendingMachine.json"

const  porovider = new Web3.providers.HttpProvider(process.env.INFURA_API_URL)

const web3 = new Web3(porovider);

const VendingMachineContract = new web3.eth.Contract(VendinMachineAbi.abi, "0x05F64c0fE1E46cE899F724e42532c0924dd8080e");

export default VendingMachineContract 