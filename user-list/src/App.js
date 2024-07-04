import { useEffect, useState } from "react";
import { getUsers } from "./services/users-service";
import "./App.css";

// const searchData = (listData, searchData) => {
//   useEffect(() => {
//     const filterData = listData.filter((data) => {
//       data.includes(searchData);
//     });
//   }, []);

//   return
// };

const App = () => {
  const [usersList, setUersList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   if (searchInput) {
  //     const request = setTimeout(() => {
  //       getUsers(searchInput, page).then((res) => {
  //         setUersList(res.items);
  //         console.log(res);
  //       });
  //     }, 1500);

  //     return clearTimeout(request);
  //   }
  // }, [page]);

  useEffect(() => {
    if (searchInput) {
      const request = setTimeout(() => {
        getUsers(searchInput, page).then((res) => {
          setUersList(res.items);
        });
      }, 1500);

      return () => clearTimeout(request);
    }
  }, [searchInput]);

  const debounce = (callback, interval) => {
    setTimeout(() => {
      callback();
    }, interval);
  };

  const handlerSearchInput = (event) => {};

  const handlerNextPage = () => {
    setPage(page + 1);
  };

  const handlerPrevPage = () => {
    if (page < 0) {
      console.log(page);
      setPage(page - 1);
    }
  };

  return (
    <div className="App">
      <h1>{searchInput}</h1>
      <input onChange={(e) => setSearchInput(e.target.value)} />
      {usersList.map((user) => (
        <p key={user.id}>{user.login}</p>
      ))}
      <h3>{page}</h3>
      <button onClick={handlerNextPage}>Дальше</button>
      <button onClick={handlerPrevPage}>Назад</button>
    </div>
  );
};

export default App;
