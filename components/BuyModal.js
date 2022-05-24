import React, { useContext, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { AmazonContext } from '../context/AmazonContext';
import { HashLoader } from 'react-spinners';
import Link from 'next/link';

const BuyModal = () => {

    const { amountDue, setAmountDue, tokenAmount, setTokenAmount, isLoading, setIsLoading, etherscanLink, setEtherscanLink, buyTokens } = useContext(AmazonContext);

    const styles = {
        container: `h-full w-full flex flex-col `,
        closeX: `w-full h-[50px] flex items-center justify-end mb-[20px]`,
        title: `text-3xl font-bold flex flex-1 items-center mt-[20px] justify-center mb-[40px] text-black`,
        content: `flex w-full mb-[30px] text-xl justify-center`,
        input: `w-[50%] h-[50px] bg-[#f7f6f2] rounded-lg p-[10px] flex mx-auto`,
        inputBox: `w-full h-full flex items-center justify-center bg-[#f7f6f2] focus:outline-none`,
        price: `w-full h-full flex justify-center items-center mt-[20px] font-bold text-3xl text-black`,
        buyBtn: `w-[20%] h-[50px] bg-[#000] mt-[40px] rounded-lg p-[10px] flex mx-auto text-white justify-center items-center cursor-pointer`,
        loaderContainer: `w-full h-[500px] flex items-center justify-center`,
        loader: `w-full h-full flex items-center justify-center`,
        etherscan: `w-full h-full flex items-center justify-center text-green-500 text-2xl mt-[20px] font-bold cursor-pointer pb-[30px]`,
        success: `w-full h-full flex items-center justify-center text-xl mt-[20px] font-bolder`,
        space: `mt-[40px]`
    };

    const calculatePrice = () => {
        const price = (parseFloat(tokenAmount * 0.0001)).toFixed(4);
        setAmountDue(price);
    };

    useEffect(() => {
        calculatePrice();
    }, [tokenAmount]);

    return (
        <div className={styles.container}>
            {isLoading ? (
                <>
                    <div className={styles.loaderContainer}>
                        <HashLoader size={80} />
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.title}>
                        Buy More MarketPlace Coins Here!
                    </div>
                    <div className={styles.content}>
                        Select How Many Tokens Would You Like To Buy!
                    </div>
                    <div className={styles.input}>
                        <input
                            type='text'
                            placeholder='Amount...'
                            className={styles.inputBox}
                            onChange={e => setTokenAmount(e.target.value)}
                            value={tokenAmount}
                        />
                    </div>
                    <div className={styles.price}>
                        Total Due: {''}
                        {tokenAmount && tokenAmount > 0 ? amountDue + 'MATIC' : '0 MATIC'}
                    </div>
                    <button
                        className={styles.buyBtn}
                        disabled={!tokenAmount || tokenAmount < 0}
                        onClick={() => {
                            setIsLoading(true)
                            buyTokens()
                        }}
                    >
                        Buy
                    </button>
                    <div className={styles.space}></div>
                    {etherscanLink && (
                        <>
                            <div className={styles.success}>
                                Transaction Succesful! Check out your receipt for your trasaction down below!
                            </div>
                            <Link href={`${etherscanLink}`} className={styles.etherscan}>
                                <a className={styles.etherscan} target='_blank'>
                                    Transaction Receipt
                                </a>
                            </Link>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default BuyModal