# MetaMaskDetector

---

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
    console.error(`User Reject Connect:${error.message}`);
  }
}
```

<div style="color: #161616; opacity: 0.8; font-size: 14px font-weight: bold; line-height: 1rem;">feed me: 0x3a64c43c24032DA32d422DB49a19052D1C584446<div>
