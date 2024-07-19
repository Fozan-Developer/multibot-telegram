const globalManager = require("global-manager");

/**
 * Validates the constructor arguments for MultiBot.
 * @param {Object} params - Constructor parameters.
 * @param {string} params.type - The type of bot, valid values are 'one' or 'multi'.
 * @param {Array.<{token: string, main: boolean, id: number}>} params.bots - Array of bot configuration objects.
 * @throws {Error} Throws an error if arguments are invalid.
 */
function validateConstructorArgs({ type, bots }) {
    // Validate the bot type
    if (typeof type !== "string" || !["one", "multi"].includes(type)) {
        throw new Error("Invalid type: type must be a non-empty string with value 'one' or 'multi'.");
    }

    // Validate the bots array
    if (!Array.isArray(bots) || bots.length === 0) {
        throw new Error("Invalid bots: bots must be a non-empty array.");
    }

    const botIds = new Set(); // To keep track of unique bot IDs
    const mainBots = bots.filter(bot => bot.main);

    // Validate the number of main bots
    if (mainBots.length === 0) {
        throw new Error("No main bot found: at least one bot must be designated as the main bot.");
    }

    if (mainBots.length > 1) {
        throw new Error("Main bot already exists: only one bot can be designated as the main bot.");
    }

    // Validate bot tokens and IDs
    bots.forEach((bot, index) => {
        if (typeof bot.token !== "string" || !bot.token.trim()) {
            throw new Error(`Invalid bot token at index ${index}: each bot must have a non-empty string token.`);
        }

        if (typeof bot.id !== "number" || isNaN(bot.id)) {
            throw new Error(`Invalid ID for bot at index ${index}: ID must be a valid number.`);
        }

        if (botIds.has(bot.id)) {
            throw new Error(`Duplicate bot ID found: ${bot.id} at index ${index}.`);
        }
        botIds.add(bot.id);
    });

    // Store the validated type in the global manager
    globalManager.set("type", type);
    return true;
}

module.exports = validateConstructorArgs;
