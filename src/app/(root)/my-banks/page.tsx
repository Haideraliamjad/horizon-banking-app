import React from "react";
import { HeaderBox } from "../../../../components/HeaderBox";
import { getLoggedInUser } from "../../../../lib/actions/user.actions";
import { getAccounts } from "../../../../lib/actions/bank.actions";
import BankCard from "../../../../components/BankCard";
const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  console.log("Page", accounts);

  return (
    <section className="flex ">
      <div className="my-banks">
        <HeaderBox
          title="My Banks Accounts"
          subtext="Manage your banking activites"
        />
        <div className="space-y-4">
          <h2 className="header-2">Your Cards</h2>
          <div className="flex flex-wrap flex-6">
            {accounts &&
              accounts.data.map((a: Account) => {
                return (
                  <BankCard
                    key={a.id}
                    accounts={a}
                    userName={loggedIn.firstName}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
