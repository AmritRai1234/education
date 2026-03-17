import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import TrackPage from './pages/TrackPage';
import LessonViewer from './pages/LessonViewer';
import PlaygroundPage from './pages/PlaygroundPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Lesson viewer has its own layout (no navbar) */}
        <Route path="/track/:trackId/:courseId/:lessonId" element={<LessonViewer />} />
        
        {/* All other pages get the navbar */}
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/track/:trackId" element={<TrackPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
            </Routes>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}
