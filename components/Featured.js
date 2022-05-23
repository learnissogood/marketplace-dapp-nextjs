import React from 'react';

const Featured = () => {

  const styles = {
    container: `h-full w-full flex p-[40px] flex-col bg-[#908d94] rounded-xl`,
    title: `text-3xl font-bolder mb-[20px] mb-24 ml-[40px] text-center text-white`,
    cards: `h-full w-full flex gap-[100px] justify-between ml-[30px]`,
    card1: `h-[130px] w-[400px] p-[20px] rounded-3xl bg-gradient-to-r from-[#424b52] to-[#908d94]  border-2 border-black`,
    card2: `h-[130px] w-[400px] p-[20px] rounded-3xl bg-gradient-to-r from-[#424b52] to-[#908d94]  border-2 border-black`,
    card3: `h-[130px] w-[400px] p-[20px] rounded-3xl bg-gradient-to-r from-[#424b52] to-[#908d94]  border-2 border-black`,
    card4: `h-[130px] w-[400px] p-[20px] rounded-3xl bg-gradient-to-r from-[#424b52] to-[#908d94]  border-2 border-black`,
    cardCross: `h-[180px] w-[125px] rounded-3xl left-[20px] flex overflow-hidden mt-[-100px]`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Top Assets</div>
      <div className={styles.cards}>
        <div className={styles.card1}>
          <div className={styles.cardCross}>
            <video autoPlay loop muted controls='' className='object-cover'>
              <source src='https://openseauserdata.com/files/3565db33a856b19f48396062e59e6d62.mp4#t=0.001' />
            </video>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={styles.cardCross}>
            <video autoPlay loop muted controls='' className='object-cover'>
              <source src='https://openseauserdata.com/files/89cba6f1544810aea19d78e664981d63.mp4#t=0.001' />
            </video>
          </div>
        </div>
        <div className={styles.card3}>
          <div className={styles.cardCross}>
            <video autoPlay loop muted controls='' className='object-cover'>
              <source src='https://openseauserdata.com/files/894fd3d49c7c258d202a22bb710a3416.mp4#t=0.001' />
            </video>
          </div>
        </div>
        <div className={styles.card4}>
          <div className={styles.cardCross}>
            <video autoPlay loop muted controls='' className='object-cover'>
              <source src='https://openseauserdata.com/files/022c0aad904ddbd8884b12468aaaad28.mp4#t=0.001' />
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured