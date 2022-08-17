import { executeQuery } from "../database/database.js";

const create = async (sender, message) => {
  await executeQuery(
    "INSERT INTO messages (sender, message) VALUES ($sender, $message);",
    { sender: sender, message: message }
  );
};

const deleteById = async (id) => {
  await executeQuery("DELETE FROM messages WHERE id = $id;", {
    id: id,
  });
};

const findAll = async () => {
  let result = await executeQuery("SELECT * FROM messages;");
  return result.rows;
};

const findLastFive = async () => {
    let result = await executeQuery("SELECT * FROM messages ORDER BY id DESC LIMIT 5;");
    return result.rows
}

export { create, deleteById, findAll, findLastFive };