export interface Window {
  ethereum: MetaMaskInjected;
}

export const EVENT_NAMES = [
  'connect',
  'message',
  'error',
  'close',
  'disconnect',
  'accountsChanged',
  'chainChanged',
] as const;

type ValueOf<T> = T[keyof T];

export interface AddEthereumChainParameter {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}

export interface SwitchEthereumChainParameter {
  chainId: string;
}

export const REQUEST_METHOD = [
  'wallet_addEthereumChain',
  'wallet_switchEthereumChain',
  'eth_requestAccounts',
  'eth_chainId',
  'eth_accounts',
  'eth_blockNumber',
  'eth_getBalance',
  'eth_estimateGas',
  'eth_getTransactionCount',
  'eth_getTransactionReceipt',
  'eth_sendRowTransaction',
  'eth_getBlockByHash',
  'eth_getBlockByNumber',
  'eth_getBlockTransactionCountByHash',
  'eth_getBlockTransactionCountByNumber',
  'eth_gasPrice',
  'eth_sign',
  'eth_signTransaction',
  'eth_sendTransaction',
] as const;

export interface RequestObject {
  method: ValueOf<typeof REQUEST_METHOD>;
  params?: (
    | string
    | boolean
    | AddEthereumChainParameter
    | SwitchEthereumChainParameter
  )[];
  id?: number;
}

export interface MetaMaskInjected {
  chainId: string;
  eventNames: typeof EVENT_NAMES;
  isMetaMask: boolean;
  isConnected: () => boolean;
  request: (obj: RequestObject) => any;
  once(
    eventName: ValueOf<typeof EVENT_NAMES>,
    listener: (...args: any[]) => void
  ): this;
  on(
    eventName: ValueOf<typeof EVENT_NAMES>,
    listener: (...args: any[]) => void
  ): this;
  off(
    eventName: ValueOf<typeof EVENT_NAMES>,
    listener: (...args: any[]) => void
  ): this;
  addListener(
    eventName: ValueOf<typeof EVENT_NAMES>,
    listener: (...args: any[]) => void
  ): this;
  removeListener(
    eventName: ValueOf<typeof EVENT_NAMES>,
    listener: (...args: any[]) => void
  ): this;
  removeAllListeners(event?: ValueOf<typeof EVENT_NAMES>): this;
}
