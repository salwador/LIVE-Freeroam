const spawnPlayer = function (player) {
    const playerSpawnProperties = live.playerSpawn;

    player.heading = playerSpawnProperties.heading;

    if (!player.getData(`spawned`)) {
        player.setData(`spawned`, true);

        player.setSpawnInfo(Math.round(2 + 16 * Math.random()), 0, playerSpawnProperties.position, playerSpawnProperties.heading);
        player.spawn();
    };
};

eventHandlers.add("onPlayerSpawn", spawnPlayer);