exports.requestEntry = (e, location, socket, playerName) => {
  e.preventDefault();
  console.log(`€ Request entry with socket: ${socket.id}`, socket);
  socket.emit("Request entry", {
    roomName: location.pathname.slice(1),
    playerName: playerName,
  });
};

exports.createRoomName = () => {
  const roomAdjs = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "white",
    "black",
  ];
  const roomNouns = ["alligator", "bison", "cat", "duck", "eel", "fox", "goat"];
  let adj = roomAdjs[Math.floor(Math.random() * roomAdjs.length)];
  let noun = roomNouns[Math.floor(Math.random() * roomNouns.length)];
  return `${adj}${noun}`;
};

exports.makeDummyName = (id) => {
  if (!id) {
    throw "No id provided to makeDummyName.";
  }

  const firstNames = [
    "alexandra",
    "billy",
    "cameron",
    "daniela",
    "edward",
    "frankie",
    "geraldine",
    "helena",
    "imogen",
    "julianne",
    "katherine",
    "leanne",
    "michael",
    "norbert",
    "oliver",
    "patricia",
    "quentin",
    "roberto",
    "samantha",
    "timothy",
    "umberto",
    "valerie",
    "william",
    "xanthia",
    "yorkie",
    "zachary",
  ];
  let firstName;
  let prefix = "";
  let lastIndex;

  id.split("").forEach((char, index) => {
    if (!firstName) {
      if (!/\d/.test(char)) {
        firstName = firstNames
          .find((name) => name[0] === char.toLowerCase())
          .split("");
        firstName[0] = id[index];
        firstName[1] = id[index + 1];
        lastIndex = index + 2;
      } else {
        prefix += char.toString();
      }
    }
  });

  return `${prefix}${firstName.join("")} ${id.slice(lastIndex, lastIndex + 2)}`;
};