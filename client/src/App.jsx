import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import About from "./pages/about/about-us";
import ContactPage from "./pages/contact-us/contact-us";
import PhotoGallery from "./pages/media/photo-gallery";
import VideoGallery from "./pages/media/video-gallery";
import UpcomingEvents from "./pages/media/upcoming-events";
import CompletedEvents from "./pages/media/completed-events";
import TermsCondition from "./pages/quick-links/terms";
import PrivacyPolicy from "./pages/quick-links/privacy";
import Disclaimer from "./pages/quick-links/disclaimer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsCondition />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        <Route path="/photo-gallery" element={<PhotoGallery />} />
        <Route path="/video-gallery" element={<VideoGallery />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/completed-events" element={<CompletedEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
