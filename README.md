# MultiBot-Telegram

**MultiBot-Telegram** is a Node.js library designed for managing multiple Telegram bots effortlessly. It simplifies the process of setting up, managing, and interacting with multiple Telegram bots using the Telegram Bot API.

## Installation

To install the library, use npm:

```bash
npm install multibot-telegram
```

## Getting Started

To get started with **MultiBot-Telegram**, initialize the library and configure your bots as shown below:

```js
const MultiBot = require('multibot-telegram');

const multiBot = new MultiBot({
    type: 'one',
    bots: [
        { id: 123456789, token: '123456789:ABCdefGHIjklMNO_pqrSTUvwxYz', main: true }
    ],
    options: {
        commands: [
            { command: '/start', description: 'Start command' }
        ]
    }
});
```

## Full Documentation

For detailed usage, configuration, and method descriptions, please refer to the [Full Documentation](https://fozan.gitbook.io/multibot-telegram/).

## License

MIT License. See the [LICENSE](LICENSE) file for details.
