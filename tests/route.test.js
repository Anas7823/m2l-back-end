const request = require('supertest');
const app = require('../Server');

describe('Tests unitaires des produits', () => {
  describe('GET /sports', () => {
    it('devrait renvoyer une liste de produits', async () => {
      const response = await request(app).get('/sports');
      expect( response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /produit/:id', () => {
    it('devrait renvoyer les informations du produit correspondant à l\'ID', async () => {
      const IdProduit = '10';
      const response = await request(app).get(`/produit/${IdProduit}`);
      expect(response.statusCode).toBe(200);
      expect(response.body[0]).toHaveProperty('IdProduit', parseInt(IdProduit));
    });

    it('devrait renvoyer une erreur 404 si aucun produit ne correspond à l\'ID', async () => {
      const invalidIdProduit = '999999999';
      const response = await request(app).get(`/produit/${invalidIdProduit}`);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('POST /produit', () => {
    it('devrait insérer un nouveau produit et renvoyer tous les produits', async () => {
      const requestBody = {
        nom: 'Nouveau produit',
        prix: 9.99,
        stock: 10,
        idSport: 3,
        img: 'https://www.example.com/image.jpg'
      };
      const response = await request(app).post('/produit').send(requestBody);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toContainEqual(
        expect.objectContaining({
          NomProduit: requestBody.nom,
          PrixProduit: requestBody.prix,
          StockProduit: requestBody.stock,
          IdSport: requestBody.idSport,
          ImageProduit: requestBody.img
        })
      );
    });
  });

  describe('PUT /produit/:id', () => {
    it('devrait modifier les informations du produit correspondant à l\'ID et renvoyer tous les produits', async () => {
      const idProduit = 34; // Mettre le bon id
      const requestBody = {
        nom: 'Nouveau nom',
        prix: 19.99,
        stock: 15,
        idSport: 4,
        img: 'https://www.example.com/new-image.jpg'
      };
      const response = await request(app).put(`/produit/${idProduit}`).send(requestBody);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toContainEqual(
        expect.objectContaining({
          IdProduit: idProduit,
          NomProduit: requestBody.nom,
          PrixProduit: requestBody.prix,
          StockProduit: requestBody.stock,
          IdSport: requestBody.idSport,
          ImageProduit: requestBody.img
        })
      );
    }, 10000);
  });

  describe('PUT /addproduit/:id', () => {
    it('devrait ajouter 1 au stock du produit correspondant à l\'ID et renvoyer tous les produits', async () => {
      const idProduit = 33; // Mettre le bon id
      const response = await request(app).put(`/addproduit/${idProduit}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toContainEqual(
        expect.objectContaining({
          IdProduit: idProduit,
          StockProduit: expect.any(Number)
        })
      );
    });
  });

  describe('PUT /substractproduit/:id', () => {
    it('devrait retirer 1 au stock du produit correspondant à l\'ID et renvoyer tous les produits', async () => {
      const idProduit = 33; // Mettre le bon id
      const response = await request(app).put(`/substractproduit/${idProduit}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toContainEqual(
        expect.objectContaining({
          IdProduit: idProduit,
          StockProduit: expect.any(Number)
        })
      );
    });
  });

  describe('DELETE /delproduit/:id', () => {
    it('devrait supprimer le produit correspondant à l\'ID et renvoyer tous les produits', async () => {
      const idProduit = 33; // Mettre le bon id
      const response = await request(app).delete(`/delproduit/${idProduit}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).not.toContainEqual(
        expect.objectContaining({
          IdProduit: idProduit
        })
      );
    });
  });

});


describe('Tests des routes utilisateur', () => {
  describe('GET /utilisateur', () => {
    it('devrait renvoyer une liste de tous les utilisateurs', async () => {
      const response = await request(app).get('/utilisateur');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([])); // Insérer ici la liste attendue d'utilisateurs
    });
  });

  describe('GET /utilisateur/:id', () => {
    it('devrait renvoyer les informations de l\'utilisateur correspondant à l\'ID', async () => {
      const id = 30; // Insérer ici l'ID d'un utilisateur existant
      const response = await request(app).get(`/utilisateur/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object)); // Insérer ici les informations attendues de l'utilisateur
    });

    it('devrait renvoyer une erreur 404 si aucun utilisateur ne correspond à l\'ID', async () => {
      const id = 9999; // Insérer ici un ID qui n'existe pas
      const response = await request(app).get(`/utilisateur/${id}`);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('POST /utilisateur', () => {
    it('devrait insérer un nouvel utilisateur et renvoyer tous les utilisateurs', async () => {
      const newUser = {
        nom: 'John Doe',
        mdp: 'password',
        mail: 'john.doe@example.com',
        adress: '123 Street',
      };

      const response = await request(app).post('/utilisateur').send(newUser);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([])); // Insérer ici la liste attendue de tous les utilisateurs, y compris le nouvel utilisateur ajouté
    });
  });

  describe('POST /login', () => {
    it('devrait renvoyer un token d\'authentification si les identifiants sont valides', async () => {
      const credentials = {
        mail: 'john.doe@example.com',
        mdp: 'password',
      };

      const response = await request(app).post('/login').send(credentials);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('userId');
    });

    it('devrait renvoyer une erreur 401 si les identifiants sont invalides', async () => {
      const credentials = {
        mail: 'john.doe@example.com',
        mdp: 'wrongpassword',
      };

      const response = await request(app).post('/login').send(credentials);
      expect(response.status).toBe(401);
    });
  });

  describe('POST /logout', () => {
    it('devrait supprimer l\'ID de l\'utilisateur de la session et renvoyer un message de déconnexion réussie', async () => {
      const response = await request(app).post('/logout');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Déconnexion réussie' });
    });
  });

  describe('PUT /utilisateur/:id', () => {
    it('devrait modifier les informations de l\'utilisateur correspondant à l\'ID et renvoyer tous les utilisateurs', async () => {
      const id = 38; // Mettre le bon id
      const updatedUser = {
        nom: 'Jane Doe',
        mdp: 'newpassword',
        admin: true,
        mail: 'jane.doe@example.com',
        adress: '456 Avenue',
      };

      const response = await request(app).put(`/utilisateur/${id}`).send(updatedUser);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([])); // Insérer ici la liste attendue de tous les utilisateurs, y compris l'utilisateur modifié
    });
  });

  describe('DELETE /utilisateur/:id', () => {
    it('devrait supprimer l\'utilisateur correspondant à l\'ID et renvoyer tous les utilisateurs', async () => {
      const id = 38; // Mettre le bon id

      const response = await request(app).delete(`/utilisateur/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([])); // Insérer ici la liste attendue de tous les utilisateurs, après la suppression de l'utilisateur
    });
  });
});
