import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from 'react-moralis';

export const AmazonContext = createContext();

export const AmazonProvider = ({children}) => {

    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');
    const [assets, setAssets] = useState([]);

    const { authenticate, isAuthenticated, enableWeb3, Moralis, user, isWeb3Enabled } = useMoralis();
    // const {
    //     data: assetsData,
    //     error: assetsDataError,
    //     isLoading: assetsDataIsLoading,
    // } = useMoralisQuery('assets');

    useEffect(() => {
        async function fetchNickName () {
            const currentUserName = await user?.get('nickName');
            setUserName(currentUserName);
        }
        if (isAuthenticated) {
            fetchNickName();
        }
    }, [isAuthenticated, user, userName]);

    useEffect(() => {
        ;(async() => {
            if (isWeb3Enabled) {
                await getAssets();
            }
        })()
    }, [isWeb3Enabled]);

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
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}
