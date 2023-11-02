class StarRailer 
{
    static baseURL = 'https://sg-public-api.hoyolab.com/event/luna/os/';
    // request_options is a private variable in order to not be messed with outside
    #request_options = {method : null, muteHttpExceptions : true, contentType : 'application/json;charset=UTF-8', headers : {Accept : 'application/json, text/plain, */*', Cookie : cookie, Origin : 'https://act.hoyolab.com', Referer : 'https://act.hoyolab.com/', 'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}, payload : JSON.stringify({"act_id": `${account_id}`, "lang": "en-us"})};
    constructor(cookies, account_id) 
    {
        this.cookies = this.parse_cookies(cookies);
    };
    
    async main() 
    {
        // There has to be atleast one cookie, so in order to not repeat this request twice(because this is data that is relevent to a current month, hence shared by all users)
        const monthly_rewards = this.fetch_info('home', this.cookies[0]);
        for (let i = 0; i < this.cookies.length; i++) 
        {
            const info = await this.#fetch_info('info', this.cookies[i]);
            const account_info = {
                date : info.today,
                sign_total : info.total_sign_day,
                already_claimed : info.is_sign,
                missed : info.sign_cnt_missed
            }

            if (already_claimed) {
                Logger.log("You've already signed in today, remember to log in tommorow!")
            }
        };
    }

    async #fetch_info(url_add_on, cookie) 
    {
        // Method to specifically check data inside request.
        this.#request_options.headers.Cookie = cookie
        return fetch(this.baseURL + url_add_on + '?' + this.account_id, options).getAllHeaders().data;
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
        if (cookies)
        {
            return cookies.split("#");
        }
        // If cookies is an empty string/null/undefined then Error will be thrown.
        throw new Error("Inputted Cookies Format Incorrect")
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