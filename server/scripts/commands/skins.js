const switchPlayerSkin = function (player, command, id) {
    if (!id) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [id].`);
        return false;
    };

    id = parseInt(id);

    if ((typeof id !== `number`) || isNaN(id)) {
        player.sendMessage(live.colors.red, `* Command help: id skin should be a number.`);
        return false;
    };

    if ((id < 0) || (id > 258)) {
        player.sendMessage(live.colors.red, `* Command help: id skin can be only ${live.colors.orange.toChatHex()}[0-258].`);
        return false;
    };

    if (live.skins.blacklist.has(id)) {
        player.sendMessage(live.colors.red, `* This skin id in black list.`);
        return false;
    };

    const playerSpawnProperties = live.playerSpawn;

    player.setSpawnInfo(id, 0, playerSpawnProperties.position, playerSpawnProperties.heading);
    player.sendMessage(live.colors.green, `* You change skin from ${live.colors.orange.toChatHex()}${player.modelId} ${live.colors.green.toChatHex()}to ${live.colors.orange.toChatHex()}${id}.`);
    player.modelId = id;
};

commandHandlers.add(`s`, switchPlayerSkin);
commandHandlers.add(`skin`, switchPlayerSkin);
commandHandlers.add(`setskin`, switchPlayerSkin);
commandHandlers.add(`model`, switchPlayerSkin);