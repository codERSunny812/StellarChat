const cron = require("node-cron");
const axios = require("axios");
const statusModal = require("../models/status.modal");

const runCronJobs = () => {
  console.log("cron job started");

  cron.schedule("*/10 * * * *", async () => {
    console.log("cron job is running");
    try {
      // Replace with your Render service URL
      const response = await axios.get(`${process.env.SERVER_BACKEND_URL}`);
      console.log("Pinged the service:", response.status);
    } catch (error) {
      console.error("Error pinging the service:", error);
    }
  });
};


const deletedOldStatus = ()=>{
  cron.schedule('0 * * * *',async()=>{
    try {
      const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

     await statusModal.deleteMany({createdAt:{$lt:expirationTime}});

     console.log("status is successfully deleted after the 24 hours");

      
    } catch (error) {
      console.log("error in deleting the status")
    }
  })
}

module.exports = {runCronJobs, deletedOldStatus};
