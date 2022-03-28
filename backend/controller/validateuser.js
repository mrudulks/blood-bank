
const { getLoggedUsers } = require('../controller/model')

function parseCookie(cookieString) {
    const out = {};

    cookieString
        .split(';')
        .map(function (singleCookieStr) {
            const parts = singleCookieStr.trim().split('=');
            out[parts[0]] = parts[1];
        });
    return out;

}


async function validateUser(req,reply){
    if (req.headers) {debugger;
        if(!req.headers.cookie){
            reply
                .code(403)
                .send({
                   message:'not logged in'
                })
        }
        else{
            const cookies = parseCookie(req.headers.cookie);
        if (cookies.usersession) {
            console.log("user cookie", cookies.usersession);
            let user = await getLoggedUsers(cookies.usersession);
            return user
        } else {
            reply
                .code(403)
                .send({
                   message:'not logged in'
                })
        }
        }

    }
}


exports.validateUser = validateUser;