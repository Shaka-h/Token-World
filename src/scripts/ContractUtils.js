import { nftFactory_Address, nftFactory_ABI, nftMyCollection_ABI } from '@/scripts/ContractConstants'
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


    return { signer, nftFactory_contract}
}