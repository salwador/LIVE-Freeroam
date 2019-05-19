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