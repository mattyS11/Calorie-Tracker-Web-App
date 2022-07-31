import Card from "../UI/Card";
import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import classes from "./EatenMeals.module.css";
import { set } from "mongoose";

// Make dummy database data into JSX element
function EatenMeals(props) {
  const [meals, setMeals] = useState([]);
  let totalCalories = 0;
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("http://localhost:5000/api/eatenMeals");

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        const meal = responseData[key].meal;

        const responseMeal = await fetch(
          `http://localhost:5000/api/meals/${meal}`
        );

        const responseMealData = await responseMeal.json();

        loadedMeals.push({
          id: responseData[key]._id,
          name: responseData[key].name,
          calories: responseMealData.calories * responseData[key].amount,
        });
      }

      setMeals([...loadedMeals]);
    };

    fetchMeals();
    props.setFetchData(true);
  }, [props.fetchData]);
  // For every meal, create a list element.

  for (const meal in meals) {
    totalCalories += meals[meal].calories;
  }

  useEffect(() => {
    props.setCalories(totalCalories);
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.list}>
          {meals.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              calories={meal.calories}
              fetchData={props.fetchData}
              setFetchData={props.setFetchData}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default EatenMeals;
