import got from 'got';
import {Agent as HttpsAgent} from 'node:https';

const client = got.extend({
  prefixUrl: "https://httpstat.us"
})

console.log("starting ...");

(async () => {
  const requests = []

  const agent = new HttpsAgent({keepAlive: false, maxSockets: 2 });

  for (let i = 0; i < 50; i++) {
    const request = client.get("200", { 
      searchParams: {
        sleep: 30000
      },
      agent: { https: agent }
    }).then(res => console.log(res.body, new Date().toISOString()))
    requests.push(request)
  }

  await Promise.all(requests)

  console.log("exiting ...")
})();


