const people = [];

const add = (person) => {
  people.push(person);
};

const findAll = () => {
  return people;
};

export { add, findAll };