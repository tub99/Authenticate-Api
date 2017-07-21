var DbManager = require("d:/xampp/htdocs/myProjects/Authenticate-Api/db/dbManager.js"),
    dbMngr = new DbManager('register'),
    tableName = 'Registration_tbl';

function registerUser(req, res, next) {
    console.info('RegisteringInside POST  /account/register');
    // Save user details inside DB
    dbMngr.connect()
        .then(function (resp) {
            if (resp) {
                // fetch docs
                if (req.body) {
                    dbMngr.insertDoc(tableName, req.body)
                        .then((insertStatus) => {
                            if (insertStatus) {
                                res.send('Successfully Inserted');
                            }
                        })
                        .catch((err) => {
                            return err;
                        });
                }
            }
        })
        .catch(function (err) {
            console.error('Db connectivity failed');
        });
}

function getRegisterUsers(req, res, next) {
    console.info('RegisteringInside POST  /account/register');
    // Save user details inside DB
    dbMngr.connect(tableName)
        .then(function (resp) {
            if (resp) {
                // fetch docs
                dbMngr.fetchDoc(tableName)
                    .then(docs => {
                        res.send(docs);
                    });
            }
        })
        .catch(function (err) {
            console.error('Db connectivity failed');
        });
}

function validateUser(req, resp, next) {
    console.info('VALIDATING : Inside GET  /account/register/validate');
    next();
}


module.exports = function (router) {
    // /acoount/register
    router.post('/', registerUser);
    router.get('/', getRegisterUsers);
    return router;
}