import {ipfsGateway} from "@/scripts/ContractConstants";

// Function to add metadata to IPFS
const fetchToken = async (tokenURI) => {  
  console.log(tokenURI, "PPPPPPPPPPPPPPPPPPPPPPPPPPP");

    try {
      const response = await fetch(`${ipfsGateway}${tokenURI}`);

      // const data = await response.json();

      return response
  
      // Handle data as needed
    } catch (error) {
      console.error('Error fetching data from', tokenURI, ':', error);
      // Handle error
    }
  
  };
   
  export default fetchToken;