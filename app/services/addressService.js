import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

const client = new Client();

const create = async (name, address) => {
  await client.connect();
  await client.queryObject(
    "INSERT INTO addresses (name, address) VALUES ($name, $address);",
    { name: name, address: address },
  );
  await client.end();
};

const findAll = async () => {
  await client.connect();
  const result = await client.queryObject("SELECT * FROM addresses;");
  await client.end();

  return result.rows;
};

const findByNameOrAddressLike = async (nameOrAddress) => {
  const likePart = `%${nameOrAddress}%`;

  await client.connect();
  const result = await client.queryObject(
    "SELECT * FROM addresses WHERE name ILIKE $namePart OR address ILIKE $addressPart;",
    { namePart: likePart, addressPart: likePart },
  );
  await client.end();

  return result.rows;
};
const deleteById = async (id) => {
    await client.connect();
    await client.queryObject(
      "DELETE FROM addresses WHERE id = $id;",
      { id: id },
    );
    await client.end();
  };

export { create, findAll, findByNameOrAddressLike, deleteById };