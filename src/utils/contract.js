import web3 from './web3';

const address = '0x7187211744c67F8cE89fEAc63b85D8D17417bDfE'; // rinkeby 0x7B5B92B0eD1DfeafdbD724b177A7733Bda67497F
const abi = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'approved',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'operator',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'approved',
				type: 'bool'
			}
		],
		name: 'ApprovalForAll',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint64',
				name: 'NFT_id',
				type: 'uint64'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'receiver',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint128',
				name: 'amount',
				type: 'uint128'
			}
		],
		name: 'Claim',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint64',
				name: 'NFT_id',
				type: 'uint64'
			},
			{
				indexed: false,
				internalType: 'uint128',
				name: 'transfer_price',
				type: 'uint128'
			}
		],
		name: 'DeterminePrice',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint64',
				name: 'NFT_id',
				type: 'uint64'
			},
			{
				indexed: false,
				internalType: 'uint128',
				name: 'transfer_price',
				type: 'uint128'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'to',
				type: 'address'
			}
		],
		name: 'DeterminePriceAndApprove',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint64',
				name: 'NFT_id',
				type: 'uint64'
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'content',
				type: 'string'
			}
		],
		name: 'Label',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint32',
				name: 'issue_id',
				type: 'uint32'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'publisher',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint64',
				name: 'rootNFTId',
				type: 'uint64'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token_addr',
				type: 'address'
			}
		],
		name: 'Publish',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint64',
				name: 'NFT_id',
				type: 'uint64'
			},
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'old_URI',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'new_URI',
				type: 'bytes32'
			}
		],
		name: 'SetURI',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'Transfer',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'acceptShill',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'approve',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'claimProfit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			},
			{
				internalType: 'uint128',
				name: '_price',
				type: 'uint128'
			}
		],
		name: 'determinePrice',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			},
			{
				internalType: 'uint128',
				name: '_price',
				type: 'uint128'
			},
			{
				internalType: 'address',
				name: '_to',
				type: 'address'
			}
		],
		name: 'determinePriceAndApprove',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'getApproved',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getDepthByNFTId',
		outputs: [
			{
				internalType: 'uint64',
				name: '',
				type: 'uint64'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getEditionIdByNFTId',
		outputs: [
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getFatherByNFTId',
		outputs: [
			{
				internalType: 'uint64',
				name: '',
				type: 'uint64'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getIssueIdByNFTId',
		outputs: [
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getLossRatio',
		outputs: [
			{
				internalType: 'uint8',
				name: '',
				type: 'uint8'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getProfitByNFTId',
		outputs: [
			{
				internalType: 'uint128',
				name: '',
				type: 'uint128'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getRemainShillTimesByNFTId',
		outputs: [
			{
				internalType: 'uint16',
				name: '',
				type: 'uint16'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint32',
				name: '_issue_id',
				type: 'uint32'
			}
		],
		name: 'getRootNFTIdByIssueId',
		outputs: [
			{
				internalType: 'uint64',
				name: '',
				type: 'uint64'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint32',
				name: '_issue_id',
				type: 'uint32'
			}
		],
		name: 'getRoyaltyFeeByIssueId',
		outputs: [
			{
				internalType: 'uint8',
				name: '',
				type: 'uint8'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getRoyaltyFeeByNFTId',
		outputs: [
			{
				internalType: 'uint8',
				name: '',
				type: 'uint8'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getShillPriceByNFTId',
		outputs: [
			{
				internalType: 'uint128',
				name: '',
				type: 'uint128'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint32',
				name: '_issue_id',
				type: 'uint32'
			}
		],
		name: 'getShillTimesByIssueId',
		outputs: [
			{
				internalType: 'uint16',
				name: '',
				type: 'uint16'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint32',
				name: '_issue_id',
				type: 'uint32'
			}
		],
		name: 'getTokenAddrByIssueId',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getTokenAddrByNFTId',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint32',
				name: '_issue_id',
				type: 'uint32'
			}
		],
		name: 'getTotalAmountByIssueId',
		outputs: [
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'getTransferPriceByNFTId',
		outputs: [
			{
				internalType: 'uint128',
				name: '',
				type: 'uint128'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'operator',
				type: 'address'
			}
		],
		name: 'isApprovedForAll',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'isEditionExisting',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint32',
				name: '_issue_id',
				type: 'uint32'
			}
		],
		name: 'isIssueExisting',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			}
		],
		name: 'isRootNFT',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			},
			{
				internalType: 'string',
				name: 'content',
				type: 'string'
			}
		],
		name: 'label',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'name',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'ownerOf',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint128',
				name: '_first_sell_price',
				type: 'uint128'
			},
			{
				internalType: 'uint8',
				name: '_royalty_fee',
				type: 'uint8'
			},
			{
				internalType: 'uint16',
				name: '_shill_times',
				type: 'uint16'
			},
			{
				internalType: 'bytes32',
				name: '_ipfs_hash',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: '_token_addr',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: '_is_NC',
				type: 'bool'
			},
			{
				internalType: 'bool',
				name: '_is_ND',
				type: 'bool'
			}
		],
		name: 'publish',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				internalType: 'bytes',
				name: '_data',
				type: 'bytes'
			}
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'operator',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: 'approved',
				type: 'bool'
			}
		],
		name: 'setApprovalForAll',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_NFT_id',
				type: 'uint64'
			},
			{
				internalType: 'bytes32',
				name: 'ipfs_hash',
				type: 'bytes32'
			}
		],
		name: 'setURI',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes4',
				name: 'interfaceId',
				type: 'bytes4'
			}
		],
		name: 'supportsInterface',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'tokenURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'transferFrom',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	}
];

export default new web3.eth.Contract(abi, address);
