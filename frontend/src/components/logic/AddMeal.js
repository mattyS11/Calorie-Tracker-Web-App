import { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "../UI/Modal";
import "./AddMeal.css";
import MealItem from "./MealItem";
const AddMeal = (props) => {
  const [meals, setMeals] = useState([]);
  const [enteredMeal, setEnteredMeal] = useState("");
  const [enteredAmount, setEnteredAmount] = useState();
  const [mealTouched, setMealTouched] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const enteredMealIsValid = enteredMeal;
  let enteredAmountIsValid;
  if (enteredAmount) {
    enteredAmountIsValid = !isNaN(Number.parseFloat(enteredAmount));
  }

  let formIsValid = false;

  if (enteredMealIsValid && enteredAmountIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("http://localhost:5000/api/meals");

      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key]._id,
          name: responseData[key].name,
          ingredients: responseData[key].ingredients,
          calories: responseData[key].calories,
        });
      }

      // const mealNames = loadedMeals.flatMap((meal) => meal.name);
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  function hideSuccess() {
    props.hideSuccess();
    props.onClose();
  }
  function mealChangeHandler(e) {
    setMealTouched(true);
    console.log(e.target.value);
    setEnteredMeal(e.target.value);
  }

  function amountChangeHandler(e) {
    setAmountTouched(true);
    console.log(e.target.value);

    setEnteredAmount(e.target.value);
  }

  async function formSubmissionHandler(event) {
    event.preventDefault();
    console.log(enteredMeal, enteredAmount);
    let mealName;
    for (const item in meals) {
      if (enteredMeal === meals[item].id) {
        mealName = meals[item].name;
      }
    }

    const newMeal = {
      name: mealName,
      meal: enteredMeal,
      amount: Number.parseFloat(enteredAmount),
    };

    console.log("The meal:", newMeal);

    const response = await fetch("http://localhost:5000/api/eatenMeals", {
      method: "POST",
      body: JSON.stringify(newMeal),
      headers: {
        "Content-Type": "application/JSON",
      },
    });

    const data = await response.json();
    console.log(data);
    props.setFetchData(false);
    props.showSuccess();
  }
  const mealInputClasses = !enteredMealIsValid
    ? "form-control invalid"
    : "form-control";

  const amountInputClasses =
    !enteredAmountIsValid && amountTouched
      ? "form-control invalid"
      : "form-control";

  if (!props.success) {
    return (
      <Modal onClose={props.onClose}>
        <form onSubmit={formSubmissionHandler}>
          <div className={mealInputClasses}>
            <span>
              <label htmlFor="meal">Select a meal</label>
              <button className={"close"} onClick={props.onClose}>
                X
              </button>
            </span>
            <select onChange={mealChangeHandler}>
              <option value="select a meal"> -- Select a meal -- </option>
              {meals.map((meal) => (
                <option value={meal.id}>{meal.name}</option>
              ))}
            </select>
          </div>
          <div className={amountInputClasses}>
            <label htmlFor="mealAmount">
              Approximately how much did you eat of this meal? e.g half of the
              meal = 1/2 = 0.5)
            </label>
            <input type="number" step="0.01" onChange={amountChangeHandler} />
          </div>

          <button disabled={!formIsValid}>Add meal</button>
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
};

export default AddMeal;
