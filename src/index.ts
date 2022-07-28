import { MetaMaskInjected, Window } from './types';

interface IMetamaskProps {
  silent?: boolean;
  timeout?: number;
  error?: {
    type: 'console' | 'alert';
    message: string;
  };
}

/**
 * @description: detect injected metamask return a ethereum variable, unless can't not detect print error message.
 * @param {silent} options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param {timeout} options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @param {timeout} options.error - If the connection is wrong, error.type like `console` or `alert` `error.message`.
 * @return {*} Primose<ethereum>
 */
const metamaskDetetor = <T = MetaMaskInjected>({
  silent = false,
  timeout = 3000,
  error = {
    type: 'console',
    message: 'Connect MetaMask Faild! Please Checkout You NetWork',
  },
}: IMetamaskProps): Promise<T> => {
  if (typeof silent !== 'boolean') {
    throw new Error(
      `metamask-detector: Expected option 'silent' to be a boolean.`
    );
  }
  if (typeof timeout !== 'number') {
    throw new Error(
      `metamask-detector: Expected option 'timeout' to be a number.`
    );
  }

  let handle = false;

  return new Promise((resolve) => {
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
        if (error.type === 'alert') {
          alert(`metamask-detector: ${error.message}`);
        } else {
          !silent
            ? console.error(`metamask-detector: ${error.message}`)
            : console.log(`metamask-detector: ${error.message}`);
        }
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
