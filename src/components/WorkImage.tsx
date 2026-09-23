import { useState } from "react";
import { MdArrowOutward, MdPlayArrow } from "react-icons/md";
import { IoImages } from "react-icons/io5";
import { asset } from "../utils/assets";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  gallery?: string[];
  overlayVideo?: string;
  onGalleryClick?: () => void;
  onVideoClick?: () => void;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const hasGallery = props.gallery && props.gallery.length > 0;
  const hasOverlayVideo = !!props.overlayVideo;
  const isClickable = hasGallery || hasOverlayVideo;

  const handleClick = (e: React.MouseEvent) => {
    if (hasGallery && props.onGalleryClick) {
      e.preventDefault();
      props.onGalleryClick();
    } else if (hasOverlayVideo && props.onVideoClick) {
      e.preventDefault();
      props.onVideoClick();
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={isClickable ? undefined : props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target={isClickable ? undefined : "_blank"}
        data-cursor={"disable"}
        onClick={handleClick}
        style={isClickable ? { cursor: "pointer" } : undefined}
      >
        {props.link && !isClickable && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {hasGallery && (
          <div className="gallery-indicator">
            <IoImages />
            {props.gallery!.length} photos
          </div>
        )}
        {hasOverlayVideo && !hasGallery && (
          <div className="video-indicator">
            <MdPlayArrow />
          </div>
        )}
        <img src={asset(props.image)} alt={props.alt} />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
