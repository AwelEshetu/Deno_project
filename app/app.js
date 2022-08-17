import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v3.5.1/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
app.use(errorMiddleware);

const session = new Session();
app.use(session.initMiddleware());

app.use(renderMiddleware);

app.use(router.routes());
let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

app.listen({ port: port });
