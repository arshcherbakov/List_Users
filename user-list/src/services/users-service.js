const getUsers = (seacrh, page = 1, options) => {
  return fetch(
    `https://api.github.com/search/users?q=${seacrh}&page=${page}`,
    options
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { getUsers };
