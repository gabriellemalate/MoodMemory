import './App.scss';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import NotFound from "./pages/NotFound/NotFound";
// import Success from "./components/Success/Success"
import MoodHomePage from "./pages/MoodHomePage/MoodHomePage";
import MoodLogsPage from "./pages/MoodLogsPage/MoodLogsPage";
import MoodMapsPage from "./pages/MoodMapsPage/MoodMapsPage";
import MemoryHomePage from "./pages/MemoryHomePage/MemoryHomePage";
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoadingPage from "./pages/LoadingPage/LoadingPage";

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Navigate to="/logs"/> : <WelcomePage/>} />
          <Route path='/moodhome' element={<MoodHomePage />} />
          <Route path='/logs' element={<MoodLogsPage />} />
          {/* <Route path='/logs/:logId' element={<SelectedVideo />} /> */}
          <Route path='/maps' element={<MoodMapsPage />} />

          <Route path='/memoryhome' element={<MemoryHomePage />} />
          <Route path='/loading' element={<LoadingPage/>}/>

          {/* <Route path='/success' element={<Success/>}/> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
