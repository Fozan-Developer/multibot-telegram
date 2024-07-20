const globalManager = require("global-manager");
const TelegramBot = require("node-telegram-bot-api");

/**
 * Initializes connections for Telegram bots and stores them in the global manager.
 * @param {Object} config - Configuration object.
 * @param {string} config.type - System type, possible values: 'one', 'multi'.
 * @param {Array.<{token: string, main: boolean, id: number}>} config.bots - Array of bot configurations.
 * @param {Object} config.options - Bot options.
 * @param {Array.<{command: string, description: string}>} config.options.commands - Array of commands to be set for each bot.
 * @returns {Array} - Array of TelegramBot instances.
 * @throws {Error} Throws an error if bot initialization fails or configuration is invalid.
 */
function initializeConnections({ type, bots, options }) {
    // Validate the 'type' parameter
    if (!["one", "multi"].includes(type)) {
        throw new Error(`Invalid type: ${type}. Must be 'one' or 'multi'.`);
    }

    // Filter bots based on the 'type' parameter
    const filteredBots = type === "one" ? bots.filter(bot => bot.main) : bots;

    // Validate that at least one bot is available for 'one' type
    if (type === "one" && filteredBots.length === 0) {
        throw new Error("No main bot found for 'one' type configuration.");
    }

    // Retrieve and stop existing bot instances
    const existingBots = globalManager.get("bots");
    if (Array.isArray(existingBots)) {
        existingBots.forEach(bot => bot.stopPolling());
    }

    // Initialize an array to hold TelegramBot instances
    const telegramBots = [];

    // Iterate over each filtered bot configuration
    for (const bot of filteredBots) {
        try {
            // Validate bot token and ID
            if (!bot.token || typeof bot.token !== "string" || !bot.token.trim()) {
                throw new Error(`Token is missing or invalid for bot with ID: ${bot.id}`);
            }

            if (typeof bot.id !== "number" || isNaN(bot.id)) {
                throw new Error(`Invalid ID for bot with ID: ${bot.id}. ID must be a number.`);
            }

            // Create a new TelegramBot instance
            const telegramBot = new TelegramBot(bot.token, { polling: true });

            // Add bot instance to the array
            telegramBots.push(telegramBot);

            // Set commands if provided
            if (options && options.commands && Array.isArray(options.commands) && options.commands.length > 0) {
                telegramBot.setMyCommands(options.commands);
            }
        } catch (error) {
            // Provide detailed error information
            throw new Error(`Failed to initialize bot with ID '${bot.id}': ${error.message}`);
        }
    }

    // Store the array of TelegramBot instances in the global manager
    globalManager.set("bots", telegramBots);

    // Return the array of TelegramBot instances
    return telegramBots;
}

module.exports = initializeConnections;
