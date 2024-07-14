import {ipfsGateway} from "@/scripts/ContractConstants";

// Function to add metadata to IPFS
const fetchToken = async (tokenURI) => {
    try {
      const response = await fetch(`${ipfsGateway}${tokenURI}`);
      const data = await response.json();
      return data
  
      // Handle data as needed
    } catch (error) {
      console.error('Error fetching data from', tokenURI, ':', error);
      // Handle error
    }
  
  };
   
  export default fetchToken;