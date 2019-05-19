const killPlayer = function (player) {
    player.sendMessage(live.colors.green, `* You kill yourself.`);
    player.kill();
};

commandHandlers.add(`kill`, killPlayer);

const respawnPlayer = function (player) {
    if (player.inVehicle) {
        player.sendMessage(live.colors.red, `* Respawn from vehicle can cause crash your client.`);
        player.sendMessage(live.colors.red, `* Try use ${live.colors.orange.toChatHex()}/kill ${live.colors.red.toChatHex()}, it more safety.`);
        return false;
    };

    player.spawn();
};

commandHandlers.add(`spawn`, respawnPlayer);
commandHandlers.add(`respawn`, respawnPlayer);

const infinityAmmoControl = function (player) {
    player.hasInfiniteAmmo = !player.hasInfiniteAmmo;

    if (player.hasInfiniteAmmo)
        player.sendMessage(live.colors.green, `* You enable infinity ammo.`);
    else
        player.sendMessage(live.colors.red, `* You disable infinity ammo.`);
};

commandHandlers.add(`infammo`, infinityAmmoControl);

const healPlayer = function (player) {
    player.sendMessage(live.colors.green, `* You restore full health.`);
    player.health = 200;
};

commandHandlers.add(`heal`, healPlayer);
commandHandlers.add(`hp`, healPlayer);