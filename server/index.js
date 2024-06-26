const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key', // Replace with your own secret key
    resave: false,             // Forces the session to be saved back to the session store
    saveUninitialized: false,  // Forces a session that is "uninitialized" to be saved to the store
    cookie: { secure: false }  // Should be true in production with HTTPS
}));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'schedule_work',
});

app.listen(3002, () => {
    console.log("Server is running on port 3002");
});

app.post('/register', (req, res) => {
    const sentUser = req.body.Username;
    const sentPassword = req.body.Password;
    const sentEmail = req.body.Email;
    const sentAddress = "Default";
    const sentName = "Default";
    const SQL = 'INSERT INTO users (username, password, email, address, name) VALUES (?, ?, ?, ?, ?)';
    const Values = [sentUser, sentPassword, sentEmail, sentAddress, sentName];

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log("User Inserted Successfully");
            res.send({ message: "User added" });
        }
    });
});

app.post('/login', (req, res) => {
    const sentUser = req.body.Username;
    const sentPassword = req.body.Password;
    const SQL = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const Values = [sentUser, sentPassword];

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send({ error: err });
        } else {
            console.log("Log In Successfully")
            if (results.length > 0) {

                req.session.user = results[0]; // Storing the user information in the session
                console.log(req.session.user)
                res.send({ message: "Login successful", user: results[0] });
            } else {
                res.send({ message: "Invalid username or password" });
            }
        }
    });
});

app.get('/home', (req, res) => {
    if (req.session.user) {
        console.log(req.session.user)
        res.send(`Hello, ${req.session.user.name}`);
    } else {
        res.send({ loggedIn: false });
    }
});

app.get('/information', (req, res) => {
    if (req.session.user) {
        console.log(req.session.user)
        res.send(`Hello, ${req.session.user.name}`);
    }
})
app.get('/getAllTask', (req, res) => {
    const SQL = 'SELECT * FROM tasks';
    db.query(SQL, (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            console.log("Get All Task Successfully");
            res.send(result);
        }
    });
});

app.get('/getTaskByKey', (req, res) => {
    const key = req.query.Work;
    const SQL = `SELECT * FROM tasks WHERE tasks.id LIKE ? OR tasks.name LIKE ? OR tasks.description LIKE ?`;
    const searchKey = `%${key}%`;

    db.query(SQL, [searchKey, searchKey, searchKey], (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            console.log(result);
            console.log("Get Task By Key Value Successfully");
            res.send(result);
        }
    });
});
