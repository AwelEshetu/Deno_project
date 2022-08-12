import { renderFile, configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as taskService from "../services/taskService.js";
import * as workEntryService from "../services/workEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

configure({
    views: `${Deno.cwd()}/views/`,
  });
  
const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addTask = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await taskService.create(name);

  return requestUtils.redirectTo("/tasks");
};

const viewTask = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
  
    const data = {
      task: await taskService.findById(urlParts[2]),
      currentWorkEntry: await workEntryService.findCurrentWorkEntry(urlParts[2]),
      totalTime: await workEntryService.calculateTotalTime(urlParts[2]),
    };
  
    return new Response(await renderFile("task.eta", data), responseDetails);
  };

const viewTasks = async (request) => {
  const data = {
    tasks: await taskService.findAllNonCompletedTasks(),
  };

  return new Response(await renderFile("tasks.eta", data), responseDetails);
};
const completeTask = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await taskService.completeById(urlParts[2]);
  
    return await requestUtils.redirectTo("/tasks");
  };

export { addTask, viewTask, viewTasks, completeTask };