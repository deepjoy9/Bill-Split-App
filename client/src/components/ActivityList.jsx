import ActivityCard from "./ActivityCard";

const ActivityList = ({ activities, activeTab }) => {
  return (
    <div className="view-list">
      {activeTab === "activity" && (
        <div className="activity-log">
          <h2>Group Activities:</h2>
          {activities.length === 0 ? (
            <p className="no-activity">No activity data available</p>
          ) : (
            activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default ActivityList;
