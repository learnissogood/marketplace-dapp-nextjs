import React, { useContext } from 'react';
import { AmazonContext } from '../context/AmazonContext';
import Sidebar from '../components/Sidebar';
import HeaderComponent from '../components/Header';
import { Layout } from 'antd';
import Transaction from '../components/Transaction';

const history = () => {

    const { ownedItems } = useContext(AmazonContext);

    const { Header, Content, Footer, Sider } = Layout;

    const styles = {
        container: `h-full w-full flex bg-[#fff]`,
        main: `w-full h-full flex flex-col mt-[50px]`,
        tableContainer: `w-full h-full flex flex-col p-[100px] justify-center`,
        pageTitle: `text-3xl font-bolder mb-[75px] text-center`,
        transactions: `flex gap-[50px] flex-row flex-wrap`,
        siderColor: `bg-gradient-to-l from-[#0d141c] to-[#42667e]`,
    };

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
          {/* <div className={styles.tableContainer}>
            {ownedItems ? (
                <div className={styles.pageTitle}> Purchase History </div>
            ) : (
                <div className={styles.pageTitle}> No Purchase History </div>
            )}
            <div className={styles.transactions}>
                {ownedItems && ownedItems.map((item, index) => {
                    return <Transaction key={index} item={item} />
                })}
            </div>
          </div> */}
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

export default history