
const redis = require('redis');


const keys = require('./keys');

const redisClinet = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy : () => 1000

})

const sub  = redisClinet.duplicate();

function fib(index){
    if(index < 2 ) return 1;
    return fib(index -1) + fib(index -2);
 }

 sub.on('message', (channel, message)=>{
    redisClinet.hset('values', message, fib(parseInt(message)))
 })