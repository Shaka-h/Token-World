import { notifyError, notifySuccess, notifyWarning } from "@/services/notificationService";
import { getSignerContract } from '@/scripts/ContractUtils.js';
import { defineStore } from "pinia";
import addMetadataFile from "@/scripts/IPFSJSON.js";
import fetchData from "@/scripts/fetchData";
import fetchToken from "@/scripts/fetchToken";
import { ethers } from 'ethers';
import { marketPlace,marketPlace_ABI, nftMyCollection_ABI, nftFactory_Address, nftFactory_ABI, atsh_contractAddress, atsh_abi, TRA_walletAddress } from '@/scripts/ContractConstants'
import axios from "axios";
import { useRouter } from "vue-router";
import router from '@/router';
import {uploadFile} from "@/interfaces/global.interface.js";

let { nftFactory_contract, marketPlace_contract, DSCEngine_contract, DecentralizedStableCoin_contract, signer } = getSignerContract();
// let router = useRouter()

export const useNFTstore = defineStore('stableCoinStore', {
    state: () => {
        return {
            isLoading: false,
            documentLink: null,
            openDocumentViewer: false,
            documentTitle: null,
            state: {
                myCollections: [],
                collectionItem: [],
                allCollections: [],
                collection: [],
                item: null,
                itemSales: [],
            }
        }
    },

    getters: {
        getStoreItem: (state) => {
            return (entity) => state.state[entity]
        }
    },


    actions: {
        async createCollection (data) {
            const store = this;
            try {
                const collectionPhotoCID = await addMetadataFile({
                    "logoCID": data?.logoCID
                });

                const deployedContractAddress = await nftFactory_contract.deployNFTContract(
                    marketPlace,
                    data?.name,
                    data?.symbol,
                    collectionPhotoCID,
                    data?.description,
                );

                store.isLoading = true;

                let receipt = await deployedContractAddress.wait();

                console.log(receipt, "lol");

                // not decodeFunctionData
                // let decodedData = new ethers.utils.Interface(nftFactory_ABI).decodeFunctionResult('deployNFTContract', encodedData)
                // encodedData is found in receipt

                // Ensure that deployedContractAddress is not null or undefined before routing
                if (receipt?.events[0]?.args?.nftContract) {
                    await router.push("/profile");
                    // await router.push(`/cart/${receipt?.events[0]?.args?.nftContract}`);
                    notifySuccess("Added profile successfully!");
                } else {
                    console.error('Error creating collection: Deployed contract address not returned.');
                }

            } catch (error) {
                console.error('Error creating collection:', error);
            }
        },

        async loadMyCollections(address) {
            const store = this;

            try {
                store.isLoading = true;

                // profileContractAddress = this.loadMyProfileContract(address)

                // const nftMyCollection_contract = new ethers.Contract(profileContractAddress, nftMyCollection_ABI, signer);


                // Fetch profile data from the blockchain network
                const myCollection = await nftFactory_contract.getCollectionsByOwner();

                // // Extract the token URL from profileData
                // const tokenUrl = profileData[3];

                // Fetch additional profile details from the token URL using fetchData function
                const profileDetails = await fetchData(myCollection?.logo);

                const promises = myCollection.map(async (collection) => {

                    const logoCID = await fetchToken(collection?.logo);
                    return {
                        ...collection,
                        logo: logoCID,
                        logo: logoCID?.logoCID,
                    };
                });


                const listItem = await Promise.all(promises);
   
                // Update store state with fetched profiles
                store.state['myCollections'] = listItem;

                // Log fetched profiles
                console.log('Fetched profiles:', store.state.myCollections);

            } catch (error) {
                console.error('Error loading profiles:', error);
            
            } finally {
                store.isLoading = false;
            }
        },

        async loadMyProfileContract(address) {

            const store = this;

            try {
                store.isLoading = true;

                const getprofileContract = await nftProfileFactory_contract.profileByAddressOwner(address)

                const profileContract = await getprofileContract?.ProfileContract
                const nftMyProfile_contract = new ethers.Contract(profileContract, nftMyCollection_ABI, signer);

                // Update store state with fetched profiles
                store.state['myProfileContract'] = nftMyProfile_contract;
                return profileContract;

            } catch (error) {
                console.error('Error loading myProfileContract:', error);
                // Handle error
                notifyError('Error loading myProfileContract: ' + error.message);
            } finally {
                store.isLoading = false;
            }

        },

        async getConnectedAddress() {
            const provider= await window.ethereum.request({ method: 'eth_requestAccounts' })
            return provider[0]        
        },

        async loadACollections(address) {
            const store = this;

            try {
                store.isLoading = true;

                // Fetch profile data from the blockchain network
                const selectedCollection= await nftFactory_contract.getNFTCollectionByAddress(address);

                // Update store state with fetched profiles
                store.state['selectedCollection'] = selectedCollection;

            } catch (error) {
                console.error('Error loading profiles:', error);
            
            } finally {
                store.isLoading = false;
            }
        },
        
        async MarketMintItem (item) {
            const store = this;

            try {

                const imageCID = await uploadFile(item.image)

                const itemCID = await addMetadataFile({
                    "option": item.selectedOption,
                    "name": item.name,
                    "imageCID":imageCID,
                    "price": item.price,
                    "description": item.description,
                });

                console.log(itemCID);
        
                const nftMyCollection_contract = new ethers.Contract(item.contractAddress, nftMyCollection_ABI, signer);

                const tokenURIReturned = await nftMyCollection_contract.createToken(
                    itemCID
                )
                console.log(tokenURIReturned);
        
                let receipt = await tokenURIReturned.wait()
        
                console.log(receipt);
                console.log(receipt?.events[2].args.tokenURI);
                console.log(receipt?.events[2].args.itemId);
                
                const tokenIdBigNumber = receipt?.events[2].args.itemId;
        
                // Convert BigNumber to JavaScript number
                const tokenId = tokenIdBigNumber.toNumber();
        
                console.log(tokenId);
        
                if (tokenId) {
                    const mintItem = await marketPlace_contract.createMarketItem(
                        item.contractAddress,
                        tokenId,
                        item.price
                    )
    
                    console.log(mintItem);
                    let mintedItemReturned = await mintItem.wait()
                    console.log(mintedItemReturned?.events[1].args.itemId);
    
                    const itemIdBigNumber = mintedItemReturned?.events[1].args.itemId
                    const itemId = itemIdBigNumber.toNumber()

                    console.log(itemId);
    
                } else {
                    console.error('Error creating token for item');
                }
        
            } catch (error) {
                console.error('Error creating collection:', error);
            }
            console.log("home coming")
        },

        async AuctionMintItem () {
            const store = this;

            try {
                const itemCID = await addMetadataFile({
                    "name": item.name,
                    "symbolCID":item.symbolCID,
                    "supply": item.supply,
                    "description": item.description,
                });

                console.log(itemCID);
        
                const nftMyCollection_contract = new ethers.Contract(address, nftMyCollection_ABI, signer);

                const tokenURIReturned = await nftMyCollection_contract.createToken(
                    itemCID
                )
       
                console.log(tokenURIReturned);
        
                let receipt = await tokenURIReturned.wait()
        
                console.log(receipt);
                console.log(receipt?.events[3].args.tokenURI);
                console.log(receipt?.events[3].args.itemId);
                
                const tokenIdBigNumber = receipt?.events[3].args.itemId;
        
                // Convert BigNumber to JavaScript number
                const tokenId = tokenIdBigNumber.toNumber();
        
                console.log(tokenId);
        
                if (tokenId) {
                    const mintItem = await marketPlace_contract.createAuctionItem(
                        router?.params?.nftAddress,
                        tokenId,
                        price.value
                    )
    
                    console.log(mintItem);
                    let mintedItemReturned = await mintItem.wait()
                    console.log(mintedItemReturned?.events[1].args.itemId);
    
                    const itemIdBigNumber = mintedItemReturned?.events[1].args.itemId
                    const itemId = itemIdBigNumber.toNumber()
    
                    if (itemId) {
                        window.location.reload();
                    } else {
                        console.error('Error creating Item on market');
                    }
                    
                } else {
                    console.error('Error creating token for item');
                }
        
            } catch (error) {
                console.error('Error creating collection:', error);
            }
            console.log("home coming")
        },

        async loadACollectionItem(address) {
            const store = this;

            try {
                store.isLoading = true;

                // profileContractAddress = this.loadMyProfileContract(address)

                const nftMyCollection_contract = new ethers.Contract(address, nftMyCollection_ABI, signer);


                // Fetch profile data from the blockchain network
                const collectionItems = await nftMyCollection_contract.getAllCollectionTokens();

                console.log(collectionItems, "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

                const promises = collectionItems.map(async (itemID) => {

                    const itemUrl = await nftMyCollection_contract.getTokenURIById(parseInt(itemID));
                    
                    const itemData = await fetchToken(itemUrl);

                    const marketItemData = await marketPlace_contract.fetchMarketItemById(itemID);

                    return {
                        ...itemData,
                        ...marketItemData
                    }
                });

                const listItem = await Promise.all(promises);
   
                // Update store state with fetched profiles
                store.state['collection'] = listItem;

                // Log fetched profiles
                console.log('Fetched profiles:', store.state.collection);

            } catch (error) {
                console.error('Error loading profiles:', error);
            
            } finally {
                store.isLoading = false;
            }
        },

        async MarketMintItem (item) {
            const store = this;

            try {

                const imageCID = await uploadFile(item.image)

                const itemCID = await addMetadataFile({
                    "option": item.selectedOption,
                    "name": item.name,
                    "imageCID":imageCID,
                    "price": item.price,
                    "description": item.description,
                });

                console.log(itemCID);
        
                const nftMyCollection_contract = new ethers.Contract(item.contractAddress, nftMyCollection_ABI, signer);

                const tokenURIReturned = await nftMyCollection_contract.createToken(
                    itemCID
                )
                console.log(tokenURIReturned);
        
                let receipt = await tokenURIReturned.wait()
        
                console.log(receipt);
                console.log(receipt?.events[2].args.tokenURI);
                console.log(receipt?.events[2].args.itemId);
                
                const tokenIdBigNumber = receipt?.events[2].args.itemId;
        
                // Convert BigNumber to JavaScript number
                const tokenId = tokenIdBigNumber.toNumber();
        
                console.log(tokenId);
        
                if (tokenId) {
                    const mintItem = await marketPlace_contract.createMarketItem(
                        item.contractAddress,
                        tokenId,
                        item.price
                    )
    
                    console.log(mintItem);
                    let mintedItemReturned = await mintItem.wait()
                    console.log(mintedItemReturned?.events[1].args.itemId);
    
                    const itemIdBigNumber = mintedItemReturned?.events[1].args.itemId
                    const itemId = itemIdBigNumber.toNumber()

                    console.log(itemId);
    
                } else {
                    console.error('Error creating token for item');
                }
        
            } catch (error) {
                console.error('Error creating collection:', error);
            }
            console.log("home coming")
        },

        async loadMyMarketItem(address) {
            const store = this;

            try {
                store.isLoading = true;

                // profileContractAddress = this.loadMyProfileContract(address)

                const nftMyCollection_contract = new ethers.Contract(address, nftMyCollection_ABI, signer);


                // Fetch profile data from the blockchain network
                const myCollectionItemIDs = await marketPlace_contract.fetchMyNFTs();

                const promises = myCollectionItemIDs.map(async (itemID) => {

                    const itemUrl = await nftMyCollection_contract.getTokenURIById(parseInt(itemID));
                    
                    const itemData = await fetchToken(itemUrl);

                    const marketItemData = await marketPlace_contract.fetchMarketItemById(itemID);

                    return {
                        ...itemData,
                        ...marketItemData
                    }
                });

                const listItem = await Promise.all(promises);
   
                // Update store state with fetched profiles
                store.state['collectionItem'] = listItem;

                // Log fetched profiles
                console.log('Fetched profiles:', store.state.collectionItem);

            } catch (error) {
                console.error('Error loading profiles:', error);
            
            } finally {
                store.isLoading = false;
            }
        },

        async AuctionMintItem () {
            const store = this;

            try {
                const itemCID = await addMetadataFile({
                    "name": item.name,
                    "symbolCID":item.symbolCID,
                    "supply": item.supply,
                    "description": item.description,
                });

                console.log(itemCID);
        
                const nftMyCollection_contract = new ethers.Contract(address, nftMyCollection_ABI, signer);

                const tokenURIReturned = await nftMyCollection_contract.createToken(
                    itemCID
                )
       
                console.log(tokenURIReturned);
        
                let receipt = await tokenURIReturned.wait()
        
                console.log(receipt);
                console.log(receipt?.events[3].args.tokenURI);
                console.log(receipt?.events[3].args.itemId);
                
                const tokenIdBigNumber = receipt?.events[3].args.itemId;
        
                // Convert BigNumber to JavaScript number
                const tokenId = tokenIdBigNumber.toNumber();
        
                console.log(tokenId);
        
                if (tokenId) {
                    const mintItem = await marketPlace_contract.createAuctionItem(
                        router?.params?.nftAddress,
                        tokenId,
                        price.value
                    )
    
                    console.log(mintItem);
                    let mintedItemReturned = await mintItem.wait()
                    console.log(mintedItemReturned?.events[1].args.itemId);
    
                    const itemIdBigNumber = mintedItemReturned?.events[1].args.itemId
                    const itemId = itemIdBigNumber.toNumber()
    
                    if (itemId) {
                        window.location.reload();
                    } else {
                        console.error('Error creating Item on market');
                    }
                    
                } else {
                    console.error('Error creating token for item');
                }
        
            } catch (error) {
                console.error('Error creating collection:', error);
            }
            console.log("home coming")
        },

        async loadAllCollections(address) {
            const store = this;

            try {
                store.isLoading = true;

                // profileContractAddress = this.loadMyProfileContract(address)

                const allCollections = await nftFactory_contract.getAllDeployedNFTCollections();

                console.log(allCollections, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
   
                // Update store state with fetched profiles
                store.state['allCollections'] = allCollections;

                // Log fetched profiles
                console.log('Fetched profiles:', store.state.allCollections);

            } catch (error) {
                console.error('Error loading profiles:', error);
            
            } finally {
                store.isLoading = false;
            }
        },

        async loadItem(item) {
            const store = this;

            try {
                store.isLoading = true;
                console.log(item, "AAAAAAAAAAAAAAAAAAAAAAAA");

                // profileContractAddress = this.loadMyProfileContract(address)

                const nftMyCollection_contract = new ethers.Contract(item?.collectionId, nftMyCollection_ABI, signer);

                const itemUrl = await nftMyCollection_contract.getTokenURIById(parseInt(item?.tokenId));

                const itemData = await fetchToken(itemUrl);
                const marketItemData = await marketPlace_contract.fetchMarketItemById(parseInt(item?.tokenId));

                const details = {
                    ...itemData,
                    ...marketItemData
                }

   
                // Update store state with fetched profiles
                store.state['item'] = details;

                // Log fetched profiles
                console.log('Fetched profiles:', store.state.item);

            } catch (error) {
                console.error('Error loading profiles:', error);
            
            } finally {
                store.isLoading = false;
            }
        },

        async payAtsh(itemId) {
            const store = this;

            try {
                store.isLoading = true;
                console.log(itemId, "AAAAAAAAAAAAAAAAAAAAAAAA");

                const buy = await marketPlace_contract.buyItem(itemId);

                const receipt = await buy.wait();
                console.log(receipt, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

                if (receipt?.events[1]?.event == "itemSold") {
                    notifySuccess("Item Sold!");
                } else {
                    console.error('Error creating collection: Deployed contract address not returned.');
                }


            } catch (error) {
                console.error('Error loading profiles:', error);
            
            } finally {
                store.isLoading = false;
            }
        },

        async loadItemSales(itemID) {
            const store = this;

            try {
                store.isLoading = true;
                console.log(itemID, "AAAAAAAAAAAAAAAAAAAAAAAA");

                const marketItemData = await marketPlace_contract.getAllSalesMade(itemID);

                console.log(marketItemData, "BBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
                
                const promises = marketItemData.map(async (item) => {
                    console.log(parseInt(item.time));
                    let readableDate = new Date(parseInt(item.time) * 1000).toLocaleString();

                    return {
                        ...item,
                        time: readableDate,
                    };
                });


                const listItem = await Promise.all(promises);

   
                // Update store state with fetched profiles
                store.state['itemSales'] = listItem;

                // Log fetched profiles
                console.log('Fetched profiles:', store.state.itemSales);

            } catch (error) {
                console.error('Error loading profiles:', error);
            
            } finally {
                store.isLoading = false;
            }
        },


    }
});
