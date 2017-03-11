var apiai = require("api.ai");
var uuidV1 = require('uuid/v1');

var nlp = new apiai({
  token: process.env.hotelbot,
  session: uuidV1()
});

console.log(process.env.hotelbot);

console.log('\x1b[36m%s\x1b[0m', '**************************************************');
console.log('\x1b[36m%s\x1b[0m','		Welcome to Hotel Booking BOT');
console.log('\x1b[36m%s\x1b[0m','**************************************************');

/*********************Example Patterns. Feel free to feed whatever you want to book a hotel************/
//					   reserve me Holiday Inn in London from March 11 to March 13 for 2
//					   book a hotel in London for 2
//					   book a hotel in London from Mar 12
/******************************************************************************************************/

var prompt = require('prompt');
 
  prompt.start();
 
  prompt.get(['username'], function (err, result) {
    console.log('  Hello, ' + result.username + ' How can I help you?');
    prompt.get(['booking'], function (err, result) {
    	console.log('  YOUR REQUEST: ' + result.booking);

    	nlp.text(result.booking, function (error, response) {
		  if (error) {
		    console.log(error);
		  }
		  else {
		  	//console.log(response);
		    console.log(response.result.fulfillment.speech);
		    console.log('\x1b[33m%s\x1b[0m:', 'Chain: ' + response.result.parameters.chain);
		    console.log('\x1b[33m%s\x1b[0m: ', 'Check-in Date: ' + response.result.parameters['check-in']);
		    console.log('\x1b[33m%s\x1b[0m: ', 'Check-out Date: ' + response.result.parameters['check-out']);
		    console.log('\x1b[33m%s\x1b[0m: ', 'Destination: ' + response.result.parameters.destination);
		    console.log('\x1b[33m%s\x1b[0m: ', 'No. of guests: ' + response.result.parameters.guests);

		    if (response.result.parameters['check-in'] !== '' && response.result.parameters['check-out'] !== '' &&
		    	response.result.parameters.destination !== '' && response.result.parameters.guests !== '') {

		    	console.log('\x1b[36m%s\x1b[0m', '**************************************************');
		    	console.log('\x1b[36m%s\x1b[0m', 'Sending booking request to booking.com...');
		    	console.log('Booking results.');
			}
		  }
		});

  	});
  });