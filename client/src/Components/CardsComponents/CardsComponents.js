import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import { getRecipes } from "../../Redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import Ordering from "../Ordering/Ordering";
import "./CardsComponents.scss";
import "./CardsComponents.css";


const CardsComponents = () => {
  const dispatch = useDispatch();
  const recipeState = useSelector((state) => state.recipes);
  // console.log(recipeState);
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
          <SearchBar recipeState={recipeState} />
        <div className="filter-ordering">
        <div className="order-menu">
          <Filters setRestart={setRestart} restart={restart} />
          <Ordering setOrder={setOrder} order={order} />
        </div>
        </div>
      </div>
      <div className="container-cards-1">
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
      {
        recipeState.length === 0 && (
          <div className="pan-loader">
            <div className="loader"></div>
              <div className="pan-container">
                <div className="pan"></div>
                <div className="handle"></div>
              </div>
            <div className="shadow"></div>
          </div>
        )
      }
     
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
