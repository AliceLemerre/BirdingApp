var axios = require('axios');

export var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://api.ebird.org/v2/data/obs/KZ/recent',
  headers: { 
    'X-eBirdApiToken': '{{x-hbesbsisfl8u}}'
  }
};

axios(config)
.then(function (response : any) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error: any) {
  console.log(error);
});