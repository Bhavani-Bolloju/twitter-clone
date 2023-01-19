import { addDoc, collection } from "firebase/firestore";

export const userPostsData = async function (database) {
  const users = [
    {
      userId: "vjUPQ4v3UFcSdb8fgE0Ir5j5A363",
      // photoId: "",
      imageSrc: "https://wallpapercave.com/uwp/uwp2193641.jpeg",
      caption: "Itachi Vs Sasuke, who would win? 💥",
    },
    {
      userId: "TYASAqTNOoSY4t9KXspEeinldG62",
      // photoId: "",
      imageSrc:
        "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-760x428,f_auto,q_auto:best/MSNBC/Components/Video/201705/x_tdy_ov_pop_friends_170501.jpg",
      caption: "We had a blast 💣💣. #FriendsForever 💃🥰",
    },
    {
      userId: "AR3PeiwnE2VOWUY818kWAx0NaKo1",
      // photoId: "",
      imageSrc:
        "https://w0.peakpx.com/wallpaper/999/880/HD-wallpaper-eren-yeager-attack-on-titan-shingeki-no-kyojin-manga-mikasa-anime-levi-thumbnail.jpg",
      caption: "Guess who's back 😎😎 ",
    },
  ];

  for (let i = 0; i < users.length; i++) {
    await addDoc(collection(database, "posts"), { ...users[i], photoId: i });
  }
};
