import "./KStoryTile.scss";
import { Link } from "@tanstack/react-router";

interface KStoryTileProps {
    img: string;
    title: string;
    id: string;
}

function KStoryTile({ img, title, id }: KStoryTileProps) {
    const newTitle = title.replace(/\.mp3$/, "");

    return (
        <Link to={`/story/${id}`}>
            <div className="story-tile">
                <img src={img} alt="story tile" />
                <div className="story-tile__title">{newTitle}</div>
            </div>
        </Link>
    );
}

export default KStoryTile;