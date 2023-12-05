import './App.css';
import { DynamicHomePage, StaticHomePage } from './app/home/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  InfoPage,
  ListPage,
  PdfPage,
  ProjectPage,
  TechnologyPage,
} from './app/resource/ResourcePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DynamicHomePage />} />
        <Route path="/home" element={<StaticHomePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/technologies/:id" element={<TechnologyPage />} />
        <Route path="/sections/info/:id" element={<InfoPage />} />
        <Route path="/sections/lists/:sectionId" element={<ListPage />} />
        <Route path="/sections/pdfs/:sectionId" element={<PdfPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
