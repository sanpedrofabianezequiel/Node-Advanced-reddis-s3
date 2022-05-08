# AdvancedNode

('https://github.com/MicrosoftArchive/redis/releases')

Run exe
open terminal
put "node"
define steps:
    
    - const redis =  require('redis')
    - const redisUrl = 'redis://127.0.0.1:6379'
    - const client = redis.createClient(redisUrl)
    - client //Show our client
    - client.get('key',(err,value)=>{})
    - client.set('key','value')