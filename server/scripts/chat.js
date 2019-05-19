const printLocalChatMessage = function (player, text) {
    for (let char of text) {
        if (char.charCodeAt() == 65533) {
            player.sendMessage(live.colors.red, `* Bully Multiplayer supports ${live.colors.orange.toChatHex()}only cyrillic ${live.colors.red.toChatHex()}chars`);
            return false;
        };
    };

    text = text.removeChatHex();

    const playerName = player.name.removeChatHex();
    const playersInRange = bullymp.players.inRange(player.position, 30);

    const fullText = `${playerName}(${player.id}): ${text}`.substr(0, 128);

    for (const rangedPlayer of playersInRange) {
        rangedPlayer.sendMessage(live.colors.lightgray, fullText);
    };

    if (playersInRange.length <= 1)
        player.sendMessage(live.colors.red, `* Nearby you ${live.colors.orange.toChatHex()}0 ${live.colors.red.toChatHex()}players. For send message into global, use ${live.colors.orange.toChatHex()}/g [text]`);

    bullymp.print(`[CHAT] ${player.name}(${player.id}): ${text}`);

    // Return false for disable default chat message
    return false;
};

eventHandlers.add("onPlayerText", printLocalChatMessage);

const printGlobalChatMessage = function (player, command) {
    let fullText = ``;
    const argsCount = arguments.length;

    if (argsCount < 3) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [message].`);
        return false;
    };

    for (let i = 2; i < argsCount; i++) {
        fullText = `${fullText} ${arguments[i]}`
    };

    fullText = fullText.removeChatHex();
    fullText = fullText.trim();

    if (fullText.length == 0)
        return false;

    const playerName = player.name.removeChatHex();

    bullymp.print(`[GLOBAL] ${player.name}(${player.id}): ${fullText}`);

    fullText = `${playerName}(${player.id}): ${live.colors.white.toChatHex()}${fullText}`.substr(0, 128);

    bullymp.players.sendMessage(player.color, fullText);
};

commandHandlers.add(`g`, printGlobalChatMessage);