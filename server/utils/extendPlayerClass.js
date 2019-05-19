// Storage for save information about players in vehicle
const playersInVehicle = new Set();

// Method for add player in upper storage
const setPlayerInVehicleProperty = function (player) {
    playersInVehicle.add(player);
};

// Add event for upper method
// We should call that for update info about player in vehicle
eventHandlers.add("onPlayerEnterVehicle", setPlayerInVehicleProperty);

// Method for remove player from upper storage
const removePlayerInVehicleProperty = function (player) {
    playersInVehicle.delete(player);
};

// Add event for upper method
// We should call that for update info about player in vehicle
eventHandlers.add("onPlayerExitVehicle", removePlayerInVehicleProperty);

// Adding property "player.inVehicle" for check, player is in vehicle or not
Object.defineProperty(Player.prototype, `inVehicle`,
    {
        get: function () {
            const playerInVehicle = playersInVehicle.has(this);

            return playerInVehicle;
        }
    }
);

// Adding property "player.alive" for check, player is alive or not
Object.defineProperty(Player.prototype, `alive`,
    {
        get: function () {
            return this.health > 0;
        }
    }
);

// Method "player.kill()" for not use "player.hp" setter
Player.prototype.kill = function () {
    if (this.health <= 0)
        return false;

    this.health = 0;

    return true;
};

// Method for create object LIVE properties
const createPlayerLiveProperties = function (player) {
    player.live = {
        properties: {}
    };
};

// Add event for upper method
eventHandlers.add("onPlayerConnect", createPlayerLiveProperties);

// Method "Player.setData()" for set object properties
Player.prototype.setData = function (name, value) {
    this.live.properties[name] = value;

    return true;
};

// Method "Player.getData()" for get object properties
Player.prototype.getData = function (name) {
    return this.live.properties[name] || false;

    return true;
};
