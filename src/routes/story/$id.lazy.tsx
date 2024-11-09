import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import './styles.scss';
import { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import { BackSide, TextureLoader } from 'three';
import { MOCK_STORY } from '../../mock.data.tsx';

const store = createXRStore();

export const Route = createLazyFileRoute('/story/$id')({
  component: RouteComponent,
});

function KXRStory({
  frames,
  onLoad,
}: {
  onLoad: (onEnterAR: (aud: HTMLAudioElement) => void) => void;
}) {
  const textures = useLoader(
    TextureLoader,
    frames.map(({ link }) => link)
  );
  const [currentTexture, setCurrentTexture] = useState(0);

  const [aud, setAud] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (textures) {
      onLoad(aud => {
        setAud(aud);
      });
    }
  }, [currentTexture, frames, onLoad, textures]);

  useEffect(() => {
    const onUpdateTime = () => {
      if (aud?.currentTime > frames[currentTexture + 1]?.startsAt) {
        setCurrentTexture(i => i + 1);
      }
    };
    aud?.addEventListener('timeupdate', onUpdateTime);
    return () => {
      aud?.removeEventListener('timeupdate', onUpdateTime);
    };
  }, [aud, currentTexture, frames]);

  return (
    <mesh scale={[-1, 1, 1]} rotation={[0, Math.PI, 0]}>
      <sphereGeometry args={[600, 50, 40]} />
      <meshBasicMaterial map={textures[currentTexture]} side={BackSide} />
    </mesh>
  );
}

function WithinXR({ story }) {
  const navigate = useNavigate();

  const frames = story.frames;

  const onLoad = (onEnterAR: (aud: HTMLAudioElement) => void) => {
    store.enterAR().then(s => {
      const aud = new Audio(story.audio);
      aud.play();
      onEnterAR(aud);
      s?.addEventListener('end', () => {
        aud.src = '';
        navigate({ to: '/' });
      });
    });
  };

  return <KXRStory frames={frames} onLoad={onLoad} />;
}

function RouteComponent() {
  // const { id } = Route.useParams();

  return (
    <div className="story">
      <Canvas>
        <Suspense fallback={null}>
          <XR store={store}>
            <WithinXR story={MOCK_STORY} />
          </XR>
        </Suspense>
      </Canvas>
    </div>
  );
}
