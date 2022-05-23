import React, { useContext } from 'react';
import { AmazonContext } from '../context/AmazonContext';
import Image from 'next/image';
import { ConnectButton } from 'web3uikit';
import Link from 'next/link';
import { FaBox } from 'react-icons/fa';
import { BsFillBookmarkFill, BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineHistory } from 'react-icons/ai';

const Sidebar = () => {

    const { isAuthenticated, nickName, userName, setNickName, handleSetUserName } = useContext(AmazonContext);

    const styles = {
        container: `h-full w-[300px] flex flex-col bg-[#fff] static`,
        profile: `w-full py-16 flex flex-col justify-center items-center bg-gradient-to-l from-[#0d141c] to-[#42667e] mt-[40px] mb-[50px]`,
        profilePicContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5`,
        profilePic: `rounded-3xl object-cover`,
        welcome: ` text-md mb-2 font-bold text-2xl text-white text-center`,
        walletAddress: `text-xl flex w-full justify-center font-extrabold mb-4`,
        menu: `flex flex-col w-full h-full px-10 gap-10`,
        menuItem: `flex items-center text-lg font-bold cursor-pointer gap-2 text-white`,
        amazonLogo: `mr-4 flex object-cover`,
        companyName: `text-lg font-bold flex flex-1 pl-10 items-center mt-[20px]`,
        usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white`,
        username: `flex items-center w-full justify-center`,
        setNickname: `text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white`,
        title: `flex items-center text-xl font-bold cursor-pointer gap-2 text-white mt-[35px]`,
    }

    return (
        <div className={styles.container && styles.profile}>
            <div>
                {isAuthenticated && (
                    <>
                        <div className={styles.profilePicContainer}>
                            <Image
                                src={`https://avatars.dicebear.com/api/pixel-art/${userName}.svg`}
                                alt='profile'
                                className={styles.profilePic}
                                height={100}
                                width={100}
                            />
                        </div>
                        {!userName ? (
                            <>
                                <div className={styles.username}>
                                    <input
                                        type="text"
                                        placeholder="Username..."
                                        className={styles.usernameInput}
                                        value={nickName}
                                        onChange={e => setNickName(e.target.value)}
                                    />
                                </div>
                                <button
                                    className={styles.setNickname}
                                    onClick={handleSetUserName}
                                >
                                    Set Nickname
                                </button>
                            </>
                        ) : (
                            <div>
                                <div className={styles.welcome}>
                                    {userName}
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div className={styles.connectButton}>
                    <ConnectButton />
                </div>
            </div>
            <div className={styles.menu}>
                <Link href='/'>
                    <div className={styles.title}>
                        MarketPlace Board
                    </div>
                </Link>
                <div className={styles.menuItem}>
                    <FaBox />
                    Collections
                </div>
                <div className={styles.menuItem}>
                    <BsFillBookmarkFill />
                    Saved
                </div>
                <div className={styles.menuItem}>
                    <BsFillPersonFill />
                    Saved
                </div>
                <Link href='/history'>
                    <div className={styles.menuItem}>
                        <AiOutlineHistory />
                        Transaction History
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;