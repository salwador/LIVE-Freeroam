// Map for save currently registered commands
const registeredCommands = new Map();

// Addind method for register commands
const addCommandHandler = function (command, callback) {

    // Af arguments incorrect, then return false
    if ((typeof command != `string`) || (typeof callback != `function`))
        return false;

    // If command is have spaces, then select first word
    if (command.match(` `))
        command = command.split(` `)[0];

    // If this command never register, then create Set for save callbacks list
    if (!registeredCommands.has(command))
        registeredCommands.set(command, new Set());

    // Get callbacks list
    const callCommands = registeredCommands.get(command);

    // If callback from arguments already registered, then return false
    if (callCommands.has(callback))
        return false;

    // Add callback to list
    callCommands.add(callback);

    return true;
};

// Addind method for remove registered commands
const removeCommandHandler = function (command, callback) {

    // Af arguments incorrect, then return false
    if ((typeof command != `string`) || (typeof callback != `function`))
        return false;

    // If command is have spaces, then select first word
    if (command.match(` `))
        command = command.split(` `)[0];

    // If this command never register, then return false
    if (!registeredCommands.has(command))
        return false;

    // Get callbacks list
    const callCommands = registeredCommands.get(command);

    // If command not have callbacks, then remove list and return false
    if (callCommands.size == 0) {
        registeredCommands.delete(command);
        return false;
    };

    // If callback not registered with this command, then return false
    if (!callCommands.has(callback))
        return false;

    // Delete callback from list
    callCommands.delete(callback);

    return true;
};

// Method for call 
const callCommandFunction = function (caller, command) {

    // Af arguments incorrect, then return false
    if ((typeof caller != `object`) || (typeof command != `string`))
        return false;

    // If this command never register, then return false
    if (!registeredCommands.has(command))
        return false;

    // Get callbacks list
    const callCommands = registeredCommands.get(command);

    // If command not have callbacks, then remove list and return false
    if (callCommands.size == 0) {
        registeredCommands.delete(command);
        return false;
    };

    // Create array for callbacks arguments
    const applyArguments = [caller, command];

    // Parse arguments
    for (let i in arguments) {

        // [0] = caller, [1] = command. We need check, have arguments something else, like a command arguments. Example: /settime 23 49 
        if (i >= 2) {
            const value = arguments[i];

            applyArguments.push(value);
        };
    };

    // Logging into chat if command was called
    const callerName = caller.name;
    const callerID = caller.id;

    bullymp.print(`[COMMAND] ${callerName}(${callerID}) enter (${command})`);

    // Parse callbacks and call with 
    for (const callback of callCommands) {
        callback.apply(this, applyArguments);
    };

    return true;
};

// Define global "commandHandlers" object, because we wanna call it from any script
global.commandHandlers = {
    add: addCommandHandler,
    remove: removeCommandHandler
};

// Method for try call command if player write in chat "/"
const playerCommandHandle = function (player, commandText) {

    // If first char not a "/" then return
    if (commandText[0] != `/`)
        return false;

    // for (let char of commandText) {
    //     if (char.charCodeAt() == 65533) {
    //         player.sendMessage(live.colors.red, `* Bully Multiplayer supports ${live.colors.orange.toChatHex()}only cyrillic ${live.colors.red.toChatHex()}chars`);
    //         return false;
    //     };
    // };

    // Creating array for .apply
    const commandArray = commandText.substr(1).split(` `);

    // Put player to 1st array place 
    commandArray.unshift(player);

    // Call "callCommandFunction" with 
    callCommandFunction.apply(this, commandArray);

    return true;
};

// Add event for upper method
bullymp.events.add(`playerCommandText`, playerCommandHandle);