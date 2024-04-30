import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyGroupsPage from "./pages/MyGroupsPage";
import { GroupProvider } from "./context/GroupContext";
import GroupDetailsPage from "./pages/GroupDetailsPage";
import { ExpenseProvider } from "./context/ExpenseContext";
import MyFriendsPage from "./pages/MyFriendsPage";
import { FriendProvider } from "./context/FriendContext";

function App() {
  return (
    <FriendProvider>
      <GroupProvider>
        <ExpenseProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MyGroupsPage />} />
              <Route path="/friends" element={<MyFriendsPage />} />
              <Route path="/groups/:id" element={<GroupDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </ExpenseProvider>
      </GroupProvider>
    </FriendProvider>
  );
}

export default App;
