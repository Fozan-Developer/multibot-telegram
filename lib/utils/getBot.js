const globalManager = require("global-manager");
const findBotOnTgId = require("./findBotOnTgId");

/**
 * Retrieves the main bot from the global manager.
 * @param {number} mainBotId - The ID of the main bot to retrieve.
 * @returns {Object|undefined} - The main bot instance, or undefined if not found.
 * @throws {Error} Throws an error if the type is 'multi', or if required data is missing or invalid.
 */
module.exports = function getBot(mainBotId) {
    const type = globalManager.get("type");
    const bots = globalManager.get("bots");

    // Check if 'type' is 'multi' and throw an error if so
    if (type === "multi") {
        throw new Error("This method is only available for 'one' type configurations.");
    }

    // Validate the 'bots' array
    if (!Array.isArray(bots)) {
        throw new Error("Global manager does not contain a valid 'bots' array.");
    }

    // Find and return the bot with the specified ID
    return findBotOnTgId({ bots, tgId: mainBotId });
};
