import React from "react";
import { HeaderBox } from "../../../components/HeaderBox";
import { TotalBalancebox } from "../../../components/TotalBalancebox";
import RightSideBar from "../../../components/RightSideBar";
import { getLoggedInUser } from "../../../lib/actions/user.actions";
import { redirect } from "next/navigation";

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn.name}
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
