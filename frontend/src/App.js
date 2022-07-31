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
