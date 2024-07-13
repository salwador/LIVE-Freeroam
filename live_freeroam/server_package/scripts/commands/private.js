const sendPlayerPrivateMessage = function (player, command, id) {
    if (!id || arguments.length < 4) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [id] [message].`);
        return false;
    };

    id = parseInt(id);

    if ((typeof id !== `number`) || isNaN(id)) {
        player.sendMessage(live.colors.red, `* Command help: id should be a number.`);
        return false;
    };

    if (id == player.id) {
        player.sendMessage(live.colors.red, `* You not can send messages to yourself.`);
        return false;
    };

    const toPlayer = bullymp.players[id];

    if (!toPlayer) {
        player.sendMessage(live.colors.red, `* Player with id ${live.colors.orange.toChatHex()}${id} ${live.colors.red.toChatHex()}not found.`);
        return false;
    };

    let fullText = ``;

    for (let i = 3; i < arguments.length; i++) {
        fullText = `${fullText} ${arguments[i]}`;
    };

    fullText = fullText.trim();

    if (fullText.length == 0)
        return false;

    const playerName = player.name.removeChatHex();
    const toPlayerName = toPlayer.name.removeChatHex();

    fullTextToPlayer = `PM from ${player.color.toChatHex()}${playerName}(${player.id}): ${live.colors.white.toChatHex()}${fullText}`.substr(0, 128);
    toPlayer.sendMessage(live.colors.yellow, fullTextToPlayer);

    fullTextToSender = `PM to ${toPlayer.color.toChatHex()}${toPlayerName}(${toPlayer.id}): ${live.colors.white.toChatHex()}${fullText}`.substr(0, 128);
    player.sendMessage(live.colors.orange, fullTextToSender);

    return true;
};

commandHandlers.add(`msg`, sendPlayerPrivateMessage);
commandHandlers.add(`pm`, sendPlayerPrivateMessage);
commandHandlers.add(`message`, sendPlayerPrivateMessage);