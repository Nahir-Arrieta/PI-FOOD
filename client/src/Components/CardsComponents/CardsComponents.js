import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import { getRecipes } from "../../Redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import Ordering from "../Ordering/Ordering";
import "./CardsComponents.css";
const CardsComponents = () => {
  const dispatch = useDispatch();
  const recipeState = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1); //pagina actual
  const [postsPerPage, setPostsPerPage] = useState(9); // vamos a mostrar nueve card por pagina
  const [order, setOrder] = useState(false);
  const [restart, setRestart] = useState(false);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = recipeState.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    dispatch(getRecipes());
    setPostsPerPage(9);
  }, [dispatch, restart]);

  useEffect(() => {}, [order]);

  return (
    <div>
      <div className="components">
        <div>
          <SearchBar recipeState={recipeState} />
        </div>
        <div className="order-menu">
          {/* <div className="filters-components"> */}
          <Filters setRestart={setRestart} restart={restart} />
          {/* </div> */}
          {/* <div className="ordering-container"> */}
          <Ordering setOrder={setOrder} order={order} />
          {/* </div> */}
        </div>
      </div>
      <div className="cards-style">
        {currentPosts?.map((element, index) => {
          return (
            <Cards
              id={element.id}
              key={index}
              image={element.image}
              name={element.name}
              diets={element.diets}
              healthScore={element.healthScore}
            />
          );
        })}
      </div>
      <Pagination
        totalPosts={recipeState.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CardsComponents;
