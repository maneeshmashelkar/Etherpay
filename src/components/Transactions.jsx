import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress.js";
import useFetch from "../hooks/useFetch";
import { formatDate } from "../utils/formatDate";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// import "swiper/swiper.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/components/navigation/navigation.scss";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const giftUrl = useFetch({ keyword });

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px]
     sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={giftUrl || url}
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
        />

        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{formatDate(timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions, getAllTransactions } =
    useContext(TransactionContext);

  useEffect(() => {
    getAllTransactions();
  }, [currentAccount]);

  // return (
  //   <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
  //     <div className="flex flex-col md:p-12 py-12 px-4">
  //       {currentAccount ? (
  //         <div>
  //           <h3 className="text-white text-3xl text-center my-2">
  //             Latest Transactions
  //           </h3>

  //           <div className="flex flex-wrap justify-center items-center mt-10">
  //             {[...transactions].reverse().map((transaction, i) => {
  //               return <TransactionCard key={i} {...transaction} />;
  //             })}
  //           </div>
  //         </div>
  //       ) : (
  //         <h3 className="text-white text-3xl text-center my-2">
  //           Connect your account to see the Latest Transactions
  //         </h3>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div>
      {currentAccount ? (
        <div className="flex flex-row md:p-12 py-12 px-4 w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        </div>
      ) : (
        <div className="flex flex-row md:p-12 py-12 px-4 w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the Latest Transactions
          </h3>
        </div>
        // <h3 className="flex flex-row md:p-12 py-12 px-4 w-full justify-center items-center 2xl:px-20 gradient-bg-transactions text-white text-3xl text-center my-2">
        //   Connect your account to see the Latest Transactions
        // </h3>
      )}
      {currentAccount ? (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-footer">
          <Swiper
            breakpoints={{
              320: { slidesPerView: 1 },
              500: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              // 1440: { slidesPerView: 4 },
            }}
            modules={[Navigation]}
            // spaceBetween={50}
            // slidesPerView={3}
            navigation
          >
            <div className="flex flex-col md:p-12 py-12 px-4">
              {currentAccount ? (
                <div className="flex flex-wrap justify-center items-center mt-10">
                  {[...transactions].reverse().map((transaction, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <TransactionCard {...transaction} />
                      </SwiperSlide>

                      // <TransactionCard key={i} {...transaction} />
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </Swiper>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Transactions;
