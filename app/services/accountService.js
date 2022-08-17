import { executeQuery } from "../database/database.js";

const addAccount = async (name, userId) => {
  await executeQuery(
    "INSERT INTO accounts (name, user_id) VALUES ($name, $userId)",
    { name: name, userId: userId },
  );
};

const findAccountsForUser = async (userId) => {
  return await executeQuery(
    "SELECT * FROM accounts WHERE user_id = $userId",
    { userId: userId },
  );
};

const findAccountForUser = async (accountId, userId) => {
  return await executeQuery(
    "SELECT * FROM accounts WHERE id = $accountId AND user_id = $userId",
    { accountId: accountId, userId: userId },
  );
};

const deposit = async(amount, accountId, userId) => {
  const currentBalance = await executeQuery("select balance FROM accounts WHERE id = $accountId AND user_id = $userId",
  { accountId: accountId, userId: userId },
  );
  const newBalance = Number(currentBalance.rows[0].balance) + Number(amount)
  await executeQuery(
    "UPDATE accounts SET balance = $newBalance WHERE id = $accountId AND user_id = $userId",
    { newBalance, accountId: accountId, userId: userId },
  )
}

const withdraw = async(amount, accountId, userId) => {
  const currentBalance = await executeQuery("select balance FROM accounts WHERE id = $accountId AND user_id = $userId",
  { accountId: accountId, userId },
  );
  const newBalance = Number(currentBalance.rows[0].balance) - Number(amount)
  await executeQuery(
    "UPDATE accounts SET balance = $newBalance WHERE id = $accountId AND user_id = $userId",
    { newBalance, accountId, userId },
  )
}
export { addAccount, findAccountForUser, findAccountsForUser, deposit, withdraw };
