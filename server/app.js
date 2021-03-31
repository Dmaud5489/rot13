const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    //res.sendFile(__dirname + '/index.html');
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/admin', (req, res)  => {
    res.status(200).sendFile('admin.html', {
        root: path.resolve('../public')
    });
})

app.get('/encryption', (request, response) => {
    var param = request.query.theText;

    var answer = "";

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < param.length; i++) {
        var isChar = false;
        for (var j = 0; j < characters.length; j++) {
            if (characters.charAt(j) == param.charAt(i)) {
                isChar = true;
            }
        }
        if (isChar) {
            let character = param.charAt(i);
            let upperCharacter = param.charAt(i).toUpperCase();
            var num1 = alphabet.indexOf(upperCharacter);
            var num2 = (num1 + 13) % alphabet.length;
            if (character == upperCharacter) {
                answer += alphabet.charAt(num2);
            } else {
                answer += alphabet.charAt(num2).toLowerCase();
            }
        } else {
            answer += param.charAt(i);
        }
    }

    response.status(200).send(answer);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});