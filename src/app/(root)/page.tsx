import React from "react";
import { HeaderBox } from "../../../components/HeaderBox";
import { TotalBalancebox } from "../../../components/TotalBalancebox";
import RightSideBar from "../../../components/RightSideBar";
const Home = () => {
  const loggedIn = {
    firstName: "Haider",
    lastName: "Ali",
    email: "haider.tech.dev@gmail.com",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn.firstName}
            subtext="Access and manage your accounts and transections efficently"
          />
          <TotalBalancebox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT_TRANSECTIONS
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123 }, { currentBalance: 1000 }]}
      />
    </section>
  );
};

export default Home;
