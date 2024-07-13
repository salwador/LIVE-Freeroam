const createInteriorColshapes = function () {
    for (let { areaIdIn, areaIdOut, inPosition, outPosition } of live.interiorsPositions) {
        const colshapeIn = new ColshapeSphere(inPosition, 2);
        const colshapeOut = new ColshapeSphere(outPosition, 2);

        const lighterPosition = inPosition;
        lighterPosition.z = lighterPosition.z - 0.1;
        const lighterObject = new WorldObject(2271, lighterPosition, new Vector3(0, 0, 0));

        colshapeIn.areaId = areaIdIn;
        colshapeOut.areaId = areaIdOut;

        colshapeIn.onenter = function (player) {
            if (!player.getData(`spawned`))
                return false;

            player.setData(`enterInterior`, {
                areaId: areaIdOut,
                position: outPosition
            }
            );

            player.sendMessage(live.colors.blue, `* Use ${live.colors.orange.toChatHex()}/enter${live.colors.blue.toChatHex()} for enter`);
        };

        colshapeOut.onenter = function (player) {
            if (!player.getData(`spawned`))
                return false;

            player.setData(`exitInterior`, {
                areaId: areaIdIn,
                position: inPosition
            }
            );

            player.sendMessage(live.colors.blue, `* Use ${live.colors.orange.toChatHex()}/exit${live.colors.blue.toChatHex()} for exit`);
        };

        colshapeIn.onleave = function (player) {
            player.setData(`enterInterior`, false);
        };

        colshapeOut.onleave = function (player) {
            player.setData(`exitInterior`, false);
        };
    };
};

createInteriorColshapes();

//////////////////////////////////////////////

const onPlayerTypeEnterIntCommand = function (player) {
    const transitionInfo = player.getData(`enterInterior`);

    if (!transitionInfo)
        return false;

    if (player.inVehicle) {
        player.sendMessage(live.colors.red, `* Leave vehicle for enter`);
        return false;
    };

    player.areaTransition(transitionInfo.areaId, transitionInfo.position);

    player.setData(`enterInterior`, false);
};

commandHandlers.add(`enter`, onPlayerTypeEnterIntCommand);


const onPlayerTypeExitIntCommand = function (player) {
    const transitionInfo = player.getData(`exitInterior`);

    if (!transitionInfo)
        return false;

    if (player.inVehicle) {
        player.sendMessage(live.colors.red, `* Quit vehicle for leave`);
        return false;
    };

    player.areaTransition(transitionInfo.areaId, transitionInfo.position);

    player.setData(`exitInterior`, false);
};

commandHandlers.add(`exit`, onPlayerTypeExitIntCommand);
