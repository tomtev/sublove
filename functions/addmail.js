exports.handler = function(event, context, callback) {
  console.log('**** EVENT ****', +event)
  console.log('***** CONTEXT ******', +context)
  console.log('***** CALLBACK ******' +callback)
}
