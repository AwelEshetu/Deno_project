const countMiddleware = async ({ cookies }, next) => {
    let count = await cookies.get("count");
    if (!count) {
      count = 1;
    }
  
    await cookies.set("count", Number(count) + 1);
  
    await next();
  };