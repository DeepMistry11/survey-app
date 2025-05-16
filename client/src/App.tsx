import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SurveyPage from "./pages/SurveyPage";
import ReviewPage from './pages/ReviewPage';
import AdminPage from './pages/AdminPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SurveyPage />}></Route>
        <Route path="/review" element={<ReviewPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App
