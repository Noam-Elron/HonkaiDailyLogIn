let web_url = 'https://sg-public-api.hoyolab.com/event/luna/os/sign';
const user_cookie = "";
const account_id = "";

let req_header = {
  'Accept' : 'application/json, text/plain, */*',
  'Cookie' : `${user_cookie}`,
  'Origin' : 'https://act.hoyolab.com',
  'Referer' : 'https://act.hoyolab.com/',
  'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  };

let req_payload = {"act_id": `${account_id}`, "lang": "en-us"};

function honkaiLogIn(url, header, payload) {
  let resp = UrlFetchApp.fetch(url, {
    'method' : 'POST',
    'muteHttpExceptions' : true,
    'contentType' : 'application/json;charset=UTF-8',
    'headers' : header,
    'payload' : JSON.stringify(payload),
  });
  Logger.log(resp.getResponseCode());
  Logger.log(resp.getAllHeaders());
  let body = resp.getContentText()
  Logger.log(JSON.parse(body))
}

function main() {
honkaiLogIn(url = web_url, header=req_header, payload = req_payload);
};