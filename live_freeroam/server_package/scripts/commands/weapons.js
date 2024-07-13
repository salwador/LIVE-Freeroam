const outputAvailableWeaponsList = function (player) {
    player.sendMessage(live.colors.blue, `* All available weapon id's on server:`);
    player.sendMessage(live.colors.blue, `${live.colors.orange.toChatHex()}3, 5, 7, 8, 9, 11, 14, 15, 23, 139.`);
};

commandHandlers.add(`weaponlist`, outputAvailableWeaponsList);

const givePlayerSkateboard = function (player) {
    player.giveWeapon(139);
};

commandHandlers.add(`skateboard`, givePlayerSkateboard);
commandHandlers.add(`sk8board`, givePlayerSkateboard);
commandHandlers.add(`skate`, givePlayerSkateboard);

const givePlayerWeapon = function (player, command, id, ammo) {
    if (!id) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [id].`);
        return false;
    };

    id = parseInt(id);

    if (typeof id !== `number` || isNaN(id)) {
        player.sendMessage(live.colors.red, `* Command help: id weapon should be a number.`);
        return false;
    };

    if (id < 0 || id > 139) {
        player.sendMessage(live.colors.red, `* Command help: id weapon can be only ${live.colors.orange.toChatHex()}[0-139].`);
        return false;
    };

    if (live.weapons.blacklist.has(id)) {
        player.sendMessage(live.colors.red, `* This weapon id in black list.`);
        return false;
    };

    player.giveWeapon(id);
    player.giveAmmo(id, 64);
};

commandHandlers.add(`weapon`, givePlayerWeapon);
commandHandlers.add(`wp`, givePlayerWeapon);
commandHandlers.add(`give`, givePlayerWeapon);
commandHandlers.add(`gw`, givePlayerWeapon);