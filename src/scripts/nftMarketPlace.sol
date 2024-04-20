//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 //prevents re-entrancy attacks
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds; //total number of items ever created
    Counters.Counter private _itemsSold; //total number of items sold
    Counters.Counter private _offerID;

    address payable owner; //mmiliki wa item at any time t
    address payable seller; //anayetengeneza item kwenye market

    constructor(){
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint itemId;
        address payable nftContract;
        uint256 tokenId;
        address payable seller; 
        address payable owner; 
        uint256 price;
        bool sold;
        uint256 currentBiddingPrice;
    }

    //a way to access values of the MarketItem struct above by passing an integer of the itemID
    mapping(uint256 => MarketItem) private idMarketItem;

    //log message (when Item is sold)
    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address  seller,
        address  owner,
        uint256 price,
        bool sold
    );
  

    /// @notice function to create market item
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price) public payable nonReentrant{
         require(price > 0, "Price must be above zero");

         _itemIds.increment(); //add 1 to the total number of items ever created
         uint256 itemId = _itemIds.current();

         idMarketItem[itemId] = MarketItem(
             itemId,
             payable (nftContract),
             tokenId,
             payable(msg.sender), //address of the seller putting the nft up for sale
             payable(address(0)), //no owner yet (set owner to empty address)
             price,
             false,
             price
         );

            //transfer ownership of the nft to the contract itself
            IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

            //log this transaction
            emit MarketItemCreated(
             itemId,
             nftContract,
             tokenId,
             msg.sender,
             address(0),
             price,
             false);

        }

    struct Offer {
        address nftContract;
        uint256 itemID;
        uint256 offerPrice;
        address payable offerer;
        bool status;
        uint256 offerID;
    }

    mapping(uint256 => Offer[]) public offersMadeToItem;

    function makeOffer(uint256 itemID, uint256 offerPrice) public payable nonReentrant {
        require(offerPrice > idMarketItem[itemID].currentBiddingPrice, "Offer price must be greater than the current bidding price");
        require(msg.value == offerPrice, "Please submit the offer price in order to complete making an offer");


         // only seller can accept offer
        require(msg.sender == idMarketItem[itemID].seller, "Seller can not make offer");

        // Get Item details of a specific offer to know if already sold or not
        require(!idMarketItem[itemID].sold, "Item already sold");


        address nftContractAddress = idMarketItem[itemID].nftContract;

        _offerID.increment();

        // Store the offer
        offersMadeToItem[itemID].push(Offer({
            nftContract: nftContractAddress, // Use the correct nftContractAddress
            itemID: itemID,
            offerPrice: msg.value,
            offerer: payable(msg.sender),
            status: false,
            offerID: _offerID.current()
        }));
    }


    function acceptOffer(uint256 offerId, address nftContract) external {
        // Get the array of offers made to the item with offerId
        Offer[] storage offers = offersMadeToItem[offerId];

        // Verify if the offer with the given ID exists
        require(offers.length > 0 && offerId <= offers.length, "Invalid offer ID");

        // Get the offer with the given ID
        Offer storage offer = offers[offerId - 1];

        // Check if the offer has already been accepted
        require(!offer.status, "Offer already accepted");

        // Mark the offer as accepted
        offer.status = true;

        // Extract necessary details
        uint256 itemId = offer.itemID;
        uint256 tokenId = idMarketItem[itemId].tokenId;
        uint256 offerPrice = offer.offerPrice;
        address payable offerer = offer.offerer;

        // Transfer payment from buyer to seller
        idMarketItem[itemId].seller.transfer(offerPrice);

        // Transfer NFT ownership from contract to buyer
        IERC721(nftContract).transferFrom(address(this), offerer, tokenId);

        // Update item ownership and sold status
        idMarketItem[itemId].owner = payable(offerer);
        idMarketItem[itemId].sold = true;
        _itemsSold.increment();

        returnOffers(itemId);
    }

    function returnOffers(uint256 itemId) private {
        // Get the array of offers made to the item with itemId
        Offer[] storage offers = offersMadeToItem[itemId];

        // Find the index of the accepted offer
        uint256 indexToRemove;
        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].status) {
                indexToRemove = i;
                break;
            }
        }

        // Remove the accepted offer from the array
        if (indexToRemove < offers.length) {
            for (uint256 i = indexToRemove; i < offers.length - 1; i++) {
                offers[i] = offers[i + 1];
            }
            offers.pop();
        }

        // Return the amount to the remaining offerers
        for (uint256 i = 0; i < offers.length; i++) {
            if (!offers[i].status) {
                offers[i].offerer.transfer(offers[i].offerPrice);
            }
        }
    }



    /// @notice total number of items unsold on our platform
    function fetchMarketItemsUnsold() public view returns (MarketItem[] memory){
        uint itemCount = _itemIds.current(); //total number of items ever created
        //total number of items that are unsold = total items ever created - total items ever sold
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items =  new MarketItem[](unsoldItemCount);

        //loop through all items ever created
        for(uint i = 0; i < itemCount; i++){

            //get only unsold item
            //check if the item has not been sold
            //by checking if the owner field is empty
            if(idMarketItem[i+1].owner == address(0)){
                //yes, this item has never been sold
                uint currentId = idMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;

            }
        }
        return items; //return array of all unsold items
    }

    /// @notice fetch list of NFTS owned/bought by this user
    function fetchMyNFTs() public view returns (MarketItem[] memory){
        //get total number of items ever created
        uint totalItemCount = _itemIds.current();

        uint itemCount = 0;
        uint currentIndex = 0;


        for(uint i = 0; i < totalItemCount; i++){
            //get only the items that this user has bought/is the owner
            if(idMarketItem[i+1].owner == msg.sender){
                itemCount += 1; //total length
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){
            if(idMarketItem[i+1].owner == msg.sender){
                uint currentId = idMarketItem[i+1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;

    }


        /// @notice fetch list of NFTS owned/bought by this user
    function fetchItemsCreated() public view returns (MarketItem[] memory){
        //get total number of items ever created
        uint totalItemCount = _itemIds.current();

        uint itemCount = 0;
        uint currentIndex = 0;


        for(uint i = 0; i < totalItemCount; i++){
            //get only the items that this user has bought/is the owner
            if(idMarketItem[i+1].seller == msg.sender){
                itemCount += 1; //total length
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){
            if(idMarketItem[i+1].seller == msg.sender){
                uint currentId = idMarketItem[i+1].itemId;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;

    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

}