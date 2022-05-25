require("dotenv").config();
const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  async function getData() {
    const dataApi = await axios
      .get(process.env.URL)
      .then((res) => {
        const data = res.data;
        let response = `<html>
		<head>
		<title>Desafio</title>
		</head>
		<body>
		`;

        data.forEach((item) => {
          response += `<h3>${item.albumId} / ${item.id} - ${item.title}</h3><img src='${item.url}'>
		  <br />`;
        });

        response += `</body>
		</html>`;

        fs.writeFile("data.html", response, (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData();

  res.sendFile(__dirname + "/data.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
