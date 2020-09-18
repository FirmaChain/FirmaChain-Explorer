let lastFired;

export const emit = () => {
    lastFired = Date.now();
};

export default () => {
    const timeout = 1000 * 30;
    lastFired = 0;

    setInterval(() => {
        if(!lastFired)
            return;

        if (Date.now() - lastFired >= timeout) {
            console.error('Block sync process stuck now. Restart!');
            process.exit(0);
        }
    }, timeout);
};
