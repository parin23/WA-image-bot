import wa from '@open-wa/wa-automate';
import Scraper from 'images-scraper';

wa.create().then(client => start(client));

const google = new Scraper({
  puppeteer: {
    headless: true,
  },
});

function start(client) {
  client.onMessage(async message => {
	//console.log(message.body);
	//client.sendText(message.from,"Hello");
	//if(message.body[0]=="#"){
		
		//term[0]=' ';
		await (async () => {
  		 const results = await google.scrape(term, 100);
 		// console.log(results[1].url);
			var ind=await Math.floor(Math.random() * 90);
			//const lin = results[ind];
			console.log(results[ind]);
			await client.sendFileFromUrl(message.from, results[ind].url,'','',message.id);

		})();
  	//}
  });
}
