class StarRailer 
{
    constructor(cookies, account_id) 
    {
        this.baseURL = 'https://sg-public-api.hoyolab.com/event/luna/os/sign';
        this.cookies = this.parse_cookies(cookies);
        this.user_agent =  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        this.payload = {"act_id": `${account_id}`, "lang": "en-us"};
    };

    async login() 
    {
        let header = 
        {
            Accept : 'application/json, text/plain, */*',
            Cookie : this.cookies,
            Origin : 'https://act.hoyolab.com',
            Referer : 'https://act.hoyolab.com/',
            'User-Agent' : this.user_agent
        };

        let options = 
        {
            method : 'POST',
            muteHttpExceptions : true,
            contentType : 'application/json;charset=UTF-8',
            headers : header,
            payload : JSON.stringify(this.payload)
        };
    
        for (let i = 0; i < this.cookies.length; i++) 
        {
            options.headers.Cookie = this.cookies[i];
            let resp = UrlFetchApp.fetch(this.baseURL, options);
            let resp_code = resp.getResponseCode();

            if (resp_code === 200) 
            {
                continue
            };
            throw new Error("HTTP Error: " + resp_code);
        };
        return true;
    };

    /// When recieving user cookie input, if theres more than one user it has to be seperated
    /// by a '#' to be able to run the login function on multiple accounts.
    parse_cookies(cookies) 
    {
            return cookies.split("#");
    };

    get_info() 
    {
    let header = 
        {
            'User-Agent' : this.user_agent,
            Cookie : this.cookies
        };

        let options = 
        {
            method : 'GET',
            muteHttpExceptions : true,
            contentType : 'application/json, text/plain, */*',
            headers : header,
        };
    const account_info = UrlFetchApp.fetch(this.baseURL + `/info?lang=en-us&act_id=${this.account_id}`, options);
    let resp_code = resp.getResponseCode();

    if (resp_code !== 200) 
    {
        throw new Error("HTTP Error: " + resp_code);
    };


    const data = account_info.getAllHeaders().data;
    
    }
}


async function main()
{
    let cookies = '';
    let account_id = '';
    user = StarRailer(cookies, account_id);
    user.login();
}



export {StarRailer};