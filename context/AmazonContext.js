import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { marketPlaceCoinAbi, marketplaceCoinAddress } from "../lib/constants";
import { ethers } from 'ethers';

export const AmazonContext = createContext();

export const AmazonProvider = ({children}) => {

    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');
    const [assets, setAssets] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');
    const [amountDue, setAmountDue] = useState('');
    const [etherscanLink, setEtherscanLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState('');

    const { authenticate, isAuthenticated, enableWeb3, Moralis, user, isWeb3Enabled } = useMoralis();
    // const {
    //     data: assetsData,
    //     error: assetsDataError,
    //     isLoading: assetsDataIsLoading,
    // } = useMoralisQuery('assets');

    useEffect(() => {
        async function fetchNickName () {
            await getBalance();
            const currentUserName = await user?.get('nickName');
            setUserName(currentUserName);
            const account = await user?.get('ethAddress');
            setCurrentAccount(account);
        }
        if (isAuthenticated) {
            fetchNickName();
        }
    }, [isAuthenticated, user, userName, currentAccount]);

    useEffect(() => {
        ;(async() => {
            if (isWeb3Enabled) {
                await getAssets();
            }
        })()
    }, [isWeb3Enabled]);

    const getBalance = async () => {
        try {
            if (!isAuthenticated || !currentAccount) return

            const options = {
                contractAddress: marketplaceCoinAddress,
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
        } catch (error) {
            console.log(error)
        }
    };

    const buyTokens = async () => {
        if (!isAuthenticated) {
            await authenticate();
        }

        const amount = ethers.BigNumber.from(tokenAmount);
        const price = ethers.BigNumber.from('100000000000000');
        const calcPrice = amount.mul(price);

        const options = {
            contractAddress: marketplaceCoinAddress,
            functionName: 'mint',
            abi: marketPlaceCoinAbi,
            msgValue: calcPrice,
            params: {
                amount,
            },
        }

        const transaction = await Moralis.executeFunction(options);
        const receipt = await transaction.wait(4);
        setIsLoading(false);
        console.log(receipt);
        setEtherscanLink(`https://mumbai.polygonscan.com/tx${receipt.transactionHash}`);
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
            // await enableWeb3();
            const query = new Moralis.Query('assets');
            const result = await query.find();
            setAssets(result);
        } catch (error) {
            console.log(error)
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
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}
