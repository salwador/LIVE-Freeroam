const outputPlayerPosition = function (player) {
    const pos = player.position;
    const areaId = player.areaId;

    player.sendMessage(live.colors.green, `* Your position was saved into server log file.`);

    bullymp.print(`${player.name}(${player.id}) position is {x: ${pos.x}, y: ${pos.y}, z: ${pos.z}, area: ${areaId}}`);
};

commandHandlers.add(`pos`, outputPlayerPosition);

const outputPlayerID = function (player) {
    player.sendMessage(live.colors.blue, `* Your ID: ${live.colors.orange.toChatHex()}${player.id}.`);
};

commandHandlers.add(`id`, outputPlayerID);

// const outputDisplayText = function (player, command, id) {
//     player.displayGameText(`Test "${id}": ~${id}~ ABC`, 2, 1);
// };

// commandHandlers.add(`test`, outputDisplayText);

const outputServerOnline = function (player) {
    player.sendMessage(live.colors.blue, `* Current server online: ${live.colors.orange.toChatHex()}${bullymp.server.playerCount}/${bullymp.server.maxPlayers} ${live.colors.blue.toChatHex()}players.`);
};

commandHandlers.add(`online`, outputServerOnline);

// const spawnObject = function (player, command, id) {
//     const pos = player.position;

//     pos.z = pos.z + 1;

//     new WorldObject(parseInt(id), pos, new Vector3(0, 0, 0));

//     player.sendMessage(live.colors.green, `* Object ${live.colors.orange.toChatHex()}[${id}] ${live.colors.green.toChatHex()}was created.`);
// };

// commandHandlers.add(`obj`, spawnObject);