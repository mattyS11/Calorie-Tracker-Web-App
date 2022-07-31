import { useState } from "react";
import classes from "./App.module.css";
import CalorieWheel from "./components/logic/CalorieWheel";
import Button from "./components/UI/Button";
import AddMeal from "./components/logic/AddMeal";
import EatenMeals from "./components/logic/EatenMeals";
import CreateIngredient from "./components/logic/CreateIngredient";
import SetTarget from "./components/logic/SetTarget";
import CreateMeal from "./components/logic/CreateMeal";
function App() {
  const [calories, setCalories] = useState(0);
  const [addMealShown, setAddMealShown] = useState(false);
  const [createMealShown, setCreateMealShown] = useState(false);
  const [addIngredientShown, setAddIngredientShown] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [calorieTarget, setCalorieTarget] = useState(
    localStorage.getItem("target")
  );

  const [firstLoad, setFirstLoad] = useState(localStorage.getItem("firstLoad"));

  const [showTarget, setShowTarget] = useState(false);

  const [success, setSuccess] = useState(false);

  function showSuccess() {
    setSuccess(true);
  }
  function hideSuccess() {
    setSuccess(false);
  }
  function showAddMeal() {
    setAddMealShown(true);
  }

  function hideAddMeal() {
    setAddMealShown(false);
  }

  function showAddIngredient() {
    setAddIngredientShown(true);
  }

  function hideAddIngredient() {
    setAddIngredientShown(false);
  }
  function showCreateMeal() {
    setCreateMealShown(true);
  }

  function hideCreateMeal() {
    setCreateMealShown(false);
  }

  function showTargetHandler() {
    setShowTarget(true);
  }
  function hideTargetHandler() {
    setShowTarget(false);
  }

  // If running for the first time, post some unit types to the database.
  async function setUnits() {
    const flag = localStorage.getItem("firstLoad");
    if (!flag) {
      console.log("hello");
      localStorage.setItem("firstLoad", true);
      const gram_unit = {
        unitType: "per 100g",
        denom: 100,
        symbol: "g",
      };
      const single_unit = {
        unitType: "Each",
        denom: 1,
        symbol: "single",
      };

      const ml_unit = {
        unitType: "per 100mL",
        denom: 100,
        symbol: "mL",
      };
      const response = await fetch("http://localhost:5000/api/units", {
        method: "POST",
        body: JSON.stringify(gram_unit),
        headers: {
          "Content-Type": "application/JSON",
        },
      });
      const response2 = await fetch("http://localhost:5000/api/units", {
        method: "POST",
        body: JSON.stringify(single_unit),
        headers: {
          "Content-Type": "application/JSON",
        },
      });
      const response3 = await fetch("http://localhost:5000/api/units", {
        method: "POST",
        body: JSON.stringify(ml_unit),
        headers: {
          "Content-Type": "application/JSON",
        },
      });
      const data = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      console.log(data, data2, data3);
    }
  }
  setUnits();
  return (
    <div className={classes.main}>
      <h1>Calorie Tracker</h1>
      <h3>Daily target:{localStorage.getItem(calorieTarget)}</h3>
      <button className={classes.calorieButton} onClick={showTargetHandler}>
        Set calorie target
      </button>
      {showTarget && (
        <SetTarget
          setTarget={setCalorieTarget}
          onClose={hideTargetHandler}
        ></SetTarget>
      )}

      {addMealShown && (
        <AddMeal
          success={success}
          showSuccess={showSuccess}
          hideSuccess={hideSuccess}
          setAddMealShown={setAddMealShown}
          setFetchData={setFetchData}
          fetchData={fetchData}
          onClose={hideAddMeal}
        ></AddMeal>
      )}

      {createMealShown && (
        <CreateMeal
          success={success}
          showSuccess={showSuccess}
          hideSuccess={hideSuccess}
          onClose={hideCreateMeal}
        ></CreateMeal>
      )}

      {addIngredientShown && (
        <CreateIngredient
          success={success}
          showSuccess={showSuccess}
          hideSuccess={hideSuccess}
          onClose={hideAddIngredient}
        ></CreateIngredient>
      )}

      <CalorieWheel calories={calories} target={calorieTarget}></CalorieWheel>
      <span>
        <Button onClick={showAddMeal}>Add meal</Button>
        <Button onClick={showCreateMeal}>Create Meal</Button>
        <Button onClick={showAddIngredient}>Create Ingredient</Button>
      </span>

      <h2>Today's Meals</h2>
      <EatenMeals
        setCalories={setCalories}
        setFetchData={setFetchData}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
