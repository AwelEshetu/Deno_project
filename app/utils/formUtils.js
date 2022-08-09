const extractPerson = async (request) => {
    const formData = await request.formData();
  
    const person = {
      name: formData.get("name"),
      address: formData.get("address"),
    };
  
    return person;
  };
  
  export { extractPerson };