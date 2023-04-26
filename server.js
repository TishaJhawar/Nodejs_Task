const redis = require('redis');
const client = redis.createClient();

client.on('error', function (error) {
    console.error(error);
});

client.on('connect', async function () {
    try {
        await client.set('mykey', 'myvalue');
        const value = await client.get('mykey');
        console.log(value);
    } catch (error) {
        console.error(error);
    } finally {
        client.quit();
    }
});
