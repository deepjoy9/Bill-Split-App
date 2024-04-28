import React from "react";

const ActivityCard = ({ activity }) => {
  return (
    <div className="activity-container">
      <div className="activity-info">
        <p>{activity}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
