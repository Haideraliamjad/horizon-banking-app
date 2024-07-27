import React from "react";
import { HeaderBox } from "../../../components/HeaderBox";
import { TotalBalancebox } from "../../../components/TotalBalancebox";
import RightSideBar from "../../../components/RightSideBar";
import { getLoggedInUser } from "../../../lib/actions/user.actions";
import { getAccounts, getAccount } from "../../../lib/actions/bank.actions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });
  console.log(accounts);
  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  console.log("Account Info", account);
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
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        RECENT_TRANSECTIONS
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
