const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
client.get = util.promisify(client.get);

const exec =  mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = async function(...args) {
    /*console.log('Query....');
    console.log(this.getQuery());
    console.log(this.mongooseCollection.name);*/
    const key = Object.assign({}, this.getQuery(),{
        collection: this.mongooseCollection.name
    });

    const cacheValue = await client.get(JSON.stringify(key));
    if(cacheValue) {
        const docs = JSON.parse(cacheValue);
        console.log('From Redis');
        return Array.isArray(docs) 
            ? docs.map(doc => new this.model(doc))
            : new this.model(docs);
    }
    client.set(JSON.stringify(key), JSON.stringify(result));
    const result = await  exec.apply(this, args);

}