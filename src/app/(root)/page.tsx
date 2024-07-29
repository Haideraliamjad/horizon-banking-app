import React from "react";
import { HeaderBox } from "../../../components/HeaderBox";
import { TotalBalancebox } from "../../../components/TotalBalancebox";
import RightSideBar from "../../../components/RightSideBar";
import { getLoggedInUser } from "../../../lib/actions/user.actions";
import { getAccounts, getAccount } from "../../../lib/actions/bank.actions";
import RecentTransactions from "../../../components/RecentTransactions";
const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });
  if (!accounts) return;
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });
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
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
        />
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
