export const CONTRACT_ABI = [
  {
    type: "event",
    name: "BlocDeleted",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
        internalType: "address",
      },
      {
        type: "string",
        name: "Bloc",
        indexed: false,
        internalType: "string",
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "bytes32",
        name: "uniqueId",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "BlocTipped",
    inputs: [
      {
        type: "address",
        name: "from",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "to",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "BlocUpdated",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
        internalType: "address",
      },
      {
        type: "string",
        name: "Bloc",
        indexed: false,
        internalType: "string",
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "bytes32",
        name: "uniqueId",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "BlocTips",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deleteBloc",
    inputs: [
      {
        type: "bytes32",
        name: "_uniqueId",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBlocTip",
    inputs: [
      {
        type: "address",
        name: "_address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "royaltyPercentage",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setBloc",
    inputs: [
      {
        type: "string",
        name: "_Bloc",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "tipBloc",
    inputs: [
      {
        type: "address",
        name: "_to",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "userBlocs",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "content",
        internalType: "string",
      },
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "timestamp",
        internalType: "uint256",
      },
      {
        type: "bytes32",
        name: "uniqueIdentifier",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
] as const;
