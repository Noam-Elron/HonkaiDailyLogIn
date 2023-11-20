import { HttpException } from "./errors";

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
        // There has to be atleast one cookie(otherwise parse_cookies would throw an error), so in order to not repeat this request twice(because this is data that is relevent to a current month, hence shared by all users)
        const monthly_rewards = this.#fetch_info('home', this.cookies[0]);
        for (let i = 0; i < this.cookies.length; i++) 
        {
            Logger.log(`Account: ${i+1}`);
            const info = await this.#fetch_info('info', this.cookies[i]);
            const account_info = {
                date : info.today,
                sign_total : info.total_sign_day,
                already_claimed : info.is_sign,
                missed : info.sign_cnt_missed
            }

            Logger.log(`Total rewards claimed this month: ${account_info.sign_total}, Total rewards missed this month: ${account_info.missed}`);

            if (account_info.already_claimed) {
                Logger.log(`You've already claimed your rewards for today - ${account_info.date}, remember to log in tommorow!`);
                continue;
            }
            const sign = fetch(this.baseURL + "sign", this.cookies[i]);
            if (sign.ok) 
            {
            Logger.log(`You've succesfully signed in Trailblazer, here is your reward: ${monthly_rewards.awards[i]}`);
            continue
            }
            throw new HttpException(sign.status)

        };
    }

    async #fetch_info(url_add_on, cookie) 
    {
        // Method to specifically check data inside request and check if request failed.
        this.#request_options.headers.Cookie = cookie
        const resp = await fetch(this.baseURL + url_add_on + '?' + this.account_id, options);
        if (resp.ok) 
        {
            return resp.headers.data;
        };
        throw new HttpException(resp.status);
    }


    static parse_cookies(cookies) 
    // Seperated multiple accounts in case < 1 is inputted. Even if only one it leaves it in the same format so no change neccesary
    {
        if (cookies)
        {
            return cookies.split("#");
        }
        // If cookies is an empty string/null/undefined then a generic Error will be thrown.
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