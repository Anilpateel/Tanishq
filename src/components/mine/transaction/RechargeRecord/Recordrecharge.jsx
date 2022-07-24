import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Record.css";
import Record from "../Record";
const Recordrecharge = ({ searchdata}) => {
  const [recharge, setrecharge] = useState("");
  axios.defaults.headers.get["Authorization"] = `Bearer ${localStorage.getItem(
    "tokenauth"
  )}`;

  console.log("search data", searchdata);
  const getrecharge = async () => {
    const response = await axios.get(
      "https://www.admin.mtgrooups.in/api/transaction-history?status=1"
    );

    if (response.data.status === true) {
      setrecharge(response.data.data);
    }

    console.log("recharge data", response.data.data);
  };

  useEffect(() => {
    getrecharge();
  }, []);
 

  return (
    <>
      {!searchdata && (
        <>
          {recharge &&
            recharge.map((item) => {
              return (
                <Record
                  type={item.type}
                  amount={item.amount}
                  status={item.status}
                  date={item.created_at}
                />
              );
            })}

          {!recharge && (
            <>
              <div className="not-found-div">
                <h2>Record Not Found</h2>
              </div>
            </>
          )}
        </>
      )}
      {searchdata&&<>
       {searchdata.map((item) => {
              return (
                <Record
                  type={item.type}
                  amount={item.amount}
                  status={item.status}
                  date={item.created_at}
                />
              );
            })}
        </>}
    </>
  );
};

export default Recordrecharge;
