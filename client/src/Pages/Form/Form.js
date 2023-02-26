import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../Redux/actions";
import Select from "react-select";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dietsAll = useSelector((state) => state.diets);
  const [create, setCreate] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 0,
    steps: "",
    diets: "",
  });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  function validate(create) {
    let err = {};
    if (!create.name) {
      err.name = "Please type a name!";
    } else if (!create.image) {
      err.image = "please enter an image";
    } else if (!create.summary) {
      err.summary = "Please type a summary!";
    } else if (
      !create.healthScore ||
      create.healthScore < 0 ||
      create.healthScore > 100
    ) {
      err.healthScore = "Please enter a value between 0 and 100!";
    } else if (!create.steps) {
      err.steps = "Please type a step!";
    } else if (!create.diets) {
      err.diets = "please select a diet";
    }
    setDisabled(false);
    return err;
  }
  const handleInputChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setCreate({
      ...create,
      [property]: value,
    });
    setErrors(
      validate({
        ...create,
        [property]: value,
      })
    );
  };

  const handleSelect = (event) => {
    setCreate({
      ...create,
      diets: event.map((e) => {
        return e.value;
      }),
    });
    setErrors(
      validate({
        ...create,
        diets: event.map((diet) => {
          return diet.value;
        }),
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(create));
    window.confirm("recipe created successfully");
    history.push("/home");
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <h1>Create your own recipe</h1>
          <div className="group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={create.name}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="errorForm">
              {errors.name && <p>{errors.name}</p>}
            </span>
          </div>
          <div className="group">
            <label>Image</label>
            <input
              type="text"
              name="image"
              value={create.image}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="errorForm">
              {errors.image && <p>{errors.image}</p>}
            </span>
          </div>
          <div className="group">
            <label>Summary</label>
            <input
              type="text"
              name="summary"
              value={create.summary}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="errorForm">
              {errors.summary && <p>{errors.summary}</p>}
            </span>
          </div>
          <div className="group">
            <label>Health Score</label>
            <input
              type="number"
              name="healthScore"
              value={create.healthScore}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="errorForm">
              {errors.healthScore && <p>{errors.healthScore}</p>}
            </span>
          </div>
          <div className="group">
            <label>Steps</label>
            <input
              type="text"
              name="steps"
              value={create.steps}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="errorForm">
              {errors.steps && <p>{errors.steps}</p>}
            </span>
          </div>
          <div className="group">
            <label>Diets</label>
            <Select
              isMulti
              options={dietsAll.map((diet) => ({
                value: diet.name,
                label: diet.name,
              }))}
              onChange={(e) => handleSelect(e)}
            />
            {errors.diets && <p>{errors.diets}</p>}
          </div>
          <button
            className="buttonForm "
            type="submit"
            disabled={
              disabled === false && Object.entries(errors).length === 0
                ? false
                : true
            }
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
