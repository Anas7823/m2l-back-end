-- MariaDB dump 10.19  Distrib 10.11.0-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: m2l
-- ------------------------------------------------------
-- Server version	10.11.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `compte`
--

DROP TABLE IF EXISTS `compte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compte` (
  `IdCompte` int(11) NOT NULL AUTO_INCREMENT,
  `NomCompte` varchar(50) NOT NULL,
  `MdpCompte` varchar(50) NOT NULL,
  `CompteAdmin` tinyint(1) DEFAULT 0,
  `MailCompte` varchar(50) NOT NULL,
  `AdresseCompte` varchar(50) CHARACTER SET utf8mb3 NOT NULL,
  PRIMARY KEY (`IdCompte`),
  UNIQUE KEY `NomCompte` (`NomCompte`,`MailCompte`),
  UNIQUE KEY `MailCompte` (`MailCompte`),
  UNIQUE KEY `NomCompte_2` (`NomCompte`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compte`
--

LOCK TABLES `compte` WRITE;
/*!40000 ALTER TABLE `compte` DISABLE KEYS */;
INSERT INTO `compte` VALUES
(2,'test2','Test',0,'Test2@gmail','10 Rue Test'),
(3,'test3','Test',0,'Test3@gmail','10 Rue Test'),
(4,'test4','Test',0,'Test4@gmail','10 Rue Test'),
(5,'test5','Test',0,'Test5@gmail','10 Rue Test'),
(6,'sgfsdg','srgegvqsfzt',0,'sdfgdfbtyed@gmail.com','srgedfqet');
/*!40000 ALTER TABLE `compte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `couleur`
--

DROP TABLE IF EXISTS `couleur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `couleur` (
  `IdCouleur` int(11) NOT NULL AUTO_INCREMENT,
  `HexadecimalCouleur` varchar(500) NOT NULL,
  `AltICouleur` varchar(50) DEFAULT NULL,
  `IdProduit` int(11) NOT NULL,
  PRIMARY KEY (`IdCouleur`),
  KEY `IdProduit` (`IdProduit`),
  CONSTRAINT `couleur_ibfk_1` FOREIGN KEY (`IdProduit`) REFERENCES `produit` (`IdProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `couleur`
--

LOCK TABLES `couleur` WRITE;
/*!40000 ALTER TABLE `couleur` DISABLE KEYS */;
/*!40000 ALTER TABLE `couleur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `IdImage` int(11) NOT NULL AUTO_INCREMENT,
  `LienImage` varchar(500) NOT NULL,
  `AltImage` varchar(50) DEFAULT NULL,
  `IdProduit` int(11) NOT NULL,
  PRIMARY KEY (`IdImage`),
  KEY `IdProduit` (`IdProduit`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`IdProduit`) REFERENCES `produit` (`IdProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panier`
--

DROP TABLE IF EXISTS `panier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panier` (
  `IdProduit` int(11) NOT NULL,
  `IdCompte` int(11) NOT NULL,
  `PanierTotal` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdProduit`,`IdCompte`),
  KEY `IdCompte` (`IdCompte`),
  CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`IdProduit`) REFERENCES `produit` (`IdProduit`),
  CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`IdCompte`) REFERENCES `compte` (`IdCompte`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panier`
--

LOCK TABLES `panier` WRITE;
/*!40000 ALTER TABLE `panier` DISABLE KEYS */;
/*!40000 ALTER TABLE `panier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit`
--

DROP TABLE IF EXISTS `produit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produit` (
  `IdProduit` int(11) NOT NULL AUTO_INCREMENT,
  `NomProduit` varchar(50) DEFAULT NULL,
  `PrixProduit` float DEFAULT NULL,
  `StockProduit` int(11) NOT NULL,
  `IdSport` int(11) NOT NULL,
  PRIMARY KEY (`IdProduit`),
  KEY `IdSport` (`IdSport`),
  CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`IdSport`) REFERENCES `sport` (`IdSport`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit`
--

LOCK TABLES `produit` WRITE;
/*!40000 ALTER TABLE `produit` DISABLE KEYS */;
INSERT INTO `produit` VALUES
(1,'Lunettes de Squash Prince Pro Lite',24.99,0,3),
(2,'Raquette de Squash Perfly Fell155',44.59,0,3),
(3,'Raquette de Squash Adulte IP 9RK',169,0,3),
(4,'Balles de Squash SB 990 Double Point Jaune x2',5,0,3),
(5,'Housse de protection Raquette de Squash SL 100',5.49,0,3),
(6,'Chasuble',2.5,0,2),
(7,'Panier de basket réglable - B100 Noir',119,0,2),
(8,'Pompe double action jaune noir',6,0,2),
(9,'Jordan One Take 4',99.99,0,2),
(10,'NBA DRV PLUS Outdoor',24.99,0,2),
(11,'Gant de gardien - F100 Resist Noir Gris',10,0,1),
(12,'Protège-Tibias Adidas Tiro Match Noirs',15,0,1),
(13,'But de foot - Power Shot',74.99,0,1),
(14,'Bâche de précision - Kipsta',20,0,1),
(15,'Chaussure Predator EDGE.3 FG',90,0,1),
(16,'Ballon Souvenir de la Ligue des Champions 2021',28.99,0,1);
/*!40000 ALTER TABLE `produit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sport`
--

DROP TABLE IF EXISTS `sport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sport` (
  `IdSport` int(11) NOT NULL AUTO_INCREMENT,
  `NomSport` varchar(50) NOT NULL,
  PRIMARY KEY (`IdSport`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sport`
--

LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */;
INSERT INTO `sport` VALUES
(1,'Football'),
(2,'Basketball'),
(3,'Squash');
/*!40000 ALTER TABLE `sport` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-20 15:08:46
