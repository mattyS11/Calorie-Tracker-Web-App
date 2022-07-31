import Modal from "../UI/Modal";
import { useState, useEffect } from "react";
import "./CreateMeals.css";
import { set } from "mongoose";

function CreateMeal(props) {
  // Logic states
  const [ingredients, setIngredients] = useState([]);
  const [ingredientId, setIngredientId] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [mealName, setMealName] = useState("");
  const [mealIngredients, setMealIngredients] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [amount, setAmount] = useState(0);
  const [unitSymbol, setUnitSymbol] = useState("");
  const [unit, setUnit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [ingredientCalories, setIngredientCalories] = useState(0);

  //Validation states
  const [mealNameTouched, setMealNameTouched] = useState(false);

  const [amountTouched, setAmountTouched] = useState(false);

  useEffect(() => {
    const loadedIngredients = [];
    const fetchIngredients = async () => {
      const response = await fetch("http://localhost:5000/api/ingredients");

      const responseData = await response.json();

      for (const key in responseData) {
        loadedIngredients.push({
          id: responseData[key]._id,
          name: responseData[key].name,
          calories: responseData[key].calories,
          unit: responseData[key].unit,
        });
      }
      console.log(ingredients);
      setIngredients(loadedIngredients);
    };

    fetchIngredients();
  }, []);

  function nameBlurHandler() {
    setMealNameTouched(true);
  }
  function amountBlurHandler() {
    setAmountTouched(true);
  }

  // Create meal and send POST request
  async function formSubmissionHandler(event) {
    const mealToCreate = {
      name: mealName,
      calories: totalCalories,
    };

    console.log("The meal:", mealToCreate);
    const response = await fetch("http://localhost:5000/api/meals", {
      method: "POST",
      body: JSON.stringify(mealToCreate),
      headers: {
        "Content-Type": "application/JSON",
      },
    });

    const data = await response.json();
    console.log(data);

    setMealIngredients([]);
    setMealName("");
    setIngredientNames([]);
    setIsLoading(true);
  }

  // Add meal
  function ingredientSubmissionHandler(event) {
    event.preventDefault();
    const temp = mealIngredients;

    const tempNames = ingredientNames;
    temp.push(ingredientId);

    var tempCalories = totalCalories;
    var calories = amount * (ingredientCalories / unit.denom);
    tempCalories += calories;

    setTotalCalories(tempCalories);
    tempNames.push(
      ingredientName +
        " " +
        `(${(amount, unit.symbol)})` +
        `(${calories.toFixed(2)}kCal)`
    );
    setMealIngredients(temp);
    setIngredientNames(tempNames);

    setIngredientId("");
    setAmount(0);
    setAmountTouched(false);
    console.log(ingredientCalories);
    document.getElementById("ingredient").value = "";
    document.getElementById("ingredientamount").value = "";
    setIsLoading(true);
  }

  function nameChangeHandler(event) {
    setMealName(event.target.value);
  }
  function amountChangeHandler(event) {
    setAmountTouched(true);
    setAmount(event.target.value);
  }

  async function formSubmissionHandler(event) {
    const mealToCreate = {
      name: mealName,
      calories: totalCalories,
    };

    console.log("The meal:", mealToCreate);
    const response = await fetch("http://localhost:5000/api/meals", {
      method: "POST",
      body: JSON.stringify(mealToCreate),
      headers: {
        "Content-Type": "application/JSON",
      },
    });

    const data = await response.json();
    console.log(data);
    props.showSuccess();
    console.log(props.success);
  }
  function hideSuccess() {
    props.hideSuccess();
    props.onClose();
  }
  async function ingredientChangeHandler(event) {
    setIsLoading(false);
    const wordArray = event.target.value.split(/\s/);
    setIngredientId(wordArray[0]);
    console.log("ing id:", ingredientId);
    setIngredientCalories(wordArray[wordArray.length - 1]);
    wordArray.pop();
    var temp = wordArray[wordArray.length - 1];
    const response = await fetch(`http://localhost:5000/api/units/${temp}`);

    const responseData = await response.json();
    wordArray.pop();
    wordArray.shift();

    var tempIngredientName = wordArray.join(" ");

    setIngredientName(tempIngredientName);
    setUnit(responseData);
    setUnitSymbol(responseData.symbol);
  }

  const mealNameInvalid =
    mealNameTouched && mealName.trim() === ""
      ? "form-control invalid"
      : "form-control valid";

  const amountInvalidClass =
    amountTouched && amount <= 0
      ? "form-control invalid"
      : "form-control valid";

  const amountValid = amountTouched && amount > 0;

  const ingredientValid = ingredientId !== "default";
  const formIsValid = amountValid && ingredientValid;

  const mealNameValid = mealNameTouched && mealName.trim() !== "";

  const mealIsValid = mealNameValid && mealIngredients.length > 0;

  if (!props.success) {
    return (
      <Modal onClose={props.onClose}>
        <form id="mealform" onSubmit={ingredientSubmissionHandler}>
          <label>Calories: {totalCalories}</label>
          <div className={mealNameInvalid}>
            <label htmlFor="new_meal_name">Enter a name for this meal</label>
            {mealNameTouched && mealName.trim() === "" && (
              <p>Please enter a meal name</p>
            )}
            <input
              onBlur={nameBlurHandler}
              type="text"
              onChange={nameChangeHandler}
            />
          </div>
          <div className="form-control valid">
            <span>
              <label htmlFor="meal">Select an Ingredient</label>
              <button className={"close"} onClick={props.onClose}>
                X
              </button>
            </span>
            <select id="ingredient" onChange={ingredientChangeHandler}>
              <option value="default"> -- Select an Ingredient -- </option>

              {ingredients.map((ingredient) => (
                <option
                  key={ingredient.id}
                  value={
                    ingredient.id +
                    " " +
                    ingredient.name +
                    " " +
                    ingredient.unit +
                    " " +
                    ingredient.calories
                  }
                >
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
          <div className={amountInvalidClass}>
            <label htmlFor="ingredient_amount">
              Enter amount({unitSymbol})
            </label>
            {amountTouched && amount <= 0 && (
              <p>Please enter an amount greater than 0</p>
            )}
            <input
              id="ingredientamount"
              type="number"
              onChange={amountChangeHandler}
              onBlur={amountBlurHandler}
            />
          </div>
          <button
            type="button"
            disabled={!formIsValid}
            onClick={ingredientSubmissionHandler}
          >
            Add Ingredient
          </button>
          <button
            type="button"
            disabled={!mealIsValid}
            onClick={formSubmissionHandler}
          >
            Create Meal
          </button>
          <div>
            <ul>
              {ingredientNames.map((name) => (
                <li>{name}</li>
              ))}
            </ul>
          </div>
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

export default CreateMeal;
