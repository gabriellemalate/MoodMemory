import './App.scss';

import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import NotFound from "./pages/NotFound/NotFound";
// import Success from "./components/Success/Success"
import MoodHomePage from "./pages/MoodHomePage/MoodHomePage";
import MoodLogsPage from "./pages/MoodLogsPage/MoodLogsPage";
import MoodMapsPage from "./pages/MoodMapsPage/MoodMapsPage";
import MemoryHomePage from "./pages/MemoryHomePage/MemoryHomePage";
import WelcomePage from './pages/WelcomePage/WelcomePage';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/moodhome' element={<MoodHomePage />} />
          <Route path='/logs' element={<MoodLogsPage />} />
          {/* <Route path='/logs/:logId' element={<SelectedVideo />} /> */}
          <Route path='/maps' element={<MoodMapsPage />} />

          <Route path='/memoryhome' element={<MemoryHomePage />} />

          {/* <Route path='/success' element={<Success/>}/> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
