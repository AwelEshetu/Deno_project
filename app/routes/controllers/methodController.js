const get = ({ response }) => {
    response.body = "HTTP GET";
  };
  
  const post = ({ response }) => {
    response.body = "HTTP POST";
  };
  
  const del = ({ response }) => {
    response.body = "HTTP DELETE";
  };
  
  export { del, get, post };