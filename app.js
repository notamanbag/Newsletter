const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});
//See that in html form tag we have action as"/" and method is equal to post.
app.post("/", function(req, res) {
  console.log("post request recived");
  var fname = req.body.first;
  var lname = req.body.last;
  var email = req.body.email;
  var data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }

    ]
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/16b5117aea";
  const option = {
    method: "POST",
    auth: "aman1:4f970f29c6547f84c8304638de7c7dac-us19",
  }

  const request = https.request(url, option, function(response) {
    if (response.statusCode == 200){
      res.sendFile(__dirname + "/sucess.html")
    }
    else{

      res.sendFile(__dirname + "/faliure.html")
    }
      response.on("data", function(data) {
        console.log(JSON.parse(data));
      })

  });
  request.write(jsonData);
  request.end();
});
app.post("/faliure",function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT|| 3000, function() {
  console.log("Server started");
});
//api key:- 4f970f29c6547f84c8304638de7c7dac-us19
//list id: 16b5117aea
