import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { marketPlaceCoinAbi, marketplaceCoinAddress } from "../lib/constants";
import { ethers } from 'ethers';

export const AmazonContext = createContext();

export const AmazonProvider = ({children}) => {

    const CONTRACT_ADDRESS = '0x7c77E3D962f38f2717dc44725c49Fb405CcA57D0';

    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');
    const [assets, setAssets] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');
    const [amountDue, setAmountDue] = useState('');
    const [etherscanLink, setEtherscanLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState('');
    const [recentTransaction, setRecentTransaction] = useState([]);
    const [ownedItems, setOwnedItems] = useState([]);

    const { authenticate, isAuthenticated, enableWeb3, Moralis, user, isWeb3Enabled } = useMoralis();

    const {
        data: userData,
        error: userDataError,
        isLoading: userDataIsLoading,
    } = useMoralisQuery('_User');

    const getBalance = async () => {
        try {
            if (!isAuthenticated || !currentAccount) return

            const options = {
                contractAddress: CONTRACT_ADDRESS,
                functionName: 'balanceOf',
                abi: marketPlaceCoinAbi,
                params: {
                    account: currentAccount
                },
            }

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options);
                setBalance(response.toString());
            }

            // const ethers = Moralis.web3Library;
            // const signer = provider.getSigner();
            // const marketplaceContract = new ethers.Contract(CONTRACT_ADDRESS, marketPlaceCoinAbi, signer);

            // let tx = await marketplaceContract.balanceOf(currentAccount);
            setBalance(tx.toString());

        } catch (error) {
            console.log(error)
        }
    };

    const listenToUpdate = async () => {
        let query = new Moralis.Query('PolygonTransactions');
        let subscription = await query.subscribe();
        subscription.on('update', async object => {
            console.log('New Transaction');
            console.log(object);
            setRecentTransaction([object]);
        })

        // const lastTx = Moralis.Object.extend('PolygonTransactions');
        // const query = new Moralis.Query(lastTx);
        // const result = await query.first();
        // setRecentTransaction([result]);
    };

    useEffect(() => {
        async function fetchNickName () {
            await getBalance();
            await listenToUpdate();
            const currentUserName = await user?.get('nickName');
            setUserName(currentUserName);
            const account = await user?.get('ethAddress');
            setCurrentAccount(account);
        }
        if (isAuthenticated) {
            fetchNickName();
        }
    }, [isAuthenticated, user, userName, currentAccount, getBalance]);

    useEffect(() => {
        ;(async() => {
            if (isWeb3Enabled) {
                await getAssets();
                await getOwnedAssets();
            }
        })()
    }, [isWeb3Enabled]);

    const buyTokens = async () => {
        if (!isAuthenticated) {
            await authenticate();
        }

        const amount = ethers.BigNumber.from(tokenAmount);
        const price = ethers.BigNumber.from('100000000000000');
        const calcPrice = amount.mul(price);

        // const options = {
        //     contractAddress: marketplaceCoinAddress,
        //     functionName: 'mint',
        //     abi: marketPlaceCoinAbi,
        //     msgValue: calcPrice,
        //     params: {
        //         amount,
        //     },
        // }

        // const transaction = await Moralis.executeFunction(options);
        // const receipt = await transaction.wait(4);
        const provider = await Moralis.enableWeb3();
        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(CONTRACT_ADDRESS, marketPlaceCoinAbi, signer);
        let tx = await marketplaceContract.mint(amount, {value: calcPrice, gasLimit: 4000000});
        const receipt = await tx.wait(4);

        setIsLoading(false);
        console.log(receipt);
        setEtherscanLink(`https://mumbai.polygonscan.com/tx/${receipt.transactionHash}`);
    };

    const handleSetUserName = () => {
        if (user) {
            if (nickName) {
                user.set('nickName', nickName);
                user.save()
                setNickName('')
            } else {
                console.log("Can't set empty nickname!");
            }
        } else {
            console.log('No User Found');
        }
    };

    const getAssets = async () => {
        try {
            const query = new Moralis.Query('assets');
            const result = await query.find();
            setAssets(result);
        } catch (error) {
            console.log(error)
        }
    };

    const buyAsset = async (price, asset) => {
        try {
            if (!isAuthenticated) return

            const options = {
                type: 'erc20',
                amount: price,
                receiver: CONTRACT_ADDRESS,
                contractAddress: CONTRACT_ADDRESS
            }

            let tx = await Moralis.transfer(options);
            const receipt = await tx.wait();

            if (receipt) {
                // const query = new Moralis.Query('_User');
                // const result = await query.find();
                
                const res = userData[0].add('ownedAssets', {
                    ...asset,
                    purchaseDate: Date.now(),
                    etherscanLink: `https://mumbai.polygonscan.com/tx/${receipt.transactionHash}`
                })

                await res.save().then(() => {
                    alert("You've succesfully purchased this asset!");
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getOwnedAssets = async () => {
        try {
            const assets = await user?.get('ownedAssets');
            setOwnedItems([assets]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AmazonContext.Provider
            value={{
                isAuthenticated,
                nickName,
                userName,
                setNickName,
                handleSetUserName,
                assets,
                balance,
                setTokenAmount,
                tokenAmount,
                amountDue,
                setAmountDue,
                isLoading,
                setIsLoading,
                setEtherscanLink,
                etherscanLink,
                currentAccount,
                buyTokens,
                buyAsset,
                recentTransaction,
                ownedItems,
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}
