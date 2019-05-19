const loadedVehiclesBySpawner = [];
const respawnDelay = 120;

const createVehicles = function () {
    const currentUptime = bullymp.uptime;

    for (let { id, pos, heading } of live.vehiclesSpawnPositions) {
        const vehiclePosition = new Vector3(pos.x, pos.y, pos.z),
            color1 = Math.round(3 * Math.random()),
            color2 = Math.round(3 * Math.random()),
            rotation = new Vector3(0, 0, heading);

        const vehicle = new Vehicle(id, vehiclePosition, rotation, color1, color2);

        vehicle.setData(`internalVehicle`, true);
        vehicle.setData(`lastSeat`, currentUptime);
        vehicle.setData(`respawnInfo`, { vehiclePosition, rotation });

        loadedVehiclesBySpawner.push(vehicle);
    };
};

////////////////////////////////

const refreshVehicleLastUseTime = function (player, vehicle) {
    if (!vehicle.getData(`internalVehicle`))
        return;

    vehicle.setData(`lastSeat`, bullymp.uptime + respawnDelay);

    if (!vehicle.getData(`isUsed`))
        vehicle.setData(`isUsed`, true);
};

eventHandlers.add("onPlayerEnterVehicle", refreshVehicleLastUseTime);
eventHandlers.add("onPlayerExitVehicle", refreshVehicleLastUseTime);

////////////////////////////////

const resetVehiclesTimer = function () {
    const currentUptime = bullymp.uptime;

    for (let vehicle of loadedVehiclesBySpawner) {
        if (!vehicle.occupied && vehicle.getData(`isUsed`)) {
            if (vehicle.getData(`lastSeat`) < currentUptime) {
                vehicle.setData(`isUsed`, false);

                const respawnInfo = vehicle.getData(`respawnInfo`);

                vehicle.position = respawnInfo.vehiclePosition;
                vehicle.rotation = respawnInfo.rotation;
            };
        };
    };

    setTimeout(resetVehiclesTimer, 1000 * 1);
};

setTimeout(resetVehiclesTimer, 1000 * 1);

////////////////////////////////

createVehicles();