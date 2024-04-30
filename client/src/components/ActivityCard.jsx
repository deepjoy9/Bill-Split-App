import React from "react";

const ActivityCard = ({ activity }) => {
  console.log("Activity Card prop: ", activity);
  return (
    <div className="activity-container">
      <div className="activity-info">
        <p>{activity.activityMessage}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
