import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as addressService from "../services/addressService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const deleteAddress = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];
  await addressService.deleteById(id);

  return redirectTo("/");
};

const addAddress = async (request) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const address = formData.get("address");

  await addressService.create(name, address);

  return redirectTo("/");
};

const listAddresses = async (request) => {
  const data = {
    addresses: await addressService.findAll(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

export { addAddress, deleteAddress, listAddresses };