const printPlayerAction = function (player, command) {
    let fullText = ``;
    const argsCount = arguments.length;

    if (argsCount < 3) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [text].`);
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
    const playersInRange = bullymp.players.inRange(player.position, 30);

    fullText = `${playerName}(${player.id}) ${fullText}`.substr(0, 128);

    for (let rangedPlayer of playersInRange) {
        rangedPlayer.sendMessage(live.colors.pink, fullText);
    };
};

commandHandlers.add(`me`, printPlayerAction);