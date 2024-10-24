import express from 'express';
import Web3 from 'web3';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { config } from './config.js';

const app = express();
dotenv.config();

// OBJECTIVES
// 1. Development SetUp - Nodejs, Express, Web3, Ethers, dotenv Setup
// 2. Blockchain Security & Wallets - Public & Private Keys
// 2. Web3 Provider Connection(Connect to Ethereum Network)
// 3. Ethers Wallet Connection(Connect to Ethereum Network)
// 4. Ethers Wallet Balance Check
// 5. Smart Contract ABI & Address
// 6. Smart Contract Connection(Connect to Smart Contract)
// 7. Smart Contract Read Functions( Interract with Smart Contract)
// 8. Data Streaming Mempool Transactions(Realtime Transactions)
// 8. Smart Contract Write Functions (Sending Transactions)
// 9. Smart Contract Events
// 10. Smart Contract Deployment

// PART 2: LISK WALLET SETUP

console.log(`✅ Happy Blockchain Coding! 🚀 ✅`);

// TODO WRITE YOUR CODE HERE...

// Provider Initialization

// WEB3JS CONNECTION
const RPC_URI = config.APP.RPC_URL;
console.log(`RPC_URI:`, RPC_URI);
const web3 = new Web3(RPC_URI);
console.log(`MY CURRENT CHAIN:🔥`, web3.config.defaultChain, `🔥`);
const web3JsProvider = web3.currentProvider;

const ethersJsProvider = new ethers.JsonRpcProvider(RPC_URI);

// Check Provider utility function
const checkProvider = async (url) => {
	try {
		const provider = new ethers.JsonRpcProvider(url);
		console.log(`PROVIDER:`, provider);
		if (!provider) return false;
		return true;
	} catch (error) {
		console.log(`Error checking provider:`, error);
		return false;
	}
};

console.log({ web3JsProvider, ethersJsProvider });

//ETHERSJS CONNECTION

// CREATE A NEW WALLET
export const createWallet = async () => {
	try {
		// web3js wallet
		const wallet_Object = web3.eth.accounts.wallet.create(1);
		console.log(`WEB3JS ERC20 WALLET:`, wallet_Object);

		// ethersjs wallet
		const rpcEthers = await checkProvider(RPC_URI);
		console.log(`RPC ETHERS:`, rpcEthers);
		if (!rpcEthers) return;
		const ethersWallet = ethers.Wallet.createRandom();
		console.log(`ERC20 ETHERS WALLET:`, ethersWallet);

		return { wallet_Object, ethersWallet };
	} catch (error) {
		console.log(`Error creating wallet:`, error);
	}
};

// TEST CREATE WALLET
// createWallet();

// GET WALLET BALANCE
const walletAddress = config.ETH.WALLET_ADDRESS;
console.log(`WALLET ADDRESS:`, walletAddress);
export const getBalance = async () => {
	try {
		const balance = await web3.eth.getBalance(walletAddress);
		console.log(`BALANCE:`, balance);

		// ethers.formatUnits(balance)
		return balance;
	} catch (error) {
		console.log(`Error fetching balance:`, error);
		return error;
	}
};

// TEST GET BALANCE
// getBalance();

// SMART CONTRACT ABI
export const getUsdtBalance = async (walletAddress) => {
	try {
		const USDTContractAddress = '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684'; // USDT CONTRACT

		const contractABI = [
			{
				constant: true,
				inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
				name: 'balanceOf',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				payable: false,
				stateMutability: 'view',
				type: 'function',
			},
			{
				constant: true,
				inputs: [],
				name: 'decimals',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				payable: false,
				stateMutability: 'view',
				type: 'function',
			},
		];

		const contract = new web3.eth.Contract(contractABI, USDTContractAddress);
		const balance = await contract.methods.balanceOf(walletAddress).call();
		const decimals = await contract.methods.decimals().call();
		// format balance
		const formatBal = ethers.formatUnits(balance, decimals);
		return formatBal;
	} catch (error) {
		console.log(`Error fetching USDT balance:`, error);
		return error;
	}
};

// TEST GET USDT BALANCE
// getUsdtBalance(walletAddress);

// CREATE SIGNER
export const getSigner = async () => {
	try {
		console.log(config.ETH.PRIVATE_KEY);
		const ethersSigner = new ethers.Wallet(
			config.ETH.PRIVATE_KEY,
			web3JsProvider
		);
		const web3Signer = await web3.eth.accounts.privateKeyToAccount(
			config.ETH.PRIVATE_KEY
		);
		console.log(`WEB3 SIGNER:`, web3Signer);
		console.log(`ETHERS SIGNER:`, ethersSigner);
		return { ethersSigner, web3Signer };
	} catch (error) {
		console.log(`Error creating signer:`, error);
		return error;
	}
};

// TEST GET SIGNER
// getSigner();

export { app };
