import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import { Intro, Approach, Problems, Solution } from "./components/Sections1.jsx";
import { Services, Audience, Process, Results, Testimonials, WhyChoose } from "./components/Sections2.jsx";
import { Consultation, Faq } from "./components/Sections3.jsx";
import EnquiryForm from "./components/EnquiryForm.jsx";
import Footer from "./components/Footer.jsx";
import MobileBar from "./components/MobileBar.jsx";

export default function App() {
  return (
    <div id="top">
      <a href="#main" className="sr-only z-[60] rounded-lg bg-plum-800 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Approach />
        <Problems />
        <Solution />
        <Services />
        <Audience />
        <Process />
        <Results />
        <Testimonials />
        <WhyChoose />
        <Consultation />
        <Faq />
        <EnquiryForm />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
