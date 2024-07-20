const { validator, botFromId, getBot } = require("./lib/utils/");
const connection = require("./lib/connection/connection");
const globalManager = require('global-manager');

/**
 * @class MultiBot
 * @param {Object} config - Configuration object.
 * @param {string} config.type - System type, possible values: 'one', 'multi'.
 * @param {Array.<{id: number, token: string, main: boolean}>} config.bots - Array of bot configurations.
 * @param {Object} config.options - Bot options.
 * @param {Array.<{command: string, description: string}>} config.options.commands - Array of bot commands.
 */
class MultiBot {
    /**
     * @param {Object} config - Configuration object.
     * @param {string} config.type - System type, possible values: 'one', 'multi'.
     * @param {Array.<{id: number, token: string, main: boolean}>} config.bots - Array of bot configurations.
     * @param {Object} config.options - Bot options.
     * @param {Array.<{command: string, description: string}>} config.options.commands - Array of bot commands.
     */
    constructor({ type, bots, options }) {
        // Validate constructor arguments
        validator({ type, bots, options });

        this.type = type;
        this.bots = bots;
        this.options = options;

        // Initialize bot connections
        this.#initializeConnections({ type, bots, options });
    }

    /**
     * Initializes connections for Telegram bots.
     * @param {Object} config - Configuration object.
     * @param {string} config.type - System type, possible values: 'one', 'multi'.
     * @param {Array.<{id: number, token: string, main: boolean}>} config.bots - Array of bot configurations.
     * @param {Object} config.options - Bot options.
     * @param {Array.<{command: string, description: string}>} config.options.commands - Array of bot commands.
     */
    async #initializeConnections({ type, bots, options }) {
        return connection({ type, bots, options });
    }

    /**
     * Retrieves a bot instance by its ID.
     * @param {number} id - The ID of the bot.
     * @returns {TelegramBot|undefined} - The bot instance, or undefined if not found.
     */
    getBotById(id) {
        return botFromId(id);
    }

    /**
     * Retrieves the main bot instance.
     * @returns {TelegramBot|undefined} - The main bot instance, or undefined if not found.
     */
    getMainBot() {
        const mainBot = this.bots.find(b => b.main === true);
        return getBot(mainBot.id);
    }

        /**
     * Retrieves all bot instances.
     * @returns {Array.<TelegramBot>} - Array of all bot instances.
     */
    getAllBots() {
        return globalManager.get("bots");
    }
}

module.exports = MultiBot;
