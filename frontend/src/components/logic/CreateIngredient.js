import "./CreateIngredient.css";
import Modal from "../UI/Modal";
import { useState, useEffect } from "react";

function CreateIngredient(props) {
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [calories, setCalories] = useState("");
  const [caloriesTouched, setCaloriesTouched] = useState(false);
  const [enteredIngredientTouched, setEnteredIngredientTouched] =
    useState(false);

  useEffect(() => {
    const fetchUnits = async () => {
      const response = await fetch("http://localhost:5000/api/units");

      const responseData = await response.json();
      const loadedUnits = [];
      for (const key in responseData) {
        loadedUnits.push({
          id: responseData[key]._id,
          unitType: responseData[key].unitType,
          denom: responseData[key].denom,
        });
      }

      // const mealNames = loadedMeals.flatMap((meal) => meal.name);
      setUnits(loadedUnits);
    };

    fetchUnits();
  }, []);

  function ingredientNameChangeHandler(event) {
    setEnteredIngredientTouched(true);
    setIngredientName(event.target.value);
  }
  function amountChangeHandler(event) {
    setCaloriesTouched(true);
    setCalories(event.target.value);
  }

  function unitChangeHandler(event) {
    setUnit(event.target.value);
  }
  function hideSuccess() {
    props.hideSuccess();
    props.onClose();
  }

  async function formSubmissionHandler(event) {
    event.preventDefault();
    const responseUnit = await fetch(`http://localhost:5000/api/units/${unit}`);

    const responseUnitData = await responseUnit.json();

    console.log(responseUnitData);
    const newIngredient = {
      name: ingredientName,
      calories: calories,
      unit: unit,
    };
    const response = await fetch("http://localhost:5000/api/ingredients", {
      method: "POST",
      body: JSON.stringify(newIngredient),
      headers: {
        "Content-Type": "application/JSON",
      },
    });
    props.showSuccess();
  }
  const enteredIngredientIsInValid = !(ingredientName.trim() != "");
  const enteredCaloriesIsInValid = calories < 1 || calories === null;
  const ingredientInputClasses =
    enteredIngredientIsInValid && enteredIngredientTouched
      ? "form-control invalid"
      : "form-control ";

  const caloriesInputClasses =
    enteredCaloriesIsInValid && caloriesTouched
      ? "form-control invalid"
      : "form-control";

  const formIsValid =
    !enteredCaloriesIsInValid &&
    !enteredIngredientIsInValid &&
    unit != "select a meal";
  if (!props.success) {
    return (
      <Modal onClose={props.onClose}>
        <form onSubmit={formSubmissionHandler}>
          <div className={ingredientInputClasses}>
            <span>
              <label htmlFor="ingredient">Ingredient name</label>
              <button className={"close"} onClick={props.onClose}>
                X
              </button>
            </span>
            <input type="text" onChange={ingredientNameChangeHandler}></input>
          </div>
          <div className={caloriesInputClasses}>
            <label htmlFor="calories">calories?</label>
            <input type="number" step="0.01" onChange={amountChangeHandler} />

            <label htmlFor="unit">Select a unit </label>
            <select onChange={unitChangeHandler}>
              <option value="select a meal"> -- Select Unit -- </option>
              {units.map((unit) => (
                <option value={unit.id}>{unit.unitType}</option>
              ))}
            </select>
          </div>

          <button disabled={!formIsValid}>Create Ingredient</button>
        </form>
      </Modal>
    );
  }

  if (props.success) {
    return (
      <Modal>
        <div>
          <p>Success!</p>
          <button onClick={hideSuccess}>Ok</button>
        </div>
      </Modal>
    );
  }
}

export default CreateIngredient;
