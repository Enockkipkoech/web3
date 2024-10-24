import 'dotenv/config';

const config = {
	APP: {
		PORT: process.env.PORT,
		SERVER_URL: process.env.SERVER_URL,
		RPC_URL: process.env.RPC_URL,
	},
	ETH: {
		WALLET_ADDRESS: process.env.WALLET_ADDRESS,
		PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
	},
};

export { config };
