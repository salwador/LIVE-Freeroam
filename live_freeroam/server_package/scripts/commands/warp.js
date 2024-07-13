const lockWarpToMeControl = function (player) {
    if (player.getData(`warpLocked`)) {
        player.setData(`warpLocked`, false);
        player.sendMessage(live.colors.green, `* Now players can teleporting to you.`);
    } else {
        player.setData(`warpLocked`, true);
        player.sendMessage(live.colors.red, `* Now players not can't teleporting to you.`);
    };
};

commandHandlers.add(`lock`, lockWarpToMeControl);

const warpToPlayer = function (player, command, id) {
    if (!id) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [id].`);
        return false;
    };

    id = parseInt(id);

    if (typeof id !== `number` || isNaN(id)) {
        player.sendMessage(live.colors.red, `* Command help: id should be a number.`);
        return false;
    };

    if (id == player.id) {
        player.sendMessage(live.colors.red, `* You not can teleport to yourself.`);
        return false;
    };

    const gotoPlayer = bullymp.players[id];

    if (!gotoPlayer) {
        player.sendMessage(live.colors.red, `* Player with id ${live.colors.orange.toChatHex()}${id} ${live.colors.red.toChatHex()}not found.`);
        return false;
    };

    if (gotoPlayer.getData(`warpLocked`)) {
        player.sendMessage(live.colors.red, `* This player disable incoming teleports.`);
        return false;
    };

    const playerName = player.name.removeChatHex();
    const gotoPlayerName = gotoPlayer.name.removeChatHex();

    if (player.areaId == gotoPlayer.areaId)
        player.position = gotoPlayer.position;
    else
        player.areaTransition(gotoPlayer.areaId, gotoPlayer.position);

    player.sendMessage(live.colors.green, `* You teleported to ${gotoPlayer.color.toChatHex()}${gotoPlayerName}(${id})${live.colors.green.toChatHex()}.`);
    gotoPlayer.sendMessage(live.colors.blue, `* Player ${player.color.toChatHex()}${playerName}(${player.id}) ${live.colors.blue.toChatHex()}teleported to you.`);
};

commandHandlers.add(`goto`, warpToPlayer);
commandHandlers.add(`warp`, warpToPlayer);
commandHandlers.add(`go`, warpToPlayer);
commandHandlers.add(`tp`, warpToPlayer);


// commandHandlers.add(`eval`, function(player) {
//     const argumentsCount = arguments.length;
    
//     let callText = ``;

//     if (argumentsCount <= 2)
//         return false;

//     for (let i = 2; i < argumentsCount; i++) {
//         callText = `${callText} ${arguments[i]}`;
//     };

//     callText = callText.trim();

//     console.log(callText);
    
    
//     try {
//         let result = eval(callText);
//         player.sendMessage(live.colors.green, `EVAL: ${result}`);
//     } catch (e) {
//         player.sendMessage(live.colors.red, `EVAL: ${e}`);
//     };
// });