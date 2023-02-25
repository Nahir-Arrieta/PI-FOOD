import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../Redux/actions";
import { useEffect } from "react";
import { filterDiets, filter } from "../../Redux/actions";
import "./Filters.css";

const Filters = ({ setRestart, restart }) => {
  const dispatch = useDispatch();
  const selectDiets = useSelector((state) => state.diets);

  const handlerFilters = (event) => {
    const diets = event.target.value;
    dispatch(filterDiets(diets));
  };

  const handlerButton = (event) => {
    const recipesFilter = event.target.value;
    dispatch(filter(recipesFilter));
  };

  const restarting = () => {
    setRestart(!restart);
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  return (
    <div className="filters-container">
      <div className="content-select">
        <select value="default" onChange={handlerFilters}>
          <option value="default" disabled>
            DIETS
          </option>
          {selectDiets?.map((element, index) => {
            return (
              <option key={index} value={element.name}>
                {element.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="buttons">
        <button value="Recipes Api" onClick={handlerButton}>
          Recipes Api
        </button>
        <button value="Recipes Created" onClick={handlerButton}>
          Recipes Created
        </button>
        <button value="All Recipes" onClick={restarting}>
          Restart Filter
        </button>
      </div>
    </div>
  );
};

export default Filters;
