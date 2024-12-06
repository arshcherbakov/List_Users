import { useEffect, useState, useRef } from "react";
import { getUsers } from "./services/users-service";
import "./App.css";

const App = () => {
  const [usersList, setUsersList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [countUser, setCountUser] = useState(0);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (searchInput) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        getUsers(searchInput, page).then((res) => {
          setCountUser(res.total_count);
          setUsersList(res.items);
          console.log(res.items);
        });
      }, 1000);
    }
  }, [searchInput, page]);

  const handlerNextPage = () => {
    countUser > 1 ? setPage(page + 1) : setPage(1);
  };

  const handlerPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="App">
      <input onChange={(e) => setSearchInput(e.target.value)} />
      {usersList.map((user) => (
        <p key={user.id}>{user.login}</p>
      ))}
      <div>
        <p>Всего найдено: {countUser}</p>
        <p>Текущая страница: {page}</p>
        <button onClick={handlerPrevPage}>Назад</button>
        <button onClick={handlerNextPage}>Дальше</button>
      </div>
    </div>
  );
};

export default App;
