import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyGroupsPage from "./pages/MyGroupsPage";
import { GroupProvider } from "./context/GroupContext";

function App() {
  return (
    <GroupProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyGroupsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </GroupProvider>
  );
}

export default App;
