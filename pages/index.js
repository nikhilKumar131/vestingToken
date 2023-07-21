// pages/index.js
import Head from 'next/head';
import { PreSaleInfo, balance, purchaseTokensDuringPreSale, claimVesting , getProviderOrSigner} from "../components/metamaskFunctions"
import { useRef, useState, useEffect } from 'react';
import web3modal from "web3modal";

export default function Home() {

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }));
        // console.log(name, ":", value)
    };

    const [walletStatus, setWalletStatus] = useState(false);
    const [buy1, setBuy1] = useState(0);
    const [balanceState, setBalanceState] = useState(0);
    let web3modalRef = useRef();



    useEffect(() => {


        if (walletStatus == false) {
            web3modalRef.current = new web3modal({
                network: "goerli",
                providerOptions: {},
                disableInjectedProvider: false,
            });

            getProviderOrSigner(false, web3modalRef);

        }
        try {     balance(web3modalRef,setBalanceState);
        } catch { err => { console.error(err) } }


    }, [walletStatus])



    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>My Blockchain DApp</title>
                <meta name="description" content="Your description here" />
            </Head>

            <header className="bg-blue-500 py-4">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-white text-center">Welcome to My Blockchain DApp</h1>
                </div>
            </header>

            <main className="container mx-auto py-8">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4">Pre-Sale</h1>
                    <p className="text-lg">Learn all about our exciting Pre-Sale and its features:(refresh to connect with METAMASK, disable any other wallet)</p>
                    <p className='font-semibold'>CHECK CONSOLE TO TRACK TRANSACTIONS( SEPOLAI TEST NETWORK)</p>
                    <div className="mt-4">
                        <a className="text-blue-600 underline" href="https://github.com/nikhilKumar131/vestingToken/blob/main/contract/contract.sol" target="_blank" rel="noopener noreferrer">Link to the Smart Contract</a>
                    </div>
                    <div className="mt-2">
                        <a className="text-blue-600 underline" href="https://drive.google.com/file/d/1HUV3I7Hfvic9ldBgbhXSkhVbRzeaiI3L/view?usp=sharing" target="_blank" rel="noopener noreferrer">Link to the Explanation Video</a>
                    </div>
                    <div className="mt-8">
                        <p className="font-semibold">Pre-Sale with Vesting and Whitelisting</p>
                        <p>Our Pre-Sale includes unique features like Vesting and Whitelisting to enhance your token purchase experience.</p>
                    </div>
                    <div className="mt-4">
                        <p className="font-semibold">Whitelisting:</p>
                        <p>Get Whitelisted for future sales by purchasing 1000 tokens in a single Pre-Sale transaction.</p>
                    </div>
                    <div className="mt-4">
                        <p className="font-semibold">Vesting:</p>
                        <p>During Pre-Sale, your purchased tokens will be vested, and you can start claiming them after the cliff period of 10 seconds ends. At the end of the vesting duration, you can claim all your tokens.</p>
                        <p>For this testing token, the vesting period is set to just 30 seconds, and tokens can be claimed every 10 secnods cycle.</p>
                    </div>
                </div>
                <p className="font-semibold">FUNCTIONS:</p>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <a className="block bg-white border border-gray-300 rounded-lg shadow p-4 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
                        <h2 className="text-xl font-bold mb-2">Buy(In Sale)</h2>
                        <p className="text-gray-600">Buy your pre-sale Token here, completely vested after 30 seconds, with three cycles each of 10 seconds</p>

                        {/* Input fields */}
                        <input
                            type="text"
                            onChange={ (e) => {setBuy1(e.target.value)}}
                            className="block w-full border rounded-lg shadow-sm mt-4 p-2 text-black"
                            placeholder="wei"
                        />
                        <p
                            type="text"
                            className="block w-full border rounded-lg shadow-sm mt-2 p-2 "
                            placeholder="token">
                                Tokens: {buy1}
                        </p>

                        {/* Button */}
                        <button
                            className="bg-blue-500 text-white rounded-lg mt-4 p-2 w-full hover:bg-blue-600 transition duration-300 ease-in-out"
                            onClick={() => {purchaseTokensDuringPreSale(web3modalRef,buy1)}}
                        >
                            Submit
                        </button>
                    </a>

                    {/* Add more links/buttons for other functionalities */}

                    <a className="block bg-white border border-gray-300 rounded-lg shadow p-4 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
                        <h2 className="text-xl font-bold mb-2">ClaimVesting</h2>
                        <p className="text-gray-600">This function claims the amount that has been vested</p>


                        {/* Button */}
                        <button
                            className="bg-blue-500 text-white rounded-lg mt-4 p-2 w-full hover:bg-blue-600 transition duration-300 ease-in-out"
                            onClick={() => {claimVesting(web3modalRef)}}
                        >
                            Submit
                        </button>
                    </a>

                    <a className="block bg-white border border-gray-300 rounded-lg shadow p-4 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
                        <h2 className="text-xl font-bold mb-2">Balance</h2>
                        <p className="text-gray-600">Check your token Balance</p>

                        <p className="text-gray-600">{balanceState}</p>
                        {/* Button */}
                        <button
                            className="bg-blue-500 text-white rounded-lg mt-4 p-2 w-full hover:bg-blue-600 transition duration-300 ease-in-out"
                            onClick={() => {balance(web3modalRef,setBalanceState)}}
                        >
                            Submit
                        </button>
                    </a>
                </div>
            </main>

            <footer className="bg-gray-200 py-4">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600">&copy; {new Date().getFullYear()} My Blockchain DApp. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
