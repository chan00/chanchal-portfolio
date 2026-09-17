import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Multiplayer Card Game",
    category: "Project Based Games",
    tools: "Next.js, Liveblocks, Supabase, Tailwind CSS, Framer Motion, Lucide React, Vercel",
    image: "/images/Solidx.png",
  },
  {
    title: "3D Web Experience",
    category: "3D interactive scene",
    tools: "Vite, Three.js, React, Typescript, R3F, Tailwind CSS, R3drei, Leva, Vercel",
    image: "/images/Solidx.png",
  },
  {
    title: "Art Queensland, Brisbane",
    category: "Flood Water Simulation",
    tools: "Unreal Engine, C++, Blueprints, Cesium, 3Ds Max, Azure DevOps, Rest API, Pixel Streaming",
    image: "/images/Solidx.png",
  },
  {
    title: "Konrad Shaft Fullort, Germany",
    category: "Radioactive Waste Management | PCVR Simulator",
    tools: "NavisWorks, 3Ds Max | Chaos Corona, Unreal Engine | Blueprint | C++, HTC Vive Pro, SteamVR",
    image: "/images/Solidx.png",
  },
  {
    title: "P7, Montrose",
    category: "Pipline",
    tools: "Civil 3D, Infraworks, Sketchup, Unreal Engine, 4D Sequence Animation",
    image: "/images/Solidx.png",
  },
  {
    title: "I95 Highway, Philedephia",
    category: "Transportation | Landscape Design",
    tools: "Sketchp, Infraworks, Lumion",
    image: "/images/radix.png",
  },
  {
    title: "Greencay, Florida",
    category: "Landscape Design",
    tools: "Civil3D, 3Ds Max | Chaos Corona",
    image: "/images/bond.png",
  },
  {
    title: "Greencay WTP and Education Center, Florida",
    category: "Cummunity Project",
    tools: "Revit, 3ds Max, Civil 3D, Infraworks, Unreal Engine",
    image: "/images/sapphire.png",
  },
  {
    title: "Khanna's Chalet",
    category: "Residential Villa",
    tools: "Autocad, 3Ds Max | Chaos Corona",
    image: "/images/Solidx.png",
  },
  {
    title: "The Hevan",
    category: "Resort",
    tools: "Autocad, 3Ds Max | Chaos Corona",
    image: "/images/Maxlife.png",
  },
  {
    title: "AMIQUR",
    category: "Commercial Salon",
    tools: "Autocad, Sketchup, Chaos Vray",
    image: "/images/Solidx.png",
  },
  {
    title: "DLF Camaelia",
    category: "Penthouse",
    tools: "Autocad, Sketchup, Chaos Vray",
    image: "/images/Solidx.png",
  },
  {
    title: "RKCO",
    category: "Fasion Design Office",
    tools: "Autocad, Sketchup, Chaos Vray",
    image: "/images/Solidx.png",
  },
  {
    title: "Jiten's Residency",
    category: "Residential Building",
    tools: "Revit",
    image: "/images/Solidx.png",
  },
  {
    title: "Narendra Bhawan Bikaner",
    category: "Commercial Hotel",
    tools: "Autocad, Sketcup, Chaos Vray",
    image: "/images/Solidx.png",
  },
  {
    title: "431-88",
    category: "Fasion Design Office",
    tools: "Autocad",
    image: "/images/Solidx.png",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
