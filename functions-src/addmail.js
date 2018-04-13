exports.handler = function(event, context, callback) {
  console.log(event.body)
  console.log(JSON.stringify(event.body))
}
