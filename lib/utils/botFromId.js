const globalManager = require("global-manager");
const findBotOnTgId = require("./findBotOnTgId");

/**
 * Retrieves a bot by its ID from the global manager.
 * @param {number} id - The ID of the bot to retrieve.
 * @returns {Object|undefined} - The bot instance, or undefined if not found.
 * @throws {Error} Throws an error if the type is 'one', or if globalManager does not contain a valid 'bots' array.
 */
module.exports = function botFromId(id) {
    const type = globalManager.get("type");
    const bots = globalManager.get("bots");

    // Check if 'type' is 'one' and throw an error if so
    if (type === "one") {
        throw new Error("This method is only available for 'multi' type configurations.");
    }

    // Validate the 'bots' array
    if (!Array.isArray(bots)) {
        throw new Error("Global manager does not contain a valid 'bots' array.");
    }

    // Find and return the bot with the specified ID
    return findBotOnTgId({ bots, tgId: id });
};
