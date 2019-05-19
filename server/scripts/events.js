// Method for remove color code from player name
const removePlayerNameColorCode = function (player) {
    const playerName = player.name;
    const newPlayerName = playerName.removeChatHex();

    player.name = newPlayerName;
};

// Add event for upper method
eventHandlers.add("onPlayerConnect", removePlayerNameColorCode);


eventHandlers.add("onPlayerConnect",
    function (player) {
        for (let i = 0; i < 8; i++) {
            player.sendMessage(live.colors.white, ` `);
        };

        const playerName = player.name.removeChatHex();

        player.sendMessage(live.colors.blue, `* Welcome to the ${live.colors.orange.toChatHex()}LIVE Freeroam ${live.colors.blue.toChatHex()}server, ${playerName}!`);
        player.sendMessage(live.colors.blue, `* Server group link: ${live.colors.orange.toChatHex()}http://vk.com/live.freeroam`);
        player.sendMessage(live.colors.blue, `* Use ${live.colors.orange.toChatHex()}/help [1-3] ${live.colors.blue.toChatHex()}for get all commands.`);
        player.sendMessage(live.colors.blue, `* Default messages outputs in radius, use ${live.colors.orange.toChatHex()}/g [message] ${live.colors.blue.toChatHex()}for send it to all players.`);
    }
);

eventHandlers.add("onPlayerDisconnect",
    function (player) {
        const playerVehicle = player.getData(`myVehicle`);

        if (playerVehicle)
            playerVehicle.destroy();
    }
);