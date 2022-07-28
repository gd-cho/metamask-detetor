# MetaMaskDetector

Detect MetaMask Inject Variable Ethereum.

## Usage

```javascript
import metamaskDetetor from "metamask-detetor";

function ethereumDetector = async () => {
  const ethereum = await metamaskDetetor();

  // switch network to ethereum network
  await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }],
  });

  // Launch MetaMask Connect Request
  try {
    await ethereum.request({
      method: 'eth_requestAccounts'
    });
  } catch (error) {
    console.error(`User Reject Connect:${error}`);
  }
}
```
