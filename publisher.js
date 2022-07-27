const amqp = require("amqplib");
const msg = {number1 : process.argv[2],
              number2 : process.argv[3]}

connect();

async function connect(){
    try{

        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)));
        
        console.log(`Job send successfully ${msg.number1},${msg.number2}`);

    }
    catch(err)
    {
        console.error(err);
    }
}