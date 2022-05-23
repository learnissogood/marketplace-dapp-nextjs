import React, { useContext } from 'react';
import { AmazonContext } from '../context/AmazonContext';
import Sidebar from "../components/Sidebar";
import HeaderComponent from '../components/Header';
import { Layout } from 'antd';
import Featured from '../components/Featured';
import Cards from '../components/Cards';

export default function Home() {

  const { recentTransaction } = useContext(AmazonContext);

  const styles = {
    siderColor: `bg-gradient-to-l from-[#0d141c] to-[#42667e]`,
    recentTitle: `text-2xl font-bold text-center mb-[20px] text-center mt-[40px]`,
    recentTransactionsList: `flex`,
    transactionCard: `flex mb-[20px] p-[30px] bg-[#42667e] text-white rounded-xl shadow-xl font-bold gap-[20px] text-xl`,
  }

  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={325}
        className={styles.siderColor}
      >
        <Sidebar />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 320,
        }}
      >
        <Header>
          <HeaderComponent />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <Featured />
          <Cards />
          {recentTransaction.length > 0 && (
            <h1 className={styles.recentTitle}> Recent Transaction </h1>
          )}
          {recentTransaction && recentTransaction.map((transaction, index) => {
            return (
              <div className={styles.recentTransactionsList && styles.transactionCard} key={index}>
                <div>
                  <p> From:{transaction.attributes.from_address}</p>
                  <p> To:{transaction.attributes.to_address} </p>
                </div>
                <div className='ml-[300px]'>
                  <p>
                    Hash:{' '}
                    <a target={'_blank'} rel={'noopener noreferrer'} href={`https://mumbai.polygonscan.com/tx/${transaction.attributes.hash}`}>
                      {transaction.attributes.hash.slice(0, 10)}
                    </a>
                  </p>
                  <p> Gas:{transaction.attributes.gas} </p>
                </div>
              </div>
            )
          })}
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Made by Juanchi
          </Footer>
        </Content>
      </Layout>
    </Layout>
  )
}
