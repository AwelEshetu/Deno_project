import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as addressService from "./services/addressService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

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

const handleRequest = async (request) => {
  if (request.method === "POST") {
    return await addAddress(request);
  } else {
    return await listAddresses(request);
  }
};

serve(handleRequest, { port: 7777 });