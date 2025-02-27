import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Issue from "./pages/Issue";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Applying from "./pages/Applying";
import Project from "./pages/Project";
import Applyed from "./pages/Applyed";
import Contributor from "./pages/Contributor";
import Explore from "./pages/Explore";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import { ProfileLayout } from "./layout/ProfileLayout";
import Personal from "./components/profile/Personal";
import Experience from "./components/profile/Experience";
import { ApiProvider } from "./context/ApiContext";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProjects from "./pages/AddProjects";
import EditProject from "./pages/EditProject";
import Education from "./components/profile/Education.jsx";
import { PersistGate } from "redux-persist/integration/react";
import Clan from "./pages/Clan";
import ClanList from "./pages/ClanList";
import FundScreen from "./pages/FundScreen";
import LeagueChallenges from "./pages/LeagueChallenges";
import Transactionhistory from "./pages/Transactionhistory";
import WarLog from "./pages/WarLog";
import DetailScreen from "./pages/DetailScreen";
import ContestDescriptionPage from "./pages/ContestDescriptionPage";
import ContestPage from "./pages/ContestPage";
import PostContest from "./components/clan/PostContest";
import MyContests from "./components/clan/MyContests";
import AllContest from "./components/clan/AllContest.jsx";
import TrackRoute from "./components/TrackRoute";
import PreviousRoutes from "./components/PreviousRoutes";
import UserRoute from "./components/UserRoute";
import ProjectRoute from "./components/ProjectRoute";
import ProjectAdminRoute from "./components/ProjectAdminRoute";
import ContributorsRoute from "./components/ContributorsRoute";
import Discord from "./components/clan/Discord.jsx";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApiProvider>
          <Router>
            <TrackRoute />
            <Routes>
              {/* Root Layout */}
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="PreviousRoutes" element={<PreviousRoutes />} />
                <Route path="UserRoute" element={<UserRoute />} />
                <Route path="ProjectRoute" element={<ProjectRoute />} />
                <Route
                  path="ContributorsRoute"
                  element={<ContributorsRoute />}
                />
                <Route
                  path="ProjectAdminRoute"
                  element={<ProjectAdminRoute />}
                />
                <Route
                  path="clan/:id"
                  element={<ProtectedRoute element={<Clan />} />}
                />
                {/* <Route path="discord" element={<Discord />} /> */}
                <Route
                  path="clan-list"
                  element={<ProtectedRoute element={<ClanList />} />}
                />
                <Route
                  path="warlog/:clanId"
                  element={<ProtectedRoute element={<WarLog />} />}
                />
                <Route
                  path="fund-screen/:clanId"
                  element={<ProtectedRoute element={<FundScreen />} />}
                />
                <Route
                  path="league-challenges/:clanId"
                  element={<ProtectedRoute element={<LeagueChallenges />} />}
                />
                <Route
                  path="transaction-history/:clanId"
                  element={<ProtectedRoute element={<Transactionhistory />} />}
                />
                <Route
                  path="/detail-screen/:id"
                  element={<ProtectedRoute element={<DetailScreen />} />}
                />
                <Route
                  path="/contest_description_page/:id"
                  element={
                    <ProtectedRoute element={<ContestDescriptionPage />} />
                  }
                />
                <Route
                  path="/contest_page"
                  element={<ProtectedRoute element={<ContestPage />} />}
                >
                  <Route
                    index
                    element={<ProtectedRoute element={<PostContest />} />}
                  />
                  <Route
                    path="/contest_page/my_contests"
                    element={<ProtectedRoute element={<MyContests />} />}
                  />
                  <Route
                    path="/contest_page/all_contests"
                    element={<ProtectedRoute element={<AllContest />} />}
                  />
                </Route>

                <Route
                  path="projects/contributor"
                  element={<ProtectedRoute element={<Contributor />} />}
                />
                {/* done */}

                <Route
                  path="projects/admin"
                  element={<ProtectedRoute element={<Project />} />}
                />
                <Route
                  path="projects/add"
                  element={<ProtectedRoute element={<AddProjects />} />}
                />
                <Route
                  path="/projects/contributor/collab/:id"
                  element={<ProtectedRoute element={<Apply />} />}
                />
                <Route
                  path="/projects/contributor/git/:id"
                  element={<ProtectedRoute element={<Applying />} />}
                />
                <Route
                  path="/projects/edit/:id"
                  element={<ProtectedRoute element={<EditProject />} />}
                />
                <Route
                  path="/projects/admin/:id"
                  element={<ProtectedRoute element={<Applyed />} />}
                />
                <Route
                  path="/projects/admin/issue/:id"
                  element={<ProtectedRoute element={<Issue />} />}
                />

                <Route
                  path="chat"
                  element={<ProtectedRoute element={<Chat />} />}
                />
              </Route>

              {/* Authentication */}
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />

              {/* Profile Layout */}
              <Route path="profile" element={<ProfileLayout />}>
                <Route
                  index
                  element={<ProtectedRoute element={<Profile />} />}
                />
                <Route
                  path="details"
                  element={<ProtectedRoute element={<Personal />} />}
                />
                <Route
                  path="experience"
                  element={<ProtectedRoute element={<Experience />} />}
                />
                <Route
                  path="education"
                  element={<ProtectedRoute element={<Education />} />}
                />
                {/* <Route
                  path="my-skills"
                  element={<ProtectedRoute element={<MySkills />} />}
                /> */}
              </Route>
            </Routes>
          </Router>
        </ApiProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
