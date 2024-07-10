let games = [
  {
    id: "1",
    title: "Zelda, Tears of the Kingdom",
    platform: ["Switch"],
    releaseDate: "2023-05-12",
  },
  {
    id: "2",
    title: "Final Fantasy 7 Remake",
    platform: ["PS5", "Xbox"],
    releaseDate: "2023-05-12",
  },
  {
    id: "3",
    title: "Elden Ring",
    platform: ["PS5", "Xbox", "PC"],
    releaseDate: "2023-05-12",
  },
  {
    id: "4",
    title: "Mario Kart",
    platform: ["Switch"],
    releaseDate: "2023-05-12",
  },
  {
    id: "5",
    title: "Pokemon Scarlet",
    platform: ["PS5", "Xbox", "PC"],
    releaseDate: "2023-05-12",
  },
];

let authors = [
  {
    id: "1",
    name: "mario",
    password: "12345",
    verified: true,
    email: "mario@nintendo.com",
  },
  {
    id: "2",
    name: "yoshi",
    password: "12345",
    verified: false,
    email: "yoshi@nintendo.com",
  },
  {
    id: "3",
    name: "peach",
    password: "12345",
    verified: true,
    email: "peach@nintendo.com",
  },
];

let reviews = [
  { id: "1", rating: 9, content: "lorem ipsum", author_id: "1", game_id: "2" },
  { id: "2", rating: 10, content: "lorem ipsum", author_id: "2", game_id: "1" },
  { id: "3", rating: 7, content: "lorem ipsum", author_id: "3", game_id: "3" },
  { id: "4", rating: 5, content: "lorem ipsum", author_id: "2", game_id: "4" },
  { id: "5", rating: 8, content: "lorem ipsum", author_id: "2", game_id: "5" },
  { id: "6", rating: 7, content: "lorem ipsum", author_id: "1", game_id: "2" },
  { id: "7", rating: 10, content: "lorem ipsum", author_id: "3", game_id: "1" },
];

export default { games, authors, reviews };
