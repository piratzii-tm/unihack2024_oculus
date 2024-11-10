import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import "./styles.scss";
import { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { BackSide, TextureLoader } from "three";
import { onValue, ref } from "firebase/database";
import { database } from "../../backend/config.ts";
import { updateProgress } from "../../backend/updateProgress.ts";
import { userId } from "../index.lazy.tsx";

const store = createXRStore();

export const Route = createLazyFileRoute("/story/$id")({
  component: RouteComponent,
});

function KXRStory({
  frames,
  onLoad,
  uid,
  storyId,
}: {
  onLoad: (onEnterAR: (aud: HTMLAudioElement) => void) => void;
}) {
  const textures = useLoader(
    TextureLoader,
    frames.map(({ link }) => link),
  );

  const [currentTexture, setCurrentTexture] = useState(0);

  const [aud, setAud] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (textures) {
      onLoad((aud) => {
        setAud(aud);
      });
    }
  }, [currentTexture, frames, onLoad, textures]);

  useEffect(() => {
    const onUpdateTime = () => {
      if (
        aud?.currentTime > parseInt(frames[currentTexture + 1]?.startingTime)
      ) {
        setCurrentTexture((i) => i + 1);
        updateProgress({ uid, storyId });
      }
    };
    aud?.addEventListener("timeupdate", onUpdateTime);
    return () => {
      aud?.removeEventListener("timeupdate", onUpdateTime);
    };
  }, [aud, currentTexture, frames]);

  console.log(currentTexture);

  return (
    <mesh scale={[-1, 1, 1]} rotation={[0, Math.PI, 0]}>
      <sphereGeometry args={[600, 50, 40]} />
      <meshBasicMaterial map={textures[currentTexture]} side={BackSide} />
    </mesh>
  );
}

function WithinXR({ story, uid }) {
  const navigate = useNavigate();

  const frames = story.frames;

  const onLoad = (onEnterAR: (aud: HTMLAudioElement) => void) => {
    store.enterAR().then((s) => {
      const aud = new Audio(story.audio);
      aud.play();
      onEnterAR(aud);
      s?.addEventListener("end", () => {
        aud.src = "";
        navigate({ to: "/" });
      });
    });
  };

  return (
    <KXRStory frames={frames} onLoad={onLoad} uid={uid} storyId={story.id} />
  );
}

function RouteComponent() {
  const [story, setStory] = useState([]);
  const { id } = Route.useParams();

  useEffect(() => {
    const storiesRef = ref(database, "stories");
    onValue(storiesRef, (stories) => {
      const data = stories.val();
      setStory(data[id]);
    });
  }, []);

  return (
    <div className="story">
      <Canvas>
        <Suspense fallback={null}>
          <XR store={store}>
            <WithinXR story={story} uid={userId} />
          </XR>
        </Suspense>
      </Canvas>
    </div>
  );
}
