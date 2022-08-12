import * as workEntryService from "../services/workEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createWorkEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await workEntryService.createWorkEntry(urlParts[2]);

  return requestUtils.redirectTo(`/tasks/${urlParts[2]}`);
};

const finishWorkEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await workEntryService.finishWorkEntry(urlParts[4]);

  return requestUtils.redirectTo(`/tasks/${urlParts[2]}`);
};

export { createWorkEntry, finishWorkEntry };