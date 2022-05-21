import React, { useContext } from 'react';
import { AmazonContext } from '../context/AmazonContext';
import Cards from './Cards';
import Header from './Header';
import Featured from './Featured';

const Main = () => {

  const { recentTransaction } = useContext(AmazonContext);

  const styles = {
    container: `h-full w-full flex flex-col mt-[50px] pr-[50px] overflow-hidden`,
    recentTitle: `text-2xl font-bold text-center mb-[20px] text-center mt-[40px]`,
    recentTransactionList: `flex flex-col`,
    transactionCard: `flex justify-between mb-[20px] p-[30px] bg-[#42667e] text-white rounded-xl shadow-xl font-bold gap-[20px] text-xl`,
  };

  return (
    <div className={styles.container}>
      <Header />
      <Featured />
      <Cards />
      {recentTransaction.length > 0 && (
        <h1 className={styles.recentTitle}> Recent Transaction </h1>
      )}
      {recentTransaction && recentTransaction.map((transaction, index) => {
        return (
          <div className={styles.recentTransactionList} key={index}>
            <div className={styles.transactionCard}>
              <p> From:{transaction.attributes.from_address}</p>
              <p> To:{transaction.attributes.to_address}</p>
              <p>
                Hash:{' '}
                <a target={'_blank'} rel={'noopener norefer'} href={`https://mumbai.polygonscan.com/tx/${transaction.attributes.hash}`}>
                  {transaction.attributes.hash.slice(0, 10)}
                </a>
              </p>
              <p> Gas:{transaction.attributes.gas} </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Main