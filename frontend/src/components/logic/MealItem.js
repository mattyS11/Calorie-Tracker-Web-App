import classes from "./MealItem.module.css";

function MealItem(props) {
  async function removeMealHandler() {
    const response = await fetch(
      `http://localhost:5000/api/eatenMeals/${props.id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    props.setFetchData(false);
  }
  return (
    <li className={classes.item}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.calories}>{props.calories} calories</div>
      </div>
      <div className={classes.mealButtonDiv}>
        <button className={classes.mealButton} onClick={removeMealHandler}>
          Remove Meal
        </button>
      </div>
    </li>
  );
}

export default MealItem;
