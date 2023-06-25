const express = require('express');
const app = express();

const cors = require("cors");

    const allowedOrigins = ['http://localhost:3000'];
    app.use(cors({
      origin: allowedOrigins
    }));
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
        });
        app.get('/about', async (req, res) => {
            try {
              const { keyword } = req.query;
          
              const url = `https://api.etsy.com/v3/application/listings/active?client_id=aoeoryx59j26t30056nqabv8&keywords=${keyword}`;
          
              const response = await fetch(url);
              const data = await response.json();
              let view=0;
              data.results.forEach((item) => {
                view += item.views;
              });
              const responsedata = {
                countofItems: data.count,
                totalViews:view
              }
             
              
              res.json(responsedata);
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal server error' });
            }
          });
          
        
       


const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});