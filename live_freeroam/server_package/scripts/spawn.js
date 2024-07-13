const spawnPlayer = function (player) {
    const playerSpawnProperties = live.playerSpawn;

    if (!player.getData(`spawned`)) {
        player.setData(`spawned`, true);
        
        player.spawn(Math.round(2 + 16 * Math.random()), 0, playerSpawnProperties.position, playerSpawnProperties.heading);
    };
};

bullymp.events.add("playerJoin", spawnPlayer);

const respawnPlayer = function (player) {    
    const playerSpawnProperties = live.playerSpawn;

    player.spawn(player.modelId, 0, playerSpawnProperties.position, playerSpawnProperties.heading);
};

bullymp.events.add("playerKnockedOut", respawnPlayer);