const printMessagePlayerJoin = function (player) {
    bullymp.print(`[JOIN] ${player.name}(${player.id}) has joined to server.`);

    const playerName = player.name.removeChatHex();

    bullymp.players.sendMessage(live.colors.green, `* ${player.color.toChatHex()}${playerName}(${player.id}) ${live.colors.green.toChatHex()}has joined to server.`, [player]);
};

eventHandlers.add(`onPlayerConnect`, printMessagePlayerJoin);

const printMessagePlayerQuit = function (player) {
    bullymp.print(`[QUIT] ${player.name}(${player.id}) leave from server.`);

    const playerName = player.name.removeChatHex();

    bullymp.players.sendMessage(live.colors.red, `* ${player.color.toChatHex()}${playerName}(${player.id}) ${live.colors.red.toChatHex()}leave from server.`);
};

eventHandlers.add(`onPlayerDisconnect`, printMessagePlayerQuit);