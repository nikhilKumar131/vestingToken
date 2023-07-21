
import { ethers } from 'ethers';
import {abi, address} from "../contract/smc"


//get provider or signer function
export async function getProviderOrSigner(signer = false, web3modalRef) {
    try {
      const provider = await web3modalRef.current.connect()
      const providers = new ethers.providers.Web3Provider(provider)

      //checking network connected
      const { chainId } = await providers.getNetwork();
      if (chainId !== 11155111) {
          window.alert("Change the network to Sepolai");
          throw new Error("Change network to Sepolai");
      }
      5
      if (signer) {
        const signer = providers.getSigner();
        return signer;
      }

      return providers;
    }
    catch {
      (err) => { console.error(err) }
    }

  }


  //all the did functions
  export async function balance(web3modalRef,_settingBal) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      const txn = await contract.balanceOf(addr);
      const _bal = parseInt(txn);
      _settingBal(_bal);
    //   const reciept = await txn.wait();
      console.log(txn);
      console.log(_bal)
    }
    catch { err => { console.error(err) } }
  }

  export async function registerDID(web3modalRef,_id,_info,_data,_controller) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      console.log("registerDid1")
      const txn = await contract.registerDID(_id,_info,_data,_controller);
      const reciept = await txn.wait();
      console.log(txn);
      console.log(reciept);
    }
    catch { err => { console.error(err) } }
  }

  export async function updateDID(web3modalRef,_owner,_info,_data,_controller) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      console.log("registerDid1")
      const txn = await contract.updateDID(_owner,_info,_data,_controller);
      const reciept = await txn.wait();
      console.log(txn);
      console.log(reciept);
    }
    catch { err => { console.error(err) } }
  }

  export async function activateOrDeactivateDID(web3modalRef,_owner,_info,_data,_controller) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      console.log("registerDid1")
      const txn = await contract.activateOrDeactivateDID(_owner);
      const reciept = await txn.wait();
      console.log(txn);
      console.log(reciept);
    }
    catch { err => { console.error(err) } }
  }




  //all did document functions

  export async function getDocFromId(web3modalRef,_id) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      const txn = await contract.getDocFromId(_id);
    //   const reciept = await txn.wait();
      console.log(txn);
    }
    catch { err => { console.error(err) } }
  }

  export async function getDocFromOwner(web3modalRef,_owner) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      const txn = await contract.getDocFromOwner(_owner);
    //   const reciept = await txn.wait();
      console.log(txn);
    }
    catch { err => { console.error(err) } }
  }

  export async function getDocFromPublisher(web3modalRef,_publisher) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      const txn = await contract.getDocFromPublisher(_publisher);
    //   const reciept = await txn.wait();
      console.log(txn);
    }
    catch { err => { console.error(err) } }
  }


  export async function registerDIDdoc(web3modalRef,_id,_info,_publicHash,_endpoint,_controller,_owner) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      console.log("registerDid1")
      const txn = await contract.registerDIDdoc(_id,_info,_publicHash,_endpoint,_controller,_owner);
      const reciept = await txn.wait();
      console.log(txn);
      console.log(reciept);
    }
    catch { err => { console.error(err) } }
  }

  export async function updateDoc(web3modalRef,_id,_info,_publicHash,_endpoint,_controller) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      console.log("registerDid1")
      const txn = await contract.updateDoc(_id,_info,_publicHash,_endpoint,_controller);
      const reciept = await txn.wait();
      console.log(txn);
      console.log(reciept);
    }
    catch { err => { console.error(err) } }
  }



  //Pre-Sale functions

  export async function PreSaleInfo(web3modalRef) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      const txn = await contract.preSaleInfo();
    //   const reciept = await txn.wait();
      console.log(txn);
    }
    catch { err => { console.error(err) } }
  }


  export async function purchaseTokensDuringPreSale(web3modalRef,_amount) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      const txn = await contract.purchaseTokensDuringPreSale(_amount);
      const reciept = await txn.wait();
      console.log(txn);
      console.log(reciept);
    }
    catch { err => { console.error(err) } }
  }

  export async function claimVesting(web3modalRef) {
    try {
      const signer = await getProviderOrSigner(true,web3modalRef);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, abi, signer);
      console.log("registerDid1")
      const txn = await contract.claimVesting();
      const reciept = await txn.wait();
      console.log(txn);
      console.log(reciept);
    }
    catch { err => { console.error(err) } }
  }