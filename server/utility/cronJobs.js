const cron  = require('node-cron');
const axios = require('axios');


const runCronJobs = ()=>{
    console.log("cron job started");

    cron.schedule('*/5 * * * *', async () => {
        console.log("cron job is running");
        try {
            // Replace with your Render service URL
            const response = await axios.get(`${process.env.SERVER_BACKEND_URL}`);
            console.log('Pinged the service:', response.status);
        } catch (error) {
            console.error('Error pinging the service:', error);
        }
    })
}


module.exports=runCronJobs;