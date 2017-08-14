var DbManager = require(global.relSrcPath+"/db/mongooseDbManager.js"),
    userModel = require(global.relSrcPath+"/models/user.js")
    dbMngr = new DbManager('register'),
    tableName = 'Registration_tbl';

// function registerUser(req, res, next) {
//     console.info('RegisteringInside POST  /account/register');
//     // Save user details inside DB
//     dbMngr.connect()
//         .then(function (resp) {
//             if (resp) {
//                 // fetch docs
//                 if (req.body) {
//                     dbMngr.insertDoc(userModel, req.body)
//                         .then((insertStatus) => {
//                             if (insertStatus) {
//                                 res.send('Successfully Inserted');
//                             }
//                         })
//                         .catch((err) => {
//                             return err;
//                         });
//                 }
//             }
//         })
//         .catch(function (err) {
//             console.error('Db connectivity failed');
//         });
// }

function getRegisterUsers(req, res, next) {
    console.info('RegisteringInside POST  /account/register');

    // Save user details inside DB
    dbMngr.connect()
        .then(function (resp) {
            if (resp) {
                // fetch docs
                dbMngr.fetchDoc(userModel, req.query)
                    .then(docs => {
                        res.send(docs);
                    });
            }
        })
        .catch(function (err) {
            console.error('Db connectivity failed');
        });
}

function getuser(req, res, next) {
    console.info(req);
}

function registerUser(req, res, next) {
        dbMngr.connect(tableName)
        .then(function (resp) {
            if (resp) {
                var response = req.body;
                response.created_at = new Date();
                response.updated_at = new Date();
                // fetch docs
                dbMngr.insertDoc(userModel, response)
                    .then(docs => {
                        res.send("Successfully Inserted");
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

function validateUserInfo(req, res, next) {

}

module.exports = function (router) {
    // /acoount/register
    router.post('/', registerUser);
    router.get('/', getRegisterUsers);
    return router;
}