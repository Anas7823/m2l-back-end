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

app.get('/utilisateur', async(req, res) =>{
    let conn;
    console.log('Connexion')
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    const rows = await conn.query('SELECT * FROM compte;')
    console.log(rows);
    res.status(200).json(rows)
})

app.get('/utilisateur/:id', async(req, res) =>{
    let conn;
    let id = req.params.id
    console.log('Connexion')
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    const rows = await conn.query('SELECT * FROM compte WHERE IdCompte = ?;',[id])
    console.log(rows);
    res.status(200).json(rows)
})

// LA ROUTE POUR L'INSCRIPTION VIENT ICI //


app.put('/utilisateur/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    await conn.query('UPDATE compte SET NomCompte = ?, MdpCompte = ?, CompteAdmin = ?, MailCompte = ? WHERE IdCompte = ?',[req.body.nom,req.body.mdp,req.body.admin,req.body.mail,id])
    const rows = await conn.query('SELECT * FROM compte;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
})

app.delete('/utilisateur/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    await conn.query('DELETE FROM compte WHERE IdCompte = ?',[id])
    const rows = await conn.query('SELECT * FROM compte;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
})

app.post('/produit',async(req,res)=>{
    let conn;
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    await conn.query('INSERT INTO produit(NomProduit, PrixProduit, StockProduit, IdSport) VALUES (?,?,?,?)',[req.body.nom,req.body.prix,req.body.stock,req.body.sport])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
})


app.put('/produit/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    await conn.query('UPDATE produit SET NomProduit = ?, PrixProduit = ?, StockProduit = ?, IdSport = ? WHERE IdProduit = ?',[req.body.nom,req.body.prix,req.body.stock,req.body.sport,id])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
})

app.delete('/produit/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète');
    await conn.query('DELETE FROM produit WHERE IdProduit = ?',[id])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
})

app.listen(3000, () =>{
    console.log("Serveur à l'écoute");
} )