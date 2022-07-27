import { MetaMaskInjected } from './types';

interface Window {
  ethereum: MetaMaskInjected;
}

interface IMetamaskProps {
  silent: boolean;
  timeout: number;
}

/**
 * @description: detect injected metamask return a ethereum variable, unless can't not detect return null.
 * @param {silent} options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param {timeout} options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @return {*} Primose<ethereum>
 */
const metamaskDetetor = <T = MetaMaskInjected>({
  silent = false,
  timeout = 3000,
}: IMetamaskProps): Promise<T | null> => {
  let handle = false;

  return new Promise((resolve, reject) => {
    const { ethereum } = window as unknown as Window;

    const handleEthereum = () => {
      if (handle) {
        return;
      }
      handle = true;

      window.removeEventListener('metamask_initialized', handleEthereum);

      const { ethereum } = window as unknown as Window;

      if (ethereum && ethereum.isMetaMask) {
        resolve(ethereum as unknown as T);
      } else {
        const message =
          ethereum && !ethereum.isMetaMask
            ? 'Non-MetaMask Detect.'
            : 'Not Detect Ethereum.';

        !silent && console.error(`metamask-detector: ${message}`);
        resolve(null);
      }
    };

    if (ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('metamask_initialized', handleEthereum, {
        once: true,
      });

      setTimeout(() => {
        handleEthereum();
      }, timeout);
    }
  });
};

export = metamaskDetetor;
