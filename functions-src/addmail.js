exports.handler = function(event, context, callback) {
  console.log(JSON.parse(event.body))
}
