const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors());

app.use(express.json());

const dbConfig = require("./config/db.config");

const db = require("./models");

db.mongoose.connect('mongodb://' + dbConfig.HOST + ':' + dbConfig.PORT + '/' + dbConfig.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB is connected");
    initial();
}).catch((err) => {
    console.log("Error. DB isnt connected ", err);
    process.exit();
})

const User = db.user

function initial() {
    User.estimatedDocumentCount()
        .then(usersCount => {
            console.log("user's count is ", usersCount);
            if (usersCount === 0) {
                const admin = new User({ username: "Admin", nickname: "Admin", email: "Admin", password: "root" });
                return admin.save();
                console.log("Admin is created");
            }
        })
        .catch(err => {
            console.error("Error while getting user's count or creating admin:", err);
        });
}

require("./routes/auth.routes")(app);
require("./routes/authCheck.routes")(app);

//app.get('/', (req, res) => {
//    res.send('How are you?')
//})

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})