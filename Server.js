const express = require('express')
const app = express()
const cors = require('cors')
const mariadb = require('./connectBDD')

app.use(cors())
app.use(express.json())

app.get('/sports', async(req, res) =>{
    let conn;
    console.log('Connexion')
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    const rows = await conn.query('SELECT * FROM Produit;')
    console.log(rows);
    res.status(200).json(rows)
})

app.get('/:sport', async(req, res) =>{
    let conn;
    let Sport = req.params.sport
    console.log('Connexion')
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    const rows = await conn.query('SELECT Sport.NomSport, Produit.NomProduit, Produit.PrixProduit, Produit.IdProduit FROM produit INNER JOIN sport ON sport.IdSport = produit.IdSport WHERE NomSport = ?;',[Sport])
    console.log(rows);
    res.status(200).json(rows)
})

app.listen(3000, () =>{
    console.log("Serveur à l'écoute");
} )