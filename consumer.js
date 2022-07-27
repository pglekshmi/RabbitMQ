const amqp = require("amqplib");

connect();

async function connect(){
    try{

        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.consume("jobs", message=> {
            const input = JSON.parse(  message.content.toString());
            console.log(`Received the job ${input.number1} , ${input.number2}`);
            sum = parseInt(input.number1) +parseInt(input.number2);
            console.log(`Sum is ${sum}`);
            
            
        }
        )

       console.log("Waiting for message.....")
    }
    catch(err)
    {
        console.error(err);
    }
}