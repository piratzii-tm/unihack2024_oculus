import { createLazyFileRoute } from "@tanstack/react-router";
import KStoryTile from "../components/KStoryTile.tsx";
import "./index.scss";
import { Fragment, useEffect, useState } from "react";
import { database } from "../backend/config.ts";
import { onValue, ref } from "firebase/database";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);

  const userId = "vxogTMCuCqWeVwE1wZ63j85MRIj2";

  useEffect(() => {
    const usersRef = ref(database, "user");
    onValue(usersRef, (userSnap) => {
      if (userSnap.exists()) {
        let data = userSnap.val();
        data = data[userId];

        const storiesRef = ref(database, "stories");
        onValue(storiesRef, (storiesSnap) => {
          const userStories = storiesSnap.val();

          const aux = Object.keys(userStories).map((el) => {
            if ((data.stories.includes(el), el, data.stories)) {
              return userStories[el];
            }
          });
          const unique = aux.filter(
            (value, index, array) => array.indexOf(value) === index,
          );
          setStories(unique);
        });

        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div className="app">
      <div className="app__stories">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          stories.map((s, index) => (
            <Fragment key={index}>
              <KStoryTile img={s.frames[0].link} title={s.id} id={s.id} />
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
