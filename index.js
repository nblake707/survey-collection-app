const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ bye: 'friend' });
});

// Dynamic Port Binding - Heroku tells us which port our app will use
const PORT = process.env.PORT || 5000;
app.listen(PORT); 