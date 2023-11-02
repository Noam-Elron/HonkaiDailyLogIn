class StarRailer 
{
    #request_options = {method : null, muteHttpExceptions : true, contentType : 'application/json;charset=UTF-8', headers : {Accept : 'application/json, text/plain, */*', Cookie : cookie, Origin : 'https://act.hoyolab.com', Referer : 'https://act.hoyolab.com/', 'User-Agent' : this.user_agent}, payload : JSON.stringify(this.payload)};
    constructor(cookies, account_id, debug = false) 
    {
        this.baseURL = 'https://sg-public-api.hoyolab.com/event/luna/os/';
        this.cookies = this.parse_cookies(cookies);
        this.user_agent =  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        this.payload = {"act_id": `${account_id}`, "lang": "en-us"};
    };
    
    async main() 
    {
        for (let i = 0; i < this.cookies.length; i++) 
        {
            const account_info = await this.account_info(this.cookies[i])

        };
    }

    async login(cookie) 
    {
        
        return fetch(this.baseURL + 'sign', options)
    };

    async fetch_info(url_add_on, cookie) 
    {

        const data = fetch(this.baseURL + url_add_on + this.account_id, options).getAllHeaders();
        return data;
    }

    async monthly_rewards_list(cookie)
    {
        const account_info = await this.fetch_info('home?lang=en-us&act_id=e202303301540311');
        const data = account_info.data;
        return data;
    }

    get options() 
    {
        return this.#request_options;
    }

    set options(method) 
    {
        if (method !== "POST" || method !== "GET")
        {
            throw new Error("Current integrated methods are only POST or GET");
        }
        this.#request_options.method = method;
    }

    static fetch(url, options)
    // Generic method to prevent repetitiveness of whether a request returns 200. Further error checking for specific error codes will be added once testing commences.
    {
        const resp = UrlFetchApp.fetch(url, options);
        const resp_code = resp.getResponseCode();

        if (resp_code === 200) 
        {
            return resp;
        };
        throw new Error("HTTP Error: " + resp_code);
    }

    static parse_cookies(cookies) 
    // Seperated multiple accounts in case < 1 is inputted. Even if only one it leaves it in the same format so no change neccesary
    {
        return cookies.split("#");
    };
}


async function main()
{
    let cookies = '';
    let account_id = '';
    user = StarRailer(cookies, account_id);
    user.login();
}



export {StarRailer};