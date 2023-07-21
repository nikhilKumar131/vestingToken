import Head from 'next/head';
// import Functions from '../components/funtions';
// import abi from '../contract/contractv0.0.1'
import { PreSaleInfo, name, purchaseTokensDuringPreSale, claimVesting } from "../components/metamaskFunctions"
import { useRef, useState, useEffect } from 'react';
import web3modal from "web3modal";
import { ethers } from 'ethers';


export default function Home() {

  const [inputs, setInputs] = useState({
    DidReginfo: '',
    DidRegdata: '',
    DidRegcontroller: '',
    DidUpdowner: '',
    DidUpdinfo: '',
    DidUpddata: '',
    DidUpdcontroller: '',
    DidActowner: '',
    DidGetowner: '',
    DocReginfo: '',
    DocRegpublicHash: '',
    DocRegendPoint: '',
    DocRegcontroller: '',
    DocRegowner: '',
    DocUpdid: '',
    DocUpdinfo: '',
    DocUpdpublicHash: '',
    DocUpdendPoint: '',
    DocUpdcontroller: '',
    DocGetid: '',
    DocGetowner: '',
    DocGetpublisher: '',
    DocGetpublisher: '',
    DidRegid: '',
    DocRegid: '',
    DocUpdid: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
    // console.log(name, ":", value)
  };

  const [walletStatus, setWalletStatus] = useState(false);
  let web3modalRef = useRef();



  useEffect(() => {
    name(web3modalRef);
    PreSaleInfo(web3modalRef);
    purchaseTokensDuringPreSale(web3modalRef,100);
    claimVesting(web3modalRef);

    if (walletStatus == false) {
      web3modalRef.current = new web3modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      getProviderOrSigner(false, web3modalRef);

    }
    try { } catch { err => { console.error(err) } }

  }, [walletStatus])


  return (
    <div>
      <Head>
        <title>Pre Sale</title>
      </Head>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 bg-gray-100 p-4">
          <h1 className="text-4xl font-bold mb-4">Pre Sale</h1>
          <p className="text-lg">All the features it have and how it works:</p>
          <p><a className="text-blue-600" href="https://example.com" target="_blank">Link</a> to the smart contract</p>
          <p><a className="text-blue-600" href="https://example.com" target="_blank">Link</a> to explaination video</p>
          <p>This is a pre sale with <a className='font-bold'>vesting and whitelisting</a></p>
          <p><a className='font-bold'>WhiteList:</a> BUY 1000 tokens in one go in pre-sale, to get whitelisted in future sales</p>
          <p><a className='font-bold'>Vestation:</a> When you buy tokens in pre-sale, they get vested, and you can start receiving them after cliff period, and claim all tokens when entire duriation of vesting ends</p>
          <p>This is testing token, So vestation period is really small <a className='font-bold'>3 minutes</a></p>
          <p>Tokens can be claimed after cycle of <a className='font-bold'>1 minute</a></p>
          {/* Add your functions or content for the left section */}
          <div className='space-y-3'>

            <h2>Register:</h2>
            <div className='space-x-1 space-y-1'>
              <input type="text" name="DidRegid" value={inputs.name} placeholder='id' onChange={handleChange} />
              <input type="text" name="DidReginfo" value={inputs.name} placeholder='info' onChange={handleChange} />
              <input type="text" name="DidRegdata" value={inputs.name} placeholder='data' onChange={handleChange} />
              <input type="text" name="DidRegcontroller" value={inputs.name} placeholder='controller' onChange={handleChange} />
            </div>
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => registerDID(web3modalRef, inputs.DidRegid, inputs.DidRegdata, inputs.DidReginfo, inputs.DidRegcontroller)}><a className='mx-4 my-2'>Submit</a></button>


            <h2>Update:</h2>
            <div className='space-x-1 space-y-1'>
              <input type="text" name="DidUpdowner" value={inputs.name} placeholder='owner' onChange={handleChange} />
              <input type="text" name="DidUpdinfo" value={inputs.name} placeholder='info' onChange={handleChange} />
              <input type="text" name="DidUpddata" value={inputs.name} placeholder='data' onChange={handleChange} />
              <input type="text" name="DidUpdcontroller" value={inputs.name} placeholder='controller' onChange={handleChange} />
            </div>
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => updateDID(web3modalRef, inputs.DidUpdowner, inputs.DidUpdinfo, inputs.DidUpddata, inputs.DidUpdcontroller)}><a className='mx-4 my-2'>Submit</a></button>

            <h2>Activate/Deactivate:</h2>
            <input type="text" name="DidActowner" value={inputs.name} placeholder='owner' onChange={handleChange} />
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => activateOrDeactivateDID(web3modalRef, inputs.DidActowner)}><a className='mx-4 my-2'>Submit</a></button>

            <h2>GetDID:</h2>
            <input type="text" name="DidGetowner" value={inputs.name} placeholder='owner' onChange={handleChange} />
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => name(web3modalRef, inputs.DidGetowner)}><a className='mx-4 my-2'>Submit</a></button>

          </div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-200 p-4">
          <h1 className="text-4xl font-bold mb-4">DID document functions</h1>
          <p className="text-lg">Use all the functions related to DID Documents</p>
          {/* Add your functions or content for the right section */}
          <div>
            <h2>RegisterDOC:</h2>
            <div className='space-x-1 space-y-1'>
              <input type="text" name="DocRegid" value={inputs.name} placeholder='id' onChange={handleChange} />
              <input type="text" name="DocReginfo" value={inputs.name} placeholder='info' onChange={handleChange} />
              <input type="text" name="DocRegpublicHash" value={inputs.name} placeholder='publicHash' onChange={handleChange} />
              <input type="text" name="DocRegendPoint" value={inputs.name} placeholder='endPoint' onChange={handleChange} />
              <input type="text" name="DocRegcontroller" value={inputs.name} placeholder='controller' onChange={handleChange} />
              <input type="text" name="DocRegowner" value={inputs.name} placeholder='owner' onChange={handleChange} />
            </div>
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => { registerDIDdoc(web3modalRef, inputs.DocRegid, inputs.DocReginfo, inputs.DocRegpublicHash, inputs.DocRegendPoint, inputs.DocRegcontroller, inputs.DocRegowner) }}><a className='mx-4 my-2'>Submit</a></button>
            <h2>UpdateDOC:</h2>
            <div className='space-x-1 space-y-1'>
              <input type="text" name="DocUpdid" value={inputs.name} placeholder='id' onChange={handleChange} />
              <input type="text" name="DocUpdinfo" value={inputs.name} placeholder='info' onChange={handleChange} />
              <input type="text" name="DocUpdpublicHash" value={inputs.name} placeholder='publicHash' onChange={handleChange} />
              <input type="text" name="DocUpdendPoint" value={inputs.name} placeholder='endPoint' onChange={handleChange} />
              <input type="text" name="DocUpdcontroller" value={inputs.name} placeholder='controller' onChange={handleChange} />
            </div>
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => { updateDoc(web3modalRef, inputs.DocUpdid, inputs.DocUpdinfo, inputs.DocUpdpublicHash, inputs.DocUpdendPoint, inputs.DocUpdcontroller) }}><a className='mx-4 my-2'>Submit</a></button>

            <h2>GetDocFromID:</h2>
            <input type="text" name="DocGetid" value={inputs.name} placeholder='id' onChange={handleChange} />
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => { getDocFromId(web3modalRef, inputs.DocGetid) }}><a className='mx-4 my-2'>Submit</a></button>

            <h2>GetDocFromOwner:</h2>
            <input type="text" name="DocGetowner" value={inputs.name} placeholder='owner' onChange={handleChange} />
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => { getDocFromOwner(web3modalRef, inputs.DocGetowner) }}><a className='mx-4 my-2'>Submit</a></button>

            <h2>GetDocFromPublisher:</h2>
            <input type="text" name="DocGetpublisher" value={inputs.name} placeholder='publisher' onChange={handleChange} />
            <button className='rounded-lg bg-slate-400 hover:bg-slate-300' onClick={() => { getDocFromPublisher(web3modalRef, inputs.DocGetpublisher) }}><a className='mx-4 my-2'>Submit</a></button>


          </div>
        </div>
      </div>
      <div className='flex-wrap '>
        <p>This is deployed on seoplai test network</p>
        <p>Refrest to connect with metamask. If not working, disconnect metamask from extension and refesh</p>
        <p>Contract v0.1.5 is used here, but all functions are made public to test them here</p>
        <p className='text-2xl'>Use CONSOLE to see all transactions and all did array and struct returns</p>

      </div>
    </div>
  );
}
