import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Architectural Designer</h4>
                <h5>thesething.co</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Managed architectural CAD drawings and records,
              conducted site supervision, procured materials,
              created photorealistic 3D visuals and animations,
              collaborated with architects and teams to deliver
              high-quality architectural visualizations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BIM Modeler | ArchViz</h4>
                <h5>CDM Smith</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Developed BIM-based 3D models and visualizations,
              collaborated with project teams, created photorealistic
              renderings and AR/VR experiences, implemented interactive
              features, optimized performance, maintained asset libraries,
              and ensured immersive user-focused design.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>3D Generalist | Unreal Dev</h4>
                <h5>Jacobs</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designed 3D motion graphics and immersive Unreal Engine experiences,
              created optimized 3D assets, collaborated with cross-functional teams,
              and developed interactive web applications and multiplayer games using React,
              TypeScript, Next.js, Supabase, and React Three Fiber.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
