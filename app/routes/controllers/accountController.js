import * as accountService from "../../services/accountService.js";

const addAccount = async ({ request, response, state }) => {
  if (await state.session.get("authenticated")) {
    const user = await state.session.get("user");

    const body = request.body();
    const params = await body.value;

    const name = params.get("name");

    await accountService.addAccount(name, user.id);
    response.redirect("/accounts");
  } else {
    response.status = 401;
  }
};

const listAccounts = async ({ render, response, state }) => {
  if (await state.session.get("authenticated")) {
    const user = await state.session.get("user");
    const res = await accountService.findAccountsForUser(user.id);

    let accounts = [];
    if (res) {
      accounts = res.rows;
    }
    render("accounts.eta", { accounts: accounts });
  } else {
    response.status = 401;
  }
};

const showAccount = async ({ params, render, response, state }) => {
  const user = await state.session.get("user");

  const res = await accountService.findAccountForUser(params.id, user.id);
  if (res.rows.length === 0) {
    response.status = 401;
  } else {
    render("account.eta", res.rows[0]);
  }
};

const deposit = async({params, response, state, request}) => {
    const user = await state.session.get("user");
    const body = request.body(),
        reqParams = await body.value,
        amount = reqParams.get("amount"),
        accoutsRep = await accountService.findAccountsForUser(user.id),
        userAccounts = accoutsRep.rows.map(account => account.id),
        isUserAccount = userAccounts.includes(Number(params.id));

    if(!!user && isUserAccount){
       
      await accountService.deposit(amount, params.id, user.id);
      response.redirect("/accounts");
    
    }else{
        response.status = 401;
    }

}

const withdraw = async({params, response, state, request}) => {
    const user = await state.session.get("user");
    const body = request.body(),
        reqParams = await body.value,
        amount = reqParams.get("amount"),
        accoutsRep = await accountService.findAccountsForUser(user.id),
        userAccounts = accoutsRep.rows.map(account => account.id),
        isUserAccount = userAccounts.includes(Number(params.id));

    if(!!user && isUserAccount){
       
      await accountService.withdraw(amount, params.id, user.id);
      response.redirect("/accounts");
    
    }else{
        response.status = 401;
    }
}
export { addAccount, listAccounts, showAccount, deposit, withdraw };
