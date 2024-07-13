// Table for save created colshapes
const createdColshapes = {};

// Value for save previously colshape id
// Is -1 if colshapes never create
let allowedID = -1;

// Constructor for create colshape sphere
class ColshapeSphere {
    constructor(position, scale) {

        // Change allowedID for get next value
        allowedID++;

        // Apply colshape ID
        this.id = allowedID;

        // Set colshape info
        this.position = position;
        this.scale = scale;
        this.areaId = 0;
        this.__playersInside = new Set();

        // Set LIVE special property
        this.live = {
            properties: {}
        };

        // Save created colshape into our table
        createdColshapes[allowedID] = this;

        return this;
    }
};

// Method "ColshapeSphere.setData()" for set object properties
ColshapeSphere.prototype.setData = function (name, value) {
    this.live.properties[name] = value;

    return true;
};

// Method "ColshapeSphere.getData()" for get object properties
ColshapeSphere.prototype.getData = function (name) {
    return this.live.properties[name] || false;

    return true;
};

// Method for parse players and colshapes, for call "colshape.onenter" and "colshape.onleave" callbacks 
const checkPlayersInColshapes = function () {

    // Parse players
    for (let i = 0; i < bullymp.players.length; i++) {
        const player = bullymp.players[i];

        // If player not exists, then skip iteration by "continue"
        if (!player)
            continue;

        // Parse colshapes
        for (let colshapeID in createdColshapes) {
            const colshape = createdColshapes[colshapeID];

            const distance = bullymp.getDistanceBetweenVectors(player.position, colshape.position);

            // If player in sphere range, and have same areaId
            if ((distance <= colshape.scale) && (colshape.areaId == player.areaId)) {

                // If player not in this colshape early
                if (!colshape.__playersInside.has(player)) {

                    // If colshape have "enter" callback, call it
                    if (colshape.onenter)
                        colshape.onenter(player);

                    // Add player into colshape info
                    colshape.__playersInside.add(player);
                };

                // If player not in sphere range, or in different areaId
            } else {

                // If player early been in this colshape
                if (colshape.__playersInside.has(player)) {

                    // If colshape have "leave" callback, call it
                    if (colshape.onleave)
                        colshape.onleave(player)

                    // Remove player from colshape info
                    colshape.__playersInside.delete(player);
                };
            };
        };
    };

    // Set timeout again, for check in next 50 ms.
    setTimeout(checkPlayersInColshapes, 50);
};

// Bully Multiplayer not have setInterval, we use timeout for call upper method
setTimeout(checkPlayersInColshapes, 50);

// Define global constructor, because we wanna call it from any script
global.ColshapeSphere = ColshapeSphere;

// Medhod for remove player from all colshapes, if he leave from server
const removePlayerFromAllColshapes = function (player) {
    for (let colshapeID in createdColshapes) {
        const colshape = createdColshapes[colshapeID];

        if (colshape.__playersInside.has(player))
            colshape.__playersInside.delete(player);
    };
};

// Add event for upper method
bullymp.events.add("playerQuit", removePlayerFromAllColshapes);