// Method for print text in console without file path
bullymp.print = function () {
    const argCount = arguments.length;

    if (argCount == 0)
        return false;

    const date = Date().split(` `);
    let outputValues = `[${date[2]} ${date[1]} ${date[3]} ${date[4]}]: `;

    for (let i = 0; i < argCount; i++) {
        let value = arguments[i];

        if (typeof value == `object`)
            value = JSON.stringify(value);

        outputValues = `${outputValues}${value}`;

        if (i != (argCount - 1))
            outputValues = `${outputValues}, `;
    };

    eval(`console.log(outputValues)`);
};

// Method for get distance between two vectors
bullymp.getDistanceBetweenVectors = function (pos1, pos2) {
    if ((typeof pos1 != `object`) || (typeof pos2 !== `object`))
        return false;

    const distance = Math.sqrt(((pos2.x - pos1.x) ** 2) + ((pos2.y - pos1.y) ** 2) + ((pos2.z - pos1.z) ** 2));

    return distance;
};

// Property for get server uptime in sec.
let serverUptime = 0;

const changeServerUptime = function () {
    serverUptime = serverUptime + 0.05;
    setTimeout(changeServerUptime, 50);
};

setTimeout(changeServerUptime, 50);

Object.defineProperty(bullymp, `uptime`,
    {
        get: function () {
            return serverUptime;
        }
    }
);

