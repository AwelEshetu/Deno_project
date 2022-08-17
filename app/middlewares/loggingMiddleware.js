const log = async (context, next) => {
    console.log(`Request made to ${context.request.url.pathname}`);
    console.log(`Request to ${context.request.url.pathname} completed`);
  };
  
  export { log };