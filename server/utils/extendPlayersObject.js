bullymp.players.sendMessage = function (color, message, ignore = []) {
	if ((typeof color != `object`) && (typeof message != `string`) && (typeof ignore != `array`))
		return false;

	const ignoreMessagePlayers = {};

	for (let player of ignore) {
		ignoreMessagePlayers[player] = true;
	};

	for (let i = 0; i < bullymp.players.length; i++) {
		const player = bullymp.players[i];

		if (!player)
			continue;

		if (!ignoreMessagePlayers[player])
			player.sendMessage(color, message);
	};

	return true;
};

////////////////////////////////

bullymp.players.inRange = function (position, radius) {
	if ((typeof position != `object`) || (typeof radius != `number`))
		return false;

	const arrayWithPlayers = [];

	for (let i = 0; i < bullymp.players.length; i++) {
		const player = bullymp.players[i];

		if (!player)
			continue;

		if (bullymp.getDistanceBetweenVectors(position, player.position) <= radius)
			arrayWithPlayers.push(player);
	};

	return arrayWithPlayers;
};

////////////////////////////////

bullymp.players.atName = function (name) {
	if (typeof name != `string`)
		return false;

	for (let i = 0; i < bullymp.players.length; i++) {
		const player = bullymp.players[i];

		if (player && (player.name == name))
			return player;
	};

	return false;
};