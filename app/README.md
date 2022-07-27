# Calendar ME
`ethcc Hackthons project`

## Introduction
Calendar me is an attmept to create calendly but on the chain , contract are deployed on mumbai testnet and moralis sdk is used to interact with it 

## Platform Overview

The user Flow interacting with the smart contract in the frontend is as follow :

1. User login using metamask.
2. User is given an address to share.
3. Shared address leads to booking page.
4. All booking are done through a smart contract call , and the information is saved on ipfs.
5. User have a booking page where they can view all thier meeting old and new 
6. User can refund meeting fees.

## Tech stack Used

- Polygon
- web3-provider
- Moralis
- NextJs
- Tailwindcss
- HardHat


## Future Work

- Add a functionality that allow users  select thier availability time .
- Add a functionality that allow users to confirm meetings, and change meeting status.  
- overhaul the frontend design 

## Directory Structure

```
📦 app
 ┣ 📂 abi (smart contract api)
 ┣ 📂 components (app components)
 ┣ 📂 models (moralis db interactions)
 ┣ 📂 pages (app pages)
 ┣ 📂 public (public pictures)
 ┣ 📂 smart-contract
 ┣    ┣ 📂contract(Solidity smart contract)
 ┃    ┣ 📂scripts (hardhats scripts)
 ┃    ┣	📂 test (Smart Contract Tests)
 ┃    ┣ 📜 hardhat.config ( hardhat Project Config)
 ┃    ┣ 📜 package.json (project dependencies)
 ┃
 ┣ 📂 style (app style)
 ┣ 📂 utils (utility files)
 ┣ 📜 README.md (Project Documentation)
 ┣ 📜 bookingAddress.js (contract address)
 ┣ 📜 tailwind.config.js (tailwind config)
 ┗ 📜 package.json (project dependencies)
```

## Running the project

Run `npm i` to install dependencies.

### Smart Contracts

In the smart-contract directory :

1. Run `npm i` to install dependencies.
2. To compile contracts run `npx hardhat compile`
3. To deploy run `npx hardhat run --network mumbai scripts/deploy.js`


### Frontend/To Start Local Server

1. In the projects root directory, run `npm run dev`

## Project Demo

Website 👉 [demo]()
