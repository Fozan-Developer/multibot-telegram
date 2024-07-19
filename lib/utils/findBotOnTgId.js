module.exports = function findBotOnTgId({ bots, tgId }) {
    let res = false;
    bots.forEach(item => {
        const parts = item.token.split(":");
        const id = Number(parts[0]);

        if (id == tgId) {
            res = item;
        }
    });

    return res;
};
