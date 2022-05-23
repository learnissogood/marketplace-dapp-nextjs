import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
const Transaction = ({ item }) => {

  const styles = {
    container: ` w-[45%] flex flex-col border-[#d6d7d9] border-2 rounded-lg shadow-lg`,
    top: `flex w-full h-[80px] bg-[#f0f1f3] p-[20px] pr-[80px] gap-[80px]`,
    topHeaderText1: `text-left flex items-center`,
    topHeaderText2: `text-righ flex items-center ml-[100px]`,
    content: `flex flex-col w-full h-[400px] gap-[20px] p-[20px] flex-1`,
    date: `text-xl font-bold`,
    item: `flex flex-row gap-[20px] w-full`,
    nameContainer: `flex flex-col justify-end`,
    itemName: `text-mg font-bold flex ml-[10px]`,
    buyAgainBtn: `bg-[#ffd713] font-bold rounded-full p-[10px] h-[40px] w-[150px] cursor-pointer text-[#3a2802] text-center mb-[5px] mt-[10px]`,
    etherscanBtn: `font-bold rounded-full h-[40px] w-[120px] cursor-pointer text-[#3a2802] text-center border-2 border-[#ffd713] flex justify-center items-center`,
  };

  return (
    <>
      {item.map((asset, index) => {
        return (
          <div className={styles.container} key={index}>
            <div className={styles.top}>
              <div className='flex w-full gap-[80px]'>
                <div className={styles.topHeaderText1}>
                  {moment(asset.purchaseDate).format('MMMM Do YYYY')}
                </div>
                <div className={styles.topHeaderText2}>
                  {asset.price} AC
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.date}>
                Bought on {moment(asset.purchaseDate).format('MMMM Do')}
              </div>
              <Image
                  className='object-cover'
                  src={asset.source}
                  alt='item'
                  height={300}
                  width={100}
                />
              <div className={styles.item}>
                <div className={styles.nameContainer}>
                  <div className={styles.itemName}>{asset.name}</div>
                  <div className='flex flex-row items-center justify-center gap-4'>
                    <div className={styles.buyAgainBtn}>Buy it Again</div>
                    <Link href={`${asset.etherscanLink}`}>
                      <a target='_blank' rel='noopener'>
                        <div className={styles.etherscanBtn}>Etherscan</div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Transaction