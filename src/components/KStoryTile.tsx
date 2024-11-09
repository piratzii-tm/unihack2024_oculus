import './KStoryTile.scss';
import { Link } from '@tanstack/react-router';

function KStoryTile({ img, title }) {
  return (
    <Link to={`/story/${img}`}>
      <div className="story-tile">
        <img src={img} alt="story tile" />
        <div className="story-tile__title">{title}</div>
      </div>
    </Link>
  );
}

export default KStoryTile;
