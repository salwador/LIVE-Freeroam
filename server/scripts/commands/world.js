const settings = {
    seasonChangeLastTime: 0,
    timeChangeLastTime: 0,
    weatherChangeLastTime: 0
};

const playerChangeSeason = function (player, command, id) {
    if (!id) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [id].`);
        return false;
    };

    id = parseInt(id);

    if ((typeof id !== `number`) || isNaN(id)) {
        player.sendMessage(live.colors.red, `* Command help: id season should be a number.`);
        return false;
    };

    if ((id < 0) || (id > 3)) {
        player.sendMessage(live.colors.red, `* Command help: id season can be only ${live.colors.orange.toChatHex()}[0-3].`);
        return false;
    };

    const currentWeather = bullymp.world.weather;

    if (live.worldProperties.blacklist[id].has(currentWeather)) {
        player.sendMessage(live.colors.red, `* Season ${id} not compatible with weather ${currentWeather}, and cause crash.`);
        return false;
    };

    const lastChange = settings.seasonChangeLastTime;

    if (bullymp.uptime < lastChange) {
        player.sendMessage(live.colors.red, `* You can change season only after ${live.colors.orange.toChatHex()}${Math.ceil(lastChange - bullymp.uptime)} ${live.colors.red.toChatHex()}seconds.`);
        return false;
    };
    settings.seasonChangeLastTime = bullymp.uptime + live.worldProperties.cooldowns.season;

    const playerName = player.name.removeChatHex();
    const message = `* ${player.color.toChatHex()}${playerName}(${player.id}) ${live.colors.blue.toChatHex()}change season from ${live.colors.orange.toChatHex()}${bullymp.world.season} ${live.colors.blue.toChatHex()}to ${live.colors.orange.toChatHex()}${id}.`;

    bullymp.players.sendMessage(live.colors.blue, message);

    bullymp.world.season = id;
};

commandHandlers.add(`setseason`, playerChangeSeason);
commandHandlers.add(`season`, playerChangeSeason);

const playerChangeTime = function (player, command, hour, minute) {
    if (!hour) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [hour] [minute]`);
        return false;
    };

    hour = parseInt(hour);

    if (!minute)
        minute = 0;
    else
        minute = parseInt(minute);

    if ((typeof hour !== `number`) || isNaN(hour) || (typeof minute !== `number`) || isNaN(minute)) {
        player.sendMessage(live.colors.red, `* Command help: hour/minute values should be a numbers`);
        return false;
    };

    if ((hour < 0) || (hour > 23)) {
        player.sendMessage(live.colors.red, `* Command help: hour can be only ${live.colors.orange.toChatHex()}[0-23]`);
        return false;
    };

    if ((minute < 0) || (minute > 59)) {
        player.sendMessage(live.colors.red, `* Command help: minutes can be only ${live.colors.orange.toChatHex()}[0-59]`);
        return false;
    };

    const lastChange = settings.timeChangeLastTime;

    if (bullymp.uptime < lastChange) {
        player.sendMessage(live.colors.red, `* You can change time only after ${live.colors.orange.toChatHex()}${Math.ceil(lastChange - bullymp.uptime)} ${live.colors.red.toChatHex()}seconds`);
        return false;
    };

    settings.timeChangeLastTime = bullymp.uptime + live.worldProperties.cooldowns.time;

    const currentTime = bullymp.world.time;

    const messageOldTime = `${currentTime.hour < 10 ? `0${currentTime.hour}` : currentTime.hour}:${currentTime.minute < 10 ? `0${currentTime.minute}` : currentTime.minute}`;
    const messageNewTime = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;

    const playerName = player.name.removeChatHex();
    const message = `* ${player.color.toChatHex()}${playerName}(${player.id}) ${live.colors.blue.toChatHex()}change time from ${live.colors.orange.toChatHex()}${messageOldTime} ${live.colors.blue.toChatHex()}to ${live.colors.orange.toChatHex()}${messageNewTime}`;

    bullymp.players.sendMessage(live.colors.blue, message);

    bullymp.world.time = new WorldTime(hour, minute);
};

commandHandlers.add(`settime`, playerChangeTime);
commandHandlers.add(`time`, playerChangeTime);
commandHandlers.add(`t`, playerChangeTime);

const playerChangeWeather = function (player, command, id) {
    if (!id) {
        player.sendMessage(live.colors.red, `* Command help: ${live.colors.orange.toChatHex()}/${command} [id].`);
        return false;
    };

    id = parseInt(id);

    if ((typeof id !== `number`) || isNaN(id)) {
        player.sendMessage(live.colors.red, `* Command help: id weather should be a number.`);
        return false;
    };

    if ((id < 0) || (id > 49)) {
        player.sendMessage(live.colors.red, `* Command help: id weather can be only ${live.colors.orange.toChatHex()}[0-49].`);
        return false;
    };

    const currentSeason = bullymp.world.season;

    if (live.worldProperties.blacklist[currentSeason].has(id)) {
        player.sendMessage(live.colors.red, `* Weather ${id} not compatible with season ${currentSeason}, and cause crash.`);
        return false;
    };

    const lastChange = settings.weatherChangeLastTime;

    if (bullymp.uptime < lastChange) {
        player.sendMessage(live.colors.red, `* You can change weather only after ${live.colors.orange.toChatHex()}${Math.ceil(lastChange - bullymp.uptime)} ${live.colors.red.toChatHex()}seconds.`);
        return false;
    };

    settings.weatherChangeLastTime = bullymp.uptime + live.worldProperties.cooldowns.weather;

    const playerName = player.name.removeChatHex();
    const message = `* ${player.color.toChatHex()}${playerName}(${player.id}) ${live.colors.blue.toChatHex()}change weather from ${live.colors.orange.toChatHex()}${bullymp.world.weather} ${live.colors.blue.toChatHex()}to ${live.colors.orange.toChatHex()}${id}.`

    bullymp.players.sendMessage(live.colors.blue, message);

    bullymp.world.weather = id;
};

commandHandlers.add(`setweather`, playerChangeWeather);
commandHandlers.add(`weather`, playerChangeWeather);