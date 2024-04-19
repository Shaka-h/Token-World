import { walletConnected, walletAddressConnected } from "@/scripts/ContractConstants";


export let wallet_address = "";

export async function connectWallet() {
    let did_the_user_connect_wallet = false;
    // if (window.ethereum) {
    //     return new ethers.providers.Web3Provider(window.ethereum);
    // } else {
    //     console.log("no wallet")
    //     return null;
    // }
    //meaning if we have an ethereum provider installed....
    if (typeof window.ethereum !== 'undefined') {
        // console.log('You have metamask installed proceed to allow connection to this website');
        await window.ethereum.request({ method: 'eth_requestAccounts', pararms:[] }).then(Account =>  {
            did_the_user_connect_wallet = true; 
            wallet_address= Account[0];
            // console.log("This it the variable type of account[0]",typeof Account[0]);  
            // console.log("walet ",Account);     

        }).catch(error => {
            console.log(error);
        })
        
        walletConnected.value = true
        walletAddressConnected.value = true
        console.log("wallet is connected?", wallet_address.value)

        // console.log(`hii ndo value itakayokuwa returned ${did_the_user_connect_wallet}`);
        console.log(did_the_user_connect_wallet);
        return did_the_user_connect_wallet;
    }

    //else if we don't have an ethereum provider installed what do we do ..... we alert the user to install a wallet for now tho but it's gon get more robust youfeemee..
    else {
        walletConnected.value = false
        alert('You do not have an ethereum provider installed please install one');
        return did_the_user_connect_wallet.value;
    }

}