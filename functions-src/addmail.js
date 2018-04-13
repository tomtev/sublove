const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

const querystring = require('querystring')

exports.handler = function(event, context, callback) {

  // Error
  if(event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({status: 'missing-information'})
    })
  }

  // Do something
  console.log(querystring.parse(event.body))

  // Success
  callback(null, {
    statusCode,
    headers,
    body: JSON.stringify({status: 'Successful'})
  })
}
