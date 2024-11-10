import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import "./styles.scss";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { BackSide, TextureLoader } from "three";
import { get, onValue, ref } from "firebase/database";
import { database } from "../../backend/config.ts";
import { updateProgress } from "../../backend/updateProgress.ts";
import { userId } from "../index.lazy.tsx";
import KSoundProgressPicker from "../../components/KSoundProgressPicker.tsx";
import { Html } from "@react-three/drei";

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

  const getCurrentIndex = async () => {
    const snapshot = await get(ref(database, `user/${userId}`));
    if (snapshot.exists()) {
      let currentIndex = Object.values(snapshot.val().progress).filter((el) => {
        return Object.keys(el)[0] === storyId;
      })[0];
      currentIndex = Object.values(currentIndex)[0];
      console.log("currentIndex", currentIndex);
      setCurrentTexture(currentIndex);
    }
  };

  useEffect(() => {
    getCurrentIndex();
  }, []);

  const [aud, setAud] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (textures) {
      onLoad((aud) => {
        setAud(aud);
      });
    }
  }, [currentTexture, frames, onLoad, textures]);

  useEffect(() => {
    const onUpdateTime = async () => {
      if (
        aud?.currentTime > parseInt(frames[currentTexture + 1]?.startingTime)
      ) {
        setCurrentTexture((i) => i + 1);
        await updateProgress({ uid, storyId, currentTexture });
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

  const progressRef = useRef();

  const getCurrentIndex = async () => {
    const snapshot = await get(ref(database, `user/${userId}`));
    if (snapshot.exists()) {
      let currentIndex = Object.values(snapshot.val().progress).filter((el) => {
        return Object.keys(el)[0] === story.id;
      })[0];
      currentIndex = Object.values(currentIndex)[0];
      console.log("currentIndex", currentIndex);
      return currentIndex;
    }
  };

  const frames = story.frames;

  const onLoad = (onEnterAR: (aud: HTMLAudioElement) => void) =>
    getCurrentIndex().then((currentTexture) => {
      store.enterAR().then((s) => {
        const aud = new Audio(story.audio);
        aud.play().then(() => {
          console.log(aud.currentTime, parseInt(frames[currentTexture]));
          aud.currentTime = parseInt(frames[currentTexture]?.startingTime);
          console.log(
            aud.currentTime,
            parseInt(frames[currentTexture]?.startingTime),
          );
        });

        onEnterAR(aud);
        aud.addEventListener("timeupdate", () => {
          if (progressRef.current) {
            progressRef.current.setProgress(aud.currentTime);
            progressRef.current.setDuration(aud.duration);
          }
        });
        s?.addEventListener("end", () => {
          aud.src = "";
          navigate({ to: "/" });
        });
      });
    });

  return (
    // <KXRStory frames={frames} onLoad={onLoad} uid={uid} storyId={story.id} />
    <>
      <KXRStory frames={frames} onLoad={onLoad} uid={uid} storyId={story.id} />
      <Html position={[0, -1, -3]}>
        <KSoundProgressPicker ref={progressRef} />
      </Html>
    </>
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
