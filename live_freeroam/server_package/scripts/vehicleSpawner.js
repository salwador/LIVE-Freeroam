const loadedVehiclesBySpawner = [];
const respawnDelay = 120;

const createVehicles = function () {
    const currentUptime = bullymp.uptime;

    for (let { id, pos, heading } of live.vehiclesSpawnPositions) {
        const vehiclePosition = new Vector3(pos.x, pos.y, pos.z),
            color1 = Math.round(3 * Math.random()),
            color2 = Math.round(3 * Math.random());

        const vehicle = new Vehicle(id, vehiclePosition, heading, color1, color2);

        vehicle.setData(`internalVehicle`, true);
        vehicle.setData(`lastSeat`, currentUptime);
        vehicle.setData(`respawnInfo`, { vehiclePosition, heading });

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

bullymp.events.add("playerEnterVehicle", refreshVehicleLastUseTime);
bullymp.events.add("playerExitVehicle", refreshVehicleLastUseTime);

////////////////////////////////

const resetVehiclesTimer = function () {
    const currentUptime = bullymp.uptime;

    for (let vehicle of loadedVehiclesBySpawner) {
        if (!vehicle.driver && vehicle.getData(`isUsed`)) {
            if (vehicle.getData(`lastSeat`) < currentUptime) {
                vehicle.setData(`isUsed`, false);

                const respawnInfo = vehicle.getData(`respawnInfo`);

                vehicle.position = respawnInfo.vehiclePosition;
                vehicle.rotation = Vector3(0, 0, respawnInfo.heading);
            };
        };
    };

    setTimeout(resetVehiclesTimer, 1000 * 1);
};

setTimeout(resetVehiclesTimer, 1000 * 1);

////////////////////////////////

createVehicles();