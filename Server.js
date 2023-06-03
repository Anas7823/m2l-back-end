const express = require('express')
const app = express()
const cors = require('cors')
const mariadb = require('./connectBDD')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

app.use(cors())
app.use(express.json())

// affiche tout les produits
app.get('/sports', async(req, res) =>{
    let conn;
    console.log('Connexion')
    try{
        conn = await mariadb.pool.getConnection();
        console.log('Requète 1');
        const rows = await conn.query('SELECT * FROM produit')
        console.log(rows);
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        if (conn) return conn.end();
    }
})

//Route d'affichage de produit par recherche
app.get('/rechercher', async (req, res) => {
    let conn;
    console.log('Connexion');
    try {
      conn = await mariadb.pool.getConnection();
      console.log('Requète recherche');
      const rows = await conn.query('SELECT * FROM Produit WHERE NomProduit LIKE ?', [`%${req.query.search}%`]);
      console.log(rows);
      res.status(200).json(rows);
      console.log("Serveur à l'écoute");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Une erreur est survenue lors de la recherche.' });
    } finally {
      if (conn) return conn.end();
    }
});

//Route d'affichage de tous les produits trier par prix
app.get('/sportsprix', async(req, res) =>{
    let conn;
    console.log('Connexion')
    try{
        conn = await mariadb.pool.getConnection();
        console.log('Requète 1');
        const rows = await conn.query('SELECT * FROM produit ORDER BY PrixProduit')
        console.log(rows);
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        if (conn) return conn.end();
    }
})

// Route d'affichage de tous les produits trier par nom
app.get('/sportsnom', async(req, res) =>{
    let conn;
    console.log('Connexion')
    try{
        conn = await mariadb.pool.getConnection();
        console.log('Requète 1');
        const rows = await conn.query('SELECT * FROM produit ORDER BY NomProduit')
        console.log(rows);
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        if (conn) return conn.end();
    }
})


// Route d'affichage de tous les sports
app.get('/listesport', async(req, res) =>{
    let conn;
    console.log('Connexion')
    try{
        conn = await mariadb.pool.getConnection();
        console.log('Requète listeSport');
        const rows = await conn.query('SELECT * FROM sport')
        console.log(rows);
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        if (conn) return conn.end();
    }
})

// Route d'affichage de tous les produits d'un seul sport
app.get('/sport/:sport', async(req, res) =>{
    let conn;
    let Sport = req.params.sport
    console.log('Connexion')
    try{
        conn = await mariadb.pool.getConnection();
        console.log('Requète 2');
        const rows = await conn.query('SELECT sport.NomSport, produit.NomProduit, produit.PrixProduit, produit.IdProduit, produit.StockProduit FROM produit INNER JOIN sport ON sport.IdSport = produit.IdSport WHERE NomSport = ?;',[Sport])
        console.log(rows);
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        if (conn) return conn.end();
    }
})

// Route d'affichage pour un produit grâce à l'id
app.get('/produit/:id', async(req, res) =>{
    let conn;
    console.log('Connexion')
    try{
        conn = await mariadb.pool.getConnection();
        console.log('Requète récupe1produitById');
        const rows = await conn.query('SELECT * FROM produit WHERE IdProduit = ?', [req.params.id])
        console.log(rows);
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        if (conn) return conn.end();
    }
})

// Route d'insertion d'un nouveau produit 
app.post('/produit',async(req,res)=>{
    let conn;
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Requète 8');
    await conn.query('INSERT INTO produit(NomProduit, PrixProduit, StockProduit, IdSport) VALUES (?,?,?,?)',[req.body.nom,req.body.prix,req.body.stock,req.body.idSport])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

// Route d'modification d'un produit 
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

// Route pour ajouter  1 au stock d'un produit
app.put('/addproduit/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log(id);
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Ajout du produit effectuer');
    await conn.query('UPDATE Produit SET StockProduit = StockProduit + 1 WHERE IdProduit = ?',[id])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

// Route pour retirer 1 au stock d'un produit
app.put('/substractproduit/:id',async(req,res)=>{
    let conn;
    let id = req.params.id
    console.log(id);
    console.log('Connexion');
    conn = await mariadb.pool.getConnection();
    console.log('Ajout du produit effectuer');
    await conn.query('UPDATE Produit SET StockProduit = StockProduit - 1 WHERE IdProduit = ?',[id])
    const rows = await conn.query('SELECT * FROM produit;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
    console.log("Serveur à l'écoute");
})

// Route de suppression d'un produit
app.delete('/delproduit/:id',async(req,res)=>{
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

//Route d'affichage de tous les utilisateurs
app.get('/utilisateur', async(req, res) =>{
    let conn;
    console.log('Connexion')
    try{
        conn = await mariadb.pool.getConnection();
        console.log('Requète 3');
        const rows = await conn.query('SELECT * FROM compte;')
        console.log(rows);
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        if (conn) return conn.end();
    }
})

//Route d'affichage d'un seul utilisateur grâce à l'id
app.get('/utilisateur/:id', async(req, res) =>{
    let conn;
    let id = req.params.id
    console.log('Connexion')
    try{
        conn = await mariadb.pool.getConnection();
        console.log('Requète 4');
        const rows = await conn.query('SELECT * FROM compte WHERE IdCompte = ? OR NomCompte = ?;',[id,id])
        console.log(rows);
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch(err){
        console.log(err)
        throw err;
    }finally{
        if (conn) return conn.end();
    }
})

// LA ROUTE POUR L'INSCRIPTION
app.post('/utilisateur', async(req,res) =>{
    const password = req.body.mdp
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try{
        let conn;
        console.log('Connexion');
        conn = await mariadb.pool.getConnection();
        console.log('Requète 5');
        await conn.query('INSERT INTO compte(NomCompte, MdpCompte, MailCompte, AdresseCompte) VALUES (?,?,?,?)',[req.body.nom,hashedPassword,req.body.mail,req.body.adress, hashedPassword])
        const rows = await conn.query('SELECT * FROM compte;')    
        console.log('Requète effectué');
        res.status(200).json(rows)
        console.log("Serveur à l'écoute");
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating user.' });
      }
})

// Route pour la connexion
app.post('/login', async (req, res) => {
    const password = req.body.mdp;
    const email = req.body.mail;
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (!email || !password) {
      return res.status(400).json({ message: 'Veuillez saisir une adresse e-mail et un mot de passe.' });
    }
  
    try {
      const conn = await mariadb.pool.getConnection();
      const rows = await conn.query('SELECT * FROM compte WHERE MailCompte = ?', [email]);
      conn.release();
  
      if (rows.length > 0) {
        const user = rows[0];
        const match = await bcrypt.compare(password, hashedPassword);
  
        if (match) {
          const token = jwt.sign({ sub: user.id }, 'secret_key');
          return res.json({ message: 'Connexion réussie !', token });
        } else {
          return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
        }
      } else {
        return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
});

// Route modification d'utilisateur
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

// Route de suppression d'utilisateur
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


app.listen(8000, () =>{
    console.log("Serveur à l'écoute");
} )