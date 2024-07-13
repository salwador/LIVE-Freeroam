// Storage for save information about players in vehicle
const playersInVehicle = new Set();

// Method for add player in upper storage
const setPlayerInVehicleProperty = function (player) {
    playersInVehicle.add(player);
};

// Add event for upper method
// We should call that for update info about player in vehicle
bullymp.events.add("playerEnterVehicle", setPlayerInVehicleProperty);

// Method for remove player from upper storage
const removePlayerInVehicleProperty = function (player) {
    playersInVehicle.delete(player);
};

// Add event for upper method
// We should call that for update info about player in vehicle
bullymp.events.add("playerExitVehicle", removePlayerInVehicleProperty);

// Method for create object LIVE properties
const createPlayerLiveProperties = function (player) {
    player.live = {
        properties: {}
    };

    // Adding property "player.inVehicle" for check, player is in vehicle or not
    Object.defineProperty(player, `inVehicle`,
        {
            get: function () {
                const playerInVehicle = playersInVehicle.has(this);

                return playerInVehicle;
            }
        }
    );

    // Adding property "player.alive" for check, player is alive or not
    Object.defineProperty(player, `alive`,
        {
            get: function () {
                return this.health > 0;
            }
        }
    );

    // Method "player.kill()" for not use "player.hp" setter
    player.kill = function () {
        if (this.health <= 0)
            return false;

        this.health = 0;

        return true;
    };

    // Method "Player.setData()" for set object properties
    player.setData = function (name, value) {
        this.live.properties[name] = value;

        return true;
    }; 

    // Method "Player.getData()" for get object properties
    player.getData = function (name) {
        return this.live.properties[name] || false;
    };

    // Method "Player.getData()" for send chat message
    player.sendMessage = function (color, message) {
        return chat.send(this, color, message);
    };
};

// Add event for upper method
bullymp.events.add("playerJoin", createPlayerLiveProperties);
