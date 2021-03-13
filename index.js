import wa from '@open-wa/wa-automate';
import Scraper from 'images-scraper';
import Promise from 'promise';

wa.create().then(client => start(client));

const google = new Scraper({
  puppeteer: {
    headless: true,// Set this as False for not using Headless
  },
});


function start(client) {
  client.onMessage(async message => {
	if(message.body.startsWith('!')){

		let myPromise = new Promise(function(myResolve, myReject) {
			(async () => {
 			 var results = 0
 			 results = await google.scrape(message.body, 100);
  			//console.log('results', results);
  			if (results != 0) {
 			   myResolve(results);
  			} else {
 			   myReject("Error");
 			 }
			})();
		
		});
  		
  		myPromise.then(
 		 	 function(value) {
 		 	console.log('URL fetched');
			const ind= Math.floor(Math.random() * 90);
			//const lin = results[ind];
		//	console.log(results)
		//	console.log(value);
			 client.sendFileFromUrl(message.from, value[ind].url,'','',message.id);
			console.log('Image Sent');
 		 	 },
			  function(error) {
			  console.log(error);
			   client.sendText(message.from, 'Please SLOW Down,');
			  }
			);
 		
		
  	}
  });
}
