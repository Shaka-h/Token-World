import { create } from 'ipfs-http-client';

// Connect to the IPFS API
const ipfs = create('/ip4/127.0.0.1/tcp/5001');



// Function to add metadata to IPFS
async function addMetadata(metadata) {
    try {
        // Add metadata to IPFS 
        const { cid } = await ipfs.add(metadata);

        console.log('Metadata added to IPFS with CID:', cid.toString());
        return cid.toString();
    } catch (error) {
        console.error('Error adding metadata to IPFS:', error);
        throw error;
    }
}


export default addMetadata;
