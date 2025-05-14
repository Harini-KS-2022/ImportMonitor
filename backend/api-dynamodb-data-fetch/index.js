const AWS = require("aws-sdk");
const axios = require("axios");

AWS.config.update({
  region: "us-east-1", // Update with your region
  accessKeyId: "accessKeyid", // Use environment variables for security
  secretAccessKey: "secretaccesskey",
  sessionToken: "sessiontoken",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const MONGO_API_URL =
  "http://node102.qa.adsystems.sj2.cj.com:11581/summary?recentlyFinished=true&iDisplayLength=2";

const getDashboardData = async (req, res) => {
  try {
    const mongoResponse = await axios.get(MONGO_API_URL);
    const files = mongoResponse.data.productImportSummaries;
    console.log(files);

    const batchKeys = files.map((file) => ({
      FILENAME: `${file.advertiserId}/${file.fileName}`,
      CID: file.advertiserId,
    }));

    console.log(batchKeys);
    const params = {
      RequestItems: {
        "dtm-dev-audit-table": {
          Keys: batchKeys,
        },
      },
    };

    const dynamoData = await dynamoDB.batchGet(params).promise();
    console.log(dynamoData.Responses["dtm-dev-audit-table"]);

    const responseData = files.map((file) => ({
      filename: file.fileName,
      advertiserId: file.advertiserId,
      preprocessing:
        dynamoData.Responses["dtm-dev-audit-table"].find(
          (item) => item["FILENAME"] === `${file.advertiserId}/${file.fileName}`
        ) || {},
      processing: file,
    }));

    console.log(responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

// Express route
const express = require("express");
const app = express();
app.get("/dashboard-data", getDashboardData);
app.listen(5000, () => console.log("Server running on port 5000"));
