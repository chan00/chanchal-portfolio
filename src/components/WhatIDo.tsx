import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          {/* Card 1: ArchViz | BIM */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>ARCHVIZ | BIM</h3>
              <h4>Architectural Visualization & Building Information Modeling</h4>
              <p>
                Creating photorealistic renders, walkthroughs, and interactive
                visualizations. Bridging design intent
                with immersive 3D experiences using BIM workflows.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">3D Modeling</div>
                <div className="what-tags">Texturing</div>
                <div className="what-tags">Lighting</div>
                <div className="what-tags">Rendering</div>
                <div className="what-tags">Unreal Engine</div>
                <div className="what-tags">3ds Max</div>
                <div className="what-tags">V-Ray|Corona</div>
                <div className="what-tags">Revit|ArchiCAD</div>
                <div className="what-tags">Twinmotion</div>
                <div className="what-tags">SketchUp</div>
                <div className="what-tags">Blender</div>
                <div className="what-tags">Solidworks</div>
                <div className="what-tags">Cinema 4D</div>
                <div className="what-tags">AutoCAD</div>
                <div className="what-tags">Motion Graphics</div>
                <div className="what-tags">Video Editing</div>
                <div className="what-tags">Fluid Simulations</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          {/* Card 2: Game Development */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>GAME DEV</h3>
              <h4>VR, AR, Interactive Experiences, Digital Twins & Real-Time 3D</h4>
              <p>
                Building immersive game environments for PC, VR, AR, interactive simulations,
                and real-time 3D experiences with Multiplayer Game fuctions, high-fidelity assets,
                lighting, and animation systems including Game Mechanics and Server-Client Networking.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Unreal Engine</div>
                <div className="what-tags">Unity</div>
                <div className="what-tags">Blueprints</div>
                <div className="what-tags">C++</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">Houdini</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          {/* Card 3: Fullstack Development */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>FULLSTACK</h3>
              <h4>3D Web Development & Interactive Experiences with Backend Functionality</h4>
              <p>
                Building scalable web applications from frontend to backend.
                Designing robust APIs, microservices, and pixel-perfect
                responsive interfaces with modern frameworks.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React.js</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Supabase</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">REST APIs</div>
                <div className="what-tags">CI/CD</div>
                <div className="what-tags">Version Control</div>
                <div className="what-tags">React3Fiber</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
