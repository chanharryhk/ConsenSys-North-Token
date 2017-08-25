import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results

    var web3 = window.web3
    // web3 = new Web3(web3.currentProvider)

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // Use Mist/MetaMask's provider.
    var metaMaskWeb3 = new Web3(web3.currentProvider)
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"))

    results = {
      web3: web3,
      metaMaskWeb3: metaMaskWeb3
    }
    console.log('Injected web3 detected.');
    resolve(results)
  })
})

export default getWeb3
