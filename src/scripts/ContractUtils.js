import { nftFactory_Address, nftFactory_ABI, marketPlace_ABI, marketPlace, atsh_abi, atsh_contractAddress } from '@/scripts/ContractConstants'
import {ethers} from 'ethers';

export const getProvider = () => {
    // return new ethers.providers.Web3Provider(window.ethereum);
    if (window.ethereum) {
        return new ethers.providers.Web3Provider(window.ethereum);
    } else {
        console.log("no wallet")
        return null;
    }
}

export const getSignerContract = () => {
    const signer = getProvider()?.getSigner();
    const nftFactory_contract = new ethers.Contract(nftFactory_Address, nftFactory_ABI, signer);
    const marketPlace_contract = new ethers.Contract(marketPlace, marketPlace_ABI, signer);
    const atsh_contract = new ethers.Contract(atsh_contractAddress, atsh_abi, signer);

    return { signer, nftFactory_contract, marketPlace_contract, atsh_contract}
}