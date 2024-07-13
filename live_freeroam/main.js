`use strict`;

const init = function () {
	
    // Create global "live" object
    global.live = {};

    global.chat = bullymp.events.call('get_chat')[0];

    require(`./server_package/utils/extendBullyMpObject.js`);
    require(`./server_package/utils/extendPlayersObject.js`);
    require(`./server_package/utils/extendPlayerClass.js`);
    require(`./server_package/utils/extendVehicleClass.js`);
    require(`./server_package/utils/extendRGBClass.js`);
    require(`./server_package/utils/extendStringClass.js`);

    require(`./server_package/utils/commandHandler.js`);
    require(`./server_package/utils/colshapeConstructor.js`);

    require(`./server_package/positions/interiors.js`);
    require(`./server_package/positions/vehicles.js`);

    require(`./server_package/settings/colorsDefine.js`);
    require(`./server_package/settings/playerSpawn.js`);
    
    require(`./server_package/settings/skins.js`);
    require(`./server_package/settings/vehicles.js`);
    require(`./server_package/settings/weapons.js`);
    require(`./server_package/settings/worldProperties.js`);

    require(`./server_package/scripts/chat.js`);
    require(`./server_package/scripts/events.js`);
    require(`./server_package/scripts/interiors.js`);
    require(`./server_package/scripts/joinquit.js`);
    require(`./server_package/scripts/spawn.js`);
    require(`./server_package/scripts/vehicleSpawner.js`);
    require(`./server_package/scripts/gamemodeName.js`);
    
    require(`./server_package/scripts/commands/help.js`);
    require(`./server_package/scripts/commands/player.js`);
    require(`./server_package/scripts/commands/private.js`);
    require(`./server_package/scripts/commands/roleplaying.js`);
    require(`./server_package/scripts/commands/skins.js`);
    require(`./server_package/scripts/commands/utils.js`);
    require(`./server_package/scripts/commands/vehicle.js`);
    require(`./server_package/scripts/commands/warp.js`);
    require(`./server_package/scripts/commands/weapons.js`);
    require(`./server_package/scripts/commands/world.js`);
};

init();