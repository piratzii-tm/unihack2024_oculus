import "./KStoryTile.scss";
import { Link } from "@tanstack/react-router";

function KStoryTile({ img, title, id }) {
  return (
    <Link to={`/story/${id}`}>
      <div className="story-tile">
        <img src={img} alt="story tile" />
        <div className="story-tile__title">{title}</div>
      </div>
    </Link>
  );
}

export default KStoryTile;
