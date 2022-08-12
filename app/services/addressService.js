import { executeQuery } from "../database/database.js";

const create = async (name, address) => {
  await executeQuery(
    "INSERT INTO addresses (name, address) VALUES ($name, $address);",
    { name: name, address: address }
  );
};

const deleteById = async (id) => {
  await executeQuery("DELETE FROM addresses WHERE id = $id;", {
    id: id,
  });
};

const findAll = async () => {
  let result = await executeQuery("SELECT * FROM addresses;");
  return result.rows;
};

const findByNameOrAddressLike = async (nameOrAddress) => {
  const likePart = `%${nameOrAddress}%`;

  let result = await executeQuery(
    "SELECT * FROM addresses WHERE name ILIKE $nameLike OR address ILIKE $addressLike;",
    { nameLike: likePart, addressLike: likePart }
  );

  return result.rows;
};

export { create, deleteById, findAll, findByNameOrAddressLike };