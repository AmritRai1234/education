import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { AnimationProvider } from './components/Animations';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import TrackPage from './pages/TrackPage';
import LessonViewer from './pages/LessonViewer';
import PlaygroundPage from './pages/PlaygroundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AnimationProvider>
        <Routes>
          {/* Lesson viewer has its own layout (no navbar) */}
          <Route path="/track/:trackId/:courseId/:lessonId" element={<LessonViewer />} />
          
          {/* All other pages get the navbar */}
          <Route path="*" element={
            <Box minH="100vh" display="flex" flexDirection="column">
              <Navbar />
              <Box flex="1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/track/:trackId" element={<TrackPage />} />
                  <Route path="/playground" element={<PlaygroundPage />} />
                </Routes>
              </Box>
            </Box>
          } />
        </Routes>
      </AnimationProvider>
    </BrowserRouter>
  );
}
