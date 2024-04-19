import { create } from 'ipfs-http-client';

// Connect to the IPFS API
const ipfs = create('/ip4/127.0.0.1/tcp/5001');

// Function to cat metadata to IPFS
async function getMetadata(cid) {
    try {
        // Retrieve metadata from IPFS using CID
        const metadata = await ipfs.cat(cid);

        // Convert metadata from Buffer to string
        const metadataString = metadata.toString('utf-8');

        // // Parse metadata JSON
        // const parsedMetadata = JSON.parse(metadataString);

        return metadata;
    } catch (error) {
        console.error('Error getting metadata from IPFS:', error);
        throw error;
    }
}


export default getMetadata;
