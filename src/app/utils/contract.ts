import { chain } from "./chain";
import { client } from "./client";
import { getContract } from "thirdweb";
import { CONTRACT_ABI } from "./contractABI";
import { CONTRACT_ADDRESS } from "../constants/addresses";

const contractAddress = CONTRACT_ADDRESS;

export const contract = getContract({
  client: client,
  chain: chain,
  address: contractAddress,
  abi: CONTRACT_ABI,
});
