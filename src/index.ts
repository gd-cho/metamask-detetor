import { MetaMaskInjected } from './types';

interface Window {
  ethereum: MetaMaskInjected;
}

interface IMetamaskProps {
  silent: boolean;
  timeout: number;
}

/**
 * @description:
 * @return {*}
 */
const metamaskDetetor = <T = MetaMaskInjected>({
  silent,
  timeout,
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
