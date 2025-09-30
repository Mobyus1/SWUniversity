import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
//import PuzzlesPage from './pages/PuzzlesPage';
import NotFoundPage from './pages/NotFoundPage';

import './App.css';

function App() {
  return <HashRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        {/* <Route path="/puzzles" element={<PuzzlesPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  </HashRouter>;
}

export default App;
