const spawnPlayerVehicle = function (player, command, id) {
    if (!id) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [id].`);
        return false;
    };

    id = parseInt(id);

    if (typeof id !== `number` || isNaN(id)) {
        player.sendMessage(live.colors.red, `* Command help: id vehicle should be a number.`);
        return false;
    };

    if (id < 272 || id > 298) {
        player.sendMessage(live.colors.red, `* Command help: id vehicle can be only ${live.colors.orange.toChatHex()}[272-298].`);
        return false;
    };

    if (live.vehicles.blacklist.has(id)) {
        player.sendMessage(live.colors.red, `* This vehicle id in black list.`);
        return false;
    };

    const spawnPosition = player.position;
    const spawnRotation = new Vector3(0, 0, player.heading);

    const offsetRot = spawnRotation.z * (Math.PI / 180);
    spawnPosition.x = spawnPosition.x + 2 * Math.cos(offsetRot);
    spawnPosition.y = spawnPosition.y + 2 * Math.sin(offsetRot);

    const currentPlayerVehicle = player.getData(`myVehicle`);

    if (currentPlayerVehicle)
        currentPlayerVehicle.destroy();

    const createdVehicle = new Vehicle(id, spawnPosition, spawnRotation, 0, 0);

    player.setData(`myVehicle`, createdVehicle);
};

commandHandlers.add(`veh`, spawnPlayerVehicle);
commandHandlers.add(`vehicle`, spawnPlayerVehicle);