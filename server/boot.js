`use strict`;

init = function () {

    // Create global "live" object
    global.live = {};

    require(`./utils/extendBullyMpObject.js`);
    require(`./utils/extendPlayersObject.js`);
    require(`./utils/extendPlayerClass.js`);
    require(`./utils/extendVehicleClass.js`);
    require(`./utils/extendRGBClass.js`);
    require(`./utils/extendStringClass.js`);

    require(`./utils/commandHandler.js`);
    require(`./utils/colshapeConstructor.js`);

    require(`./positions/interiors.js`);
    require(`./positions/vehicles.js`);

    require(`./settings/colorsDefine.js`);
    require(`./settings/playerSpawn.js`);
    
    require(`./settings/skins.js`);
    require(`./settings/vehicles.js`);
    require(`./settings/weapons.js`);
    require(`./settings/worldProperties.js`);

    require(`./scripts/chat.js`);
    require(`./scripts/events.js`);
    require(`./scripts/interiors.js`);
    require(`./scripts/joinquit.js`);
    require(`./scripts/spawn.js`);
    require(`./scripts/vehicleSpawner.js`);
    require(`./scripts/gamemodeName.js`);
    
    require(`./scripts/commands/help.js`);
    require(`./scripts/commands/player.js`);
    require(`./scripts/commands/private.js`);
    require(`./scripts/commands/roleplaying.js`);
    require(`./scripts/commands/skins.js`);
    require(`./scripts/commands/utils.js`);
    require(`./scripts/commands/vehicle.js`);
    require(`./scripts/commands/warp.js`);
    require(`./scripts/commands/weapons.js`);
    require(`./scripts/commands/world.js`);
};

shutdown = function() {
    // EMPTY
};