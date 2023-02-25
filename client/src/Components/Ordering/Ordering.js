import { useDispatch } from "react-redux";
import { allOrdering } from "../../Redux/actions";
import "./Ordering.css";

const Ordering = ({ setOrder, order }) => {
  const dispatch = useDispatch();

  const handlerOrdering = (event) => {
    const orderEvent = event.target.value;
    dispatch(allOrdering(orderEvent));
    order === false ? setOrder(true) : setOrder(false);
  };
  return (
    <div className="ordenamiento">
      <div className="order-content">
        <select value="default" onChange={handlerOrdering}>
          <option value="default" disabled>
            ORDER
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="health score +">health score + </option>
          <option value="health score -">health score - </option>
        </select>
      </div>
    </div>
  );
};

export default Ordering;
