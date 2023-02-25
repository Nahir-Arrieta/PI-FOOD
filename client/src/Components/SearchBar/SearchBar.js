import { useDispatch } from "react-redux";
import { getSearchRecipe } from "../../Redux/actions/index";
import { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerSearch = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(getSearchRecipe(name));
  };

  return (
    <div className="search-button">
      <form className="search-container">
        <input
          type="search"
          placeholder="Search Recipe"
          onChange={handlerSearch}
        ></input>
        <button type="submit" onClick={(event) => handlerSubmit(event)}>
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
