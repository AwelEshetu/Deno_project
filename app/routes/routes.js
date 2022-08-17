import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as accountController from "./controllers/accountController.js";
import * as authenticationController from "./controllers/authenticationController.js";
import * as mainController from "./controllers/mainController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", authenticationController.showRegistrationForm);
router.post("/auth/register", authenticationController.postRegistrationForm);
router.get("/auth/login", authenticationController.showLoginForm);
router.post("/auth/login", authenticationController.postLoginForm);

router.get("/accounts", accountController.listAccounts);
router.post("/accounts", accountController.addAccount);

router.get("/accounts/:id", accountController.showAccount);
router.post("/accounts/:id/deposit", accountController.deposit);
router.post("/accounts/:id/withdraw", accountController.withdraw);
export { router };
