import { get, ref, set } from "firebase/database";
import { database } from "./config.ts";

export const updateProgress = async ({ uid, storyId }) => {
  console.log("UPDATE PROGRESS", uid, storyId);
  const snapshot = await get(ref(database, `user/${uid}`));
  if (snapshot.exists()) {
    console.log("USER", snapshot.val());
    const user = snapshot.val();

    console.log(user.progress);

    user.progress = user.progress.map((el) => {
      console.log(el);
      if (Object.keys(el)[0] === storyId) {
        console.log({
          [storyId]: Object.values(el)[0] + 1,
        });
        return {
          [storyId]: Object.values(el)[0] + 1,
        };
      } else {
        return el;
      }
    });

    await set(ref(database, `user/${uid}`), user);

    console.log(user.progress);
  }
};
