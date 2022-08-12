import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import * as workEntryController from "./controllers/workEntryController.js";
import * as taskController from './controllers/taskController.js';
import * as requestUtils from "./utils/requestUtils.js"

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return requestUtils.redirectTo("/tasks");
  } else if (url.pathname === "/tasks" && request.method === "POST") {
    return await taskController.addTask(request);
  } else if (url.pathname === "/tasks" && request.method === "GET") {
    return await taskController.viewTasks(request);
  } else if (url.pathname.match("tasks/[0-9]+") && request.method === "GET") {
    return await taskController.viewTask(request);
  } else if (url.pathname.match("tasks/[0-9]+/entries/[0-9]+") && request.method === "POST") {
    return await workEntryController.finishWorkEntry(request);
  } else if (url.pathname.match("tasks/[0-9]+/entries") && request.method === "POST") {
    return await workEntryController.createWorkEntry(request);
  } else if (url.pathname.match("tasks/[0-9]+") && request.method === "POST") {
    return await taskController.completeTask(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

serve(handleRequest, { port: port });