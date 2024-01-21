import './App.scss';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from "./pages/NotFound/NotFound";
// import Success from "./components/Success/Success"
import MoodHomePage from "./pages/MoodHomePage/MoodHomePage";
import MoodLogsPage from "./pages/MoodLogsPage/MoodLogsPage";
import MoodMapsPage from "./pages/MoodMapsPage/MoodMapsPage";
import MemoryHomePage from "./pages/MemoryHomePage/MemoryHomePage";
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Success from "./components/Success/Success";
import LoadingWrapper from "./components/LoadingWrapper/LoadingWrapoer";

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <BrowserRouter>
        <LoadingWrapper>
          <Routes>
            <Route path='/' element={user ? <Navigate to="/moodhome" /> : <WelcomePage />} />
            <Route path='/moodhome' element={<MoodHomePage />} />
            <Route path='/logs' element={<MoodLogsPage />} />
            {/* <Route path='/logs/:logId' element={<SelectedVideo />} /> */}
            <Route path='/maps' element={<MoodMapsPage />} />
            <Route path='/memoryhome' element={<MemoryHomePage />} />
            <Route path='/success' element={<Success />} />
            <Route path='/loading' element={<LoadingPage />} />

            {/* <Route path='/success' element={<Success/>}/> */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </LoadingWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
