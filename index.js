const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", { files: files });
    });
});

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`, req.body.details, (err) => {
        res.redirect('/');
    });
});

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.render("show", { title: req.params.filename.split('_').join(' ').replace('.txt', ''), details: data });
    });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 
