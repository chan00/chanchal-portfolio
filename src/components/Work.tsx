import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import Lightbox from "./Lightbox";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { smoother } from "./Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    title: "Konrad Shaft Fullort, Germany",
    category: "Radioactive Waste Management | PCVR Simulator",
    tools: "NavisWorks, 3Ds Max | Chaos Corona, Unreal Engine | Blueprint | C++, HTC Vive Pro, SteamVR",
    image: "/projects/Konrad Shaft/image253.png",
    gallery: [
      "/projects/Konrad Shaft/image252.png",
      "/projects/Konrad Shaft/image253.png",
      "/projects/Konrad Shaft/image254.png",
      "/projects/Konrad Shaft/image255.png",
      "/projects/Konrad Shaft/image256.png",
      "/projects/Konrad Shaft/image257.png",
      "/projects/Konrad Shaft/image258.png",
      "/projects/Konrad Shaft/image259.png",
      "/projects/Konrad Shaft/image260.png",
      "/projects/Konrad Shaft/image261.png",
      "/projects/Konrad Shaft/image262.png",
    ],
  },
  {
    title: "P7, Montrose",
    category: "Pipline",
    tools: "Civil 3D, Infraworks, Sketchup, Unreal Engine, 4D Sequence Animation",
    image: "/projects/p7-montrose-thumb.jpg",
    overlayVideo: "/projects/p7-montrose-web.mp4",
  },
  {
    title: "I95 Highway, Philedephia",
    category: "Transportation | Landscape Design",
    tools: "Sketchp, Infraworks, Lumion",
    image: "/projects/I95 HW Philedephia/image279.jpg",
    gallery: [
      "/projects/I95 HW Philedephia/image279.jpg",
      "/projects/I95 HW Philedephia/image263.jpg",
      "/projects/I95 HW Philedephia/image264.jpg",
      "/projects/I95 HW Philedephia/image265.jpg",
      "/projects/I95 HW Philedephia/image266.jpg",
      "/projects/I95 HW Philedephia/image267.jpg",
      "/projects/I95 HW Philedephia/image268.jpg",
      "/projects/I95 HW Philedephia/image269.jpg",
      "/projects/I95 HW Philedephia/image270.jpg",
      "/projects/I95 HW Philedephia/image271.jpg",
      "/projects/I95 HW Philedephia/image272.jpg",
      "/projects/I95 HW Philedephia/image273.jpg",
      "/projects/I95 HW Philedephia/image274.jpg",
      "/projects/I95 HW Philedephia/image275.jpg",
      "/projects/I95 HW Philedephia/image276.jpg",
      "/projects/I95 HW Philedephia/image277.jpg",
      "/projects/I95 HW Philedephia/image278.jpg",
    ],
  },
  {
    title: "Greencay, Florida",
    category: "Landscape Design",
    tools: "Civil3D, 3Ds Max | Chaos Corona",
    image: "/projects/Greencay Park Florida/image280.jpg",
    enableZoom: true,
    gallery: [
      "/projects/Greencay Park Florida/image280.jpg",
      "/projects/Greencay Park Florida/image281.jpg",
      "/projects/Greencay Park Florida/image282.jpg",
    ],
  },
  {
    title: "Greencay WTP and Education Center, Florida",
    category: "Cummunity Project",
    tools: "Revit, 3ds Max, Civil 3D, Infraworks, Unreal Engine",
    image: "/projects/Greencay WTP and Edu/image283.png",
    enableZoom: false,
    gallery: [
      "/projects/Greencay WTP and Edu/image283.png",
      "/projects/Greencay WTP and Edu/image284.png",
      "/projects/Greencay WTP and Edu/image285.png",
      "/projects/Greencay WTP and Edu/image286.png",
      "/projects/Greencay WTP and Edu/image287.png",
      "/projects/Greencay WTP and Edu/image288.png",
      "/projects/Greencay WTP and Edu/image289.png",
      "/projects/Greencay WTP and Edu/image290.png",
      "/projects/Greencay WTP and Edu/image291.png",
    ],
  },
  {
    title: "Khanna's Chalet",
    category: "Residential Villa",
    tools: "Autocad, 3Ds Max | Chaos Corona",
    image: "/projects/Khanna's Chalet/image233.jpg",
    enableZoom: false,
    gallery: [
      "/projects/Khanna's Chalet/image233.jpg",
      "/projects/Khanna's Chalet/image234.jpg",
      "/projects/Khanna's Chalet/image235.jpg",
      "/projects/Khanna's Chalet/image236.jpg",
      "/projects/Khanna's Chalet/image237.jpg",
      "/projects/Khanna's Chalet/image238.jpg",
      "/projects/Khanna's Chalet/image239.jpg",
      "/projects/Khanna's Chalet/image240.jpg",
      "/projects/Khanna's Chalet/image241.jpg",
      "/projects/Khanna's Chalet/image242.jpg",
      "/projects/Khanna's Chalet/image243.jpg",
      "/projects/Khanna's Chalet/image244.jpg",
      "/projects/Khanna's Chalet/image245.jpg",
      "/projects/Khanna's Chalet/image246.jpg",
      "/projects/Khanna's Chalet/image247.jpg",
      "/projects/Khanna's Chalet/image248.jpg",
      "/projects/Khanna's Chalet/image249.jpg",
      "/projects/Khanna's Chalet/image250.jpg",
      "/projects/Khanna's Chalet/image251.jpg",
    ],
  },
  {
    title: "The Hevan",
    category: "Resort",
    tools: "Autocad, 3Ds Max | Chaos Corona",
    image: "/projects/The Hevan Resort/image189.jpeg",
    enableZoom: false,
    gallery: [
      "/projects/The Hevan Resort/image189.jpeg",
      "/projects/The Hevan Resort/image190.jpg",
      "/projects/The Hevan Resort/image191.jpg",
      "/projects/The Hevan Resort/image192.png",
      "/projects/The Hevan Resort/image193.png",
      "/projects/The Hevan Resort/image194.jpeg",
      "/projects/The Hevan Resort/image195.jpeg",
      "/projects/The Hevan Resort/image196.jpeg",
      "/projects/The Hevan Resort/image197.jpeg",
      "/projects/The Hevan Resort/image198.jpeg",
      "/projects/The Hevan Resort/image199.jpg",
      "/projects/The Hevan Resort/image200.jpg",
      "/projects/The Hevan Resort/image201.jpg",
      "/projects/The Hevan Resort/image202.jpg",
      "/projects/The Hevan Resort/image203.jpg",
      "/projects/The Hevan Resort/image204.jpg",
      "/projects/The Hevan Resort/image205.png",
      "/projects/The Hevan Resort/image206.png",
      "/projects/The Hevan Resort/image207.jpeg",
      "/projects/The Hevan Resort/image208.jpeg",
      "/projects/The Hevan Resort/image209.jpeg",
      "/projects/The Hevan Resort/image210.jpeg",
      "/projects/The Hevan Resort/image211.png",
      "/projects/The Hevan Resort/image212.png",
      "/projects/The Hevan Resort/image213.png",
      "/projects/The Hevan Resort/image214.png",
      "/projects/The Hevan Resort/image215.jpeg",
      "/projects/The Hevan Resort/image216.jpeg",
      "/projects/The Hevan Resort/image217.jpeg",
      "/projects/The Hevan Resort/image218.png",
      "/projects/The Hevan Resort/image219.png",
    ],
  },
  {
    title: "AMIQUR",
    category: "Commercial Salon",
    tools: "Autocad, Sketchup, Chaos Vray",
    image: "/projects/Amiqur Salon/image4.png",
    enableZoom: false,
    gallery: [
      "/projects/Amiqur Salon/image4.png",
      "/projects/Amiqur Salon/image6.png",
      "/projects/Amiqur Salon/image7.png",
      "/projects/Amiqur Salon/image8.png",
      "/projects/Amiqur Salon/image9.png",
      "/projects/Amiqur Salon/image10.png",
      "/projects/Amiqur Salon/image11.png",
      "/projects/Amiqur Salon/image12.png",
      "/projects/Amiqur Salon/image13.png",
      "/projects/Amiqur Salon/image14.png",
      "/projects/Amiqur Salon/image15.png",
      "/projects/Amiqur Salon/image16.png",
      "/projects/Amiqur Salon/image17.png",
      "/projects/Amiqur Salon/image18.png",
      "/projects/Amiqur Salon/image19.png",
      "/projects/Amiqur Salon/image20.png",
      "/projects/Amiqur Salon/image21.png",
      "/projects/Amiqur Salon/image22.png",
      "/projects/Amiqur Salon/image23.png",
      "/projects/Amiqur Salon/image24.png",
      "/projects/Amiqur Salon/image25.png",
      "/projects/Amiqur Salon/image26.jpg",
      "/projects/Amiqur Salon/image27.png",
      "/projects/Amiqur Salon/image28.png",
      "/projects/Amiqur Salon/image29.png",
      "/projects/Amiqur Salon/image30.png",
      "/projects/Amiqur Salon/image31.png",
    ],
  },
  {
    title: "DLF Camaelia",
    category: "Penthouse",
    tools: "Autocad, Sketchup, Chaos Vray",
    image: "/projects/DLF Camelia's Penthouse Stair Design/image167.png",
    enableZoom: false,
    gallery: [
      "/projects/DLF Camelia's Penthouse Stair Design/image167.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image168.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image169.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image170.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image171.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image172.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image173.jpg",
      "/projects/DLF Camelia's Penthouse Stair Design/image174.jpg",
      "/projects/DLF Camelia's Penthouse Stair Design/image175.jpg",
      "/projects/DLF Camelia's Penthouse Stair Design/image176.jpg",
      "/projects/DLF Camelia's Penthouse Stair Design/image177.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image178.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image179.png",
      "/projects/DLF Camelia's Penthouse Stair Design/image180.png",
    ],
  },
  {
    title: "RKCO",
    category: "Fasion Design Office",
    tools: "Autocad, Sketchup, Chaos Vray",
    image: "/projects/finals/3D Views_25.03.2020-9.jpg",
    enableZoom: false,
    gallery: [
      "/projects/finals/3D Views_25.03.2020-9.jpg",
      "/projects/finals/3D Views_25.03.2020-1.jpg",
      "/projects/finals/3D Views_25.03.2020-2.jpg",
      "/projects/finals/3D Views_25.03.2020-3.jpg",
      "/projects/finals/3D Views_25.03.2020-4.jpg",
      "/projects/finals/3D Views_25.03.2020-5.jpg",
      "/projects/finals/3D Views_25.03.2020-6.jpg",
      "/projects/finals/3D Views_25.03.2020-7.jpg",
      "/projects/finals/3D Views_25.03.2020-8.jpg",
      "/projects/finals/3D Views_25.03.2020-10.jpg",
      "/projects/finals/3D Views_25.03.2020-11.jpg",
      "/projects/finals/3D Views_25.03.2020-12.jpg",
      "/projects/finals/3D Views_25.03.2020-13.jpg",
    ],
  },
  {
    title: "Jiten's Residency",
    category: "Residential Building",
    tools: "Revit",
    image: "/projects/Jiten's Residency/image99.png",
    enableZoom: false,
    gallery: [
      "/projects/Jiten's Residency/image99.png",
      "/projects/Jiten's Residency/image100.png",
      "/projects/Jiten's Residency/image101.png",
      "/projects/Jiten's Residency/image102.png",
      "/projects/Jiten's Residency/image103.png",
      "/projects/Jiten's Residency/image104.png",
    ],
  },
  {
    title: "Narendra Bhawan Bikaner",
    category: "Commercial Hotel",
    tools: "Autocad, Sketcup, Chaos Vray",
    image: "/projects/Narendra Bhawan Bikaner/image122.png",
    enableZoom: false,
    gallery: [
      "/projects/Narendra Bhawan Bikaner/image122.png",
      "/projects/Narendra Bhawan Bikaner/image105.png",
      "/projects/Narendra Bhawan Bikaner/image106.png",
      "/projects/Narendra Bhawan Bikaner/image107.png",
      "/projects/Narendra Bhawan Bikaner/image108.png",
      "/projects/Narendra Bhawan Bikaner/image109.png",
      "/projects/Narendra Bhawan Bikaner/image110.png",
      "/projects/Narendra Bhawan Bikaner/image111.png",
      "/projects/Narendra Bhawan Bikaner/image112.png",
      "/projects/Narendra Bhawan Bikaner/image113.png",
      "/projects/Narendra Bhawan Bikaner/image114.png",
      "/projects/Narendra Bhawan Bikaner/image115.png",
      "/projects/Narendra Bhawan Bikaner/image116.png",
      "/projects/Narendra Bhawan Bikaner/image117.png",
      "/projects/Narendra Bhawan Bikaner/image118.png",
      "/projects/Narendra Bhawan Bikaner/image119.png",
      "/projects/Narendra Bhawan Bikaner/image120.png",
      "/projects/Narendra Bhawan Bikaner/image121.png",
      "/projects/Narendra Bhawan Bikaner/image123.png",
      "/projects/Narendra Bhawan Bikaner/image124.png",
      "/projects/Narendra Bhawan Bikaner/image125.png",
    ],
  },
  {
    title: "431-88",
    category: "Fasion Design Office",
    tools: "Autocad",
    image: "/projects/431-88 - Seema - Fasion Designer/TT_43188_Lighting Layout Plan_13.01.2020-Lighting Plan (2).jpg",
    enableZoom: false,
    gallery: [
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_Lighting Layout Plan_13.01.2020-Lighting Plan (2).jpg",
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_Lighting Layout Plan_13.01.2020-Meeting.jpg",
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_Lighting Layout Plan_13.01.2020-Reception.jpg",
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_Lighting Layout Plan_13.01.2020-Shweta.jpg",
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_False Ceiling Layout_04.06.2020-Elevation Meeting (2).jpg",
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_False Ceiling Layout_04.06.2020-Elevation Meeting.jpg",
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_False Ceiling Layout_04.06.2020-Meeting.jpg",
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_Furniture_14.01.2020-Discussion Table.jpg",
      "/projects/431-88 - Seema - Fasion Designer/TT_43188_502_1500 Table.jpg",
    ],
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(false);

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

  const openGallery = (images: string[], enableZoom: boolean = false) => {
    smoother?.paused(true);
    setLightboxVideo(null);
    setLightboxImages(images);
    setLightboxZoom(enableZoom);
    setLightboxOpen(true);
  };

  const openVideo = (videoSrc: string) => {
    smoother?.paused(true);
    setLightboxImages([]);
    setLightboxVideo(videoSrc);
    setLightboxOpen(true);
  };

  return (
    <>
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
                        <h3>{String(index + 1).padStart(2, "0")}</h3>
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
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        gallery={project.gallery}
                        overlayVideo={project.overlayVideo}
                        onGalleryClick={
                          project.gallery
                            ? () => openGallery(project.gallery!, !!project.enableZoom)
                            : undefined
                        }
                        onVideoClick={
                          project.overlayVideo
                            ? () => openVideo(project.overlayVideo!)
                            : undefined
                        }
                      />
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

    {/* Lightbox — rendered via portal to escape stacking context */}
    {lightboxOpen &&
      createPortal(
        <Lightbox
          images={lightboxImages.length > 0 ? lightboxImages : undefined}
          video={lightboxVideo || undefined}
          enableZoom={lightboxZoom}
          onClose={() => {
            setLightboxOpen(false);
            setLightboxVideo(null);
            setLightboxZoom(false);
            document.body.style.overflow = "";
            document.body.style.overflowY = "auto";
            smoother?.paused(false);
            ScrollTrigger.refresh();
          }}
        />,
        document.body
      )}
    </>
  );
};

export default Work;
