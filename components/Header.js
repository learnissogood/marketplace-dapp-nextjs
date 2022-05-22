import React, { useContext, useState } from 'react';
import { AmazonContext } from '../context/AmazonContext';
import BuyModal from './BuyModal';
import { CgMenuGridO } from 'react-icons/cg';
import { IoMdSearch } from 'react-icons/io';
import { FaCoins } from 'react-icons/fa';
import { Modal } from 'web3uikit';
import 'react-simple-hook-modal/dist/styles.css';

const Header = () => {

    const styles = {
        container: `h-[60px] w-full flex items-center gap-5 px-16 bg-gradient-to-l to-[#0d141c] from-[#42667e]`,
        logo: `flex items-center ml-[5px] cursor-pointer flex-1`,
        search: `p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border border-white`,
        searchInput: `bg-transparent focus:outline-none border-none flex-1 items-center flex`,
        menu: `flex items-center gap-6 text-white`,
        menuItem: `flex items-center text-md font-bold cursor-pointer`,
        coins: `ml-[10px]`,
        name: `text-white font-bold pr-10`
    };

    const { balance } = useContext(AmazonContext);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <h1 className={styles.name}> MARKETPLACE </h1>
            </div>
            <div className={styles.search}>
                <input
                    type='text'
                    placeholder='Search Your Assets...'
                    className={styles.searchInput}
                />
                <IoMdSearch fontSize={20} />
            </div>
            <div className={styles.menu}>
                <div className={styles.menuItem}>New Releases</div>
                <div className={styles.menuItem}>Featured</div>
                {balance ? (
                    <div
                        className={(styles.balance, styles.menuItem)}
                    >
                        {balance}
                        <FaCoins className={styles.coins} onClick={() => setIsVisible(true)} />
                        <Modal 
                            onCloseButtonPressed={() => setIsVisible(false)}
                            hasFooter={false}
                            isVisible={isVisible}
                        >
                            <BuyModal />
                        </Modal>
                    </div>
                ) : (
                    <div
                        className={(styles.balance, styles.menuItem)}
                    >
                        0 MPT <FaCoins className={styles.coins} onClick={() => setIsVisible(true)} />
                        <Modal
                            onCloseButtonPressed={() => setIsVisible(false)}
                            hasFooter={false}
                            isVisible={isVisible}
                        >
                            <BuyModal />
                        </Modal>
                    </div>
                )}
                <CgMenuGridO fontSize={30} className={styles.menuItem} />
            </div>
        </div>
    )
}

export default Header