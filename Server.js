const express = require('express')
const app = express()
const cors = require('cors')
const mariadb = require('./connectBDD')

app.use(cors())
app.use(express.json())

//Route d'affichage de tous les produits
app.get('/sports', async(req, res) =>{
    let conn;
    console.log('Connexion')
    conn = await mariadb.pool.getConnection();
    console.log('Requète 1');
    const rows = await conn.query('SELECT * FROM produit;')
    console.log(rows);
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

//Route d'affichage de tous les produits d'un seul sport
app.get('/sport/:sport', async(req, res) =>{
    let conn;
    let Sport = req.params.sport
    console.log('Connexion')
    conn = await mariadb.pool.getConnection();
    console.log('Requète 2');
    const rows = await conn.query('SELECT sport.NomSport, produit.NomProduit, produit.PrixProduit, produit.IdProduit FROM produit INNER JOIN sport ON sport.IdSport = produit.IdSport WHERE NomSport = ?;',[Sport])
    console.log(rows);
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

//Route d'affichage de tous les utilisateurs
app.get('/utilisateur', async(req, res) =>{
    let conn;
    console.log('Connexion')
    conn = await mariadb.pool.getConnection();
    console.log('Requète 3');
    const rows = await conn.query('SELECT * FROM compte;')
    console.log(rows);
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

//Route d'affichage d'un seul utilisateur'
app.get('/utilisateur/:id', async(req, res) =>{
    let conn;
    let id = req.params.id
    console.log('Connexion')
    conn = await mariadb.pool.getConnection();
    console.log('Requète 4');
    const rows = await conn.query('SELECT * FROM compte WHERE IdCompte = ? OR NomCompte = ?;',[id,id])
    console.log(rows);
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

// LA ROUTE POUR L'INSCRIPTION VIENT ICI //
app.post('/utilisateur', async(req,res) =>{
    let conn;
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète 5');
    await conn.query('INSERT INTO compte(NomCompte, MdpCompte, MailCompte, AdresseCompte) VALUES (?,?,?,?)',[req.body.nom,req.body.mdp,req.body.mail,req.body.adress])
    const rows = await conn.query('SELECT * FROM compte;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})  


app.put('/utilisateur/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète 6');
    await conn.query('UPDATE compte SET NomCompte = ?, MdpCompte = ?, CompteAdmin = ?, MailCompte = ?, AdresseCompte = ? WHERE IdCompte = ? OR NomCompte = ?',
    [req.body.nom,req.body.mdp,req.body.admin,req.body.mail,req.body.adress,id,id])
    const rows = await conn.query('SELECT * FROM compte;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

app.delete('/utilisateur/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète 7');
    await conn.query('DELETE FROM compte WHERE IdCompte = ?',[id])
    const rows = await conn.query('SELECT * FROM compte;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

app.post('/produit',async(req,res)=>{
    let conn;
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète 8');
    await conn.query('INSERT INTO produit(NomProduit, PrixProduit, StockProduit, IdSport) VALUES (?,?,?,?)',[req.body.nom,req.body.prix,req.body.stock,req.body.sport])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})


app.put('/produit/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète 9');
    await conn.query('UPDATE produit SET NomProduit = ?, PrixProduit = ?, StockProduit = ?, IdSport = ? WHERE IdProduit = ?',[req.body.nom,req.body.prix,req.body.stock,req.body.sport,id])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

app.delete('/produit/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète 10');
    await conn.query('DELETE FROM produit WHERE IdProduit = ?',[id])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

app.listen(8000, () =>{
    console.log("Serveur à l'écoute");
} )