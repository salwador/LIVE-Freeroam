const helpTexts = [
    [
        `/id ${live.colors.white.toChatHex()}- Show my ID;`,
        `/heal|hp ${live.colors.white.toChatHex()}- Restore my health;`,
        `/kill ${live.colors.white.toChatHex()}- Suicide;`,
        `/spawn ${live.colors.white.toChatHex()}- Respawn;`,
        `/me [text] ${live.colors.white.toChatHex()}- Roleplay actions;`,
        `/pm|msg|message [id] [message] ${live.colors.white.toChatHex()}- Private message;`,
        `/goto|go|warp|tp [id] ${live.colors.white.toChatHex()}- Teleport to player;`,
    ],
    [
        `/settime|time|t [hour] [minute] ${live.colors.white.toChatHex()}- Set world time;`,
        `/setweather|weather [id] ${live.colors.white.toChatHex()}- Set world weather;`,
        `/setseason|season [id] ${live.colors.white.toChatHex()}- Set world season;`,
        `/setskin|skin|s|model [id] ${live.colors.white.toChatHex()}- Change player skin;`,
        `/weapon|wp|give|gw [id] ${live.colors.white.toChatHex()}- Spawn weapon;`,
        `/weaponlist ${live.colors.white.toChatHex()}- Show all available weapons;`,
        `/skateboard|sk8board|skate ${live.colors.white.toChatHex()}- Take skateboard;`,
    ],
    [
        `/g [message]${live.colors.white.toChatHex()}- Send message to global chat;`,
        `/lock ${live.colors.white.toChatHex()}- Allow/Block incoming teleports;`,
        `/count ${live.colors.white.toChatHex()}- Start count for races;`,
        `/online ${live.colors.white.toChatHex()}- Output current server online;`,
        `/infammo ${live.colors.white.toChatHex()}- Enable/Disable infinity ammo;`,
        `/vehicle|veh ${live.colors.white.toChatHex()}- Spawn vehicle;`,
        `/tp ${live.colors.white.toChatHex()}- Show all locations list;`
    ]
];

const printPlayerHelpText = function (player, command, id) {
    if (!id)
        id = 1;
    else {
        id = parseInt(id);

        if (typeof id !== `number` || isNaN(id)) {
            player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [1-${helpTexts.length}]`);
            return false;
        };
    };

    player.sendMessage(live.colors.white, `================`);

    const helpTextsList = helpTexts[id - 1];

    if (helpTextsList) {
        for (const message of helpTextsList) {
            player.sendMessage(live.colors.orange, message);
        };

        player.sendMessage(live.colors.orange, `/${command} [1-${helpTexts.length}] ${live.colors.white.toChatHex()}- Help list`);
    } else {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [1-${helpTexts.length}]`);
    };
};

commandHandlers.add(`help`, printPlayerHelpText);
commandHandlers.add(`h`, printPlayerHelpText);