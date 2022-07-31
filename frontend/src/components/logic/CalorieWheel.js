import "./CalorieWheel.css";
import { useState, useEffect } from "react";

const CalorieWheel = (props) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(props.calories / props.target);
  }, [props.calories, props.target]);

  let degrees;
  degrees = percentage * 360;

  return (
    <div className="container">
      <div
        className="progress"
        style={{
          background: `conic-gradient(aqua ${degrees}deg, #ededed 0deg)`,
        }}
      >
        <span className="value">
          {(percentage * 100).toFixed(2)}% of {props.target} calories
        </span>
      </div>

      <span className="text">{props.target}</span>
    </div>
  );
};

export default CalorieWheel;
