

function registerUser() {
    console.info('RegisteringInside POST  /account/register')
}
function validateUser(req, resp, next){
     console.info('VALIDATING : Inside GET  /account/register/validate');
     next();
}


module.exports = function(router) {
    // /acoount/register
    router.post('/', validateUser, registerUser);
    return router;
}