-- MySQL dump 10.13  Distrib 5.7.10, for Linux (x86_64)
--
-- Host: localhost    Database: timecontrol
-- ------------------------------------------------------
-- Server version	5.7.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `timecontrol`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `timecontrol` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `timecontrol`;

--
-- Table structure for table `Countries`
--

DROP TABLE IF EXISTS `Countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Countries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Countries`
--

LOCK TABLES `Countries` WRITE;
/*!40000 ALTER TABLE `Countries` DISABLE KEYS */;
INSERT INTO `Countries` VALUES (1,'Afghanistan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Albania','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Algeria','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'American Samoa','0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'Andorra','0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,'Angola','0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,'Anguilla','0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,'Antartica','0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,'Antigua and Barbuda','0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,'Argentina','0000-00-00 00:00:00','0000-00-00 00:00:00'),(11,'Armenia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(12,'Aruba','0000-00-00 00:00:00','0000-00-00 00:00:00'),(13,'Australia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(14,'Austria','0000-00-00 00:00:00','0000-00-00 00:00:00'),(15,'Azerbaijan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(16,'Bahamas','0000-00-00 00:00:00','0000-00-00 00:00:00'),(17,'Bahrain','0000-00-00 00:00:00','0000-00-00 00:00:00'),(18,'Bangladesh','0000-00-00 00:00:00','0000-00-00 00:00:00'),(19,'Barbados','0000-00-00 00:00:00','0000-00-00 00:00:00'),(20,'Belarus','0000-00-00 00:00:00','0000-00-00 00:00:00'),(21,'Belgium','0000-00-00 00:00:00','0000-00-00 00:00:00'),(22,'Belize','0000-00-00 00:00:00','0000-00-00 00:00:00'),(23,'Benin','0000-00-00 00:00:00','0000-00-00 00:00:00'),(24,'Bermuda','0000-00-00 00:00:00','0000-00-00 00:00:00'),(25,'Bhutan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(26,'Bolivia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(27,'Bonaire, Sint Eustatius ans Saba','0000-00-00 00:00:00','0000-00-00 00:00:00'),(28,'Bosnia and Herzegovina','0000-00-00 00:00:00','0000-00-00 00:00:00'),(29,'Botswana','0000-00-00 00:00:00','0000-00-00 00:00:00'),(30,'Bouvet Island','0000-00-00 00:00:00','0000-00-00 00:00:00'),(31,'Brazil','0000-00-00 00:00:00','0000-00-00 00:00:00'),(32,'British Indian Ocean Territory','0000-00-00 00:00:00','0000-00-00 00:00:00'),(33,'Brunei','0000-00-00 00:00:00','0000-00-00 00:00:00'),(34,'Bulgaria','0000-00-00 00:00:00','0000-00-00 00:00:00'),(35,'Burkina Faso','0000-00-00 00:00:00','0000-00-00 00:00:00'),(36,'Burundi','0000-00-00 00:00:00','0000-00-00 00:00:00'),(37,'Cambodia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(38,'Cameroon','0000-00-00 00:00:00','0000-00-00 00:00:00'),(39,'Canada','0000-00-00 00:00:00','0000-00-00 00:00:00'),(40,'Cape Verde','0000-00-00 00:00:00','0000-00-00 00:00:00'),(41,'Cayman Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(42,'Central African Republic','0000-00-00 00:00:00','0000-00-00 00:00:00'),(43,'Chad','0000-00-00 00:00:00','0000-00-00 00:00:00'),(44,'Chile','0000-00-00 00:00:00','0000-00-00 00:00:00'),(45,'China','0000-00-00 00:00:00','0000-00-00 00:00:00'),(46,'Christmas Island','0000-00-00 00:00:00','0000-00-00 00:00:00'),(47,'Cocos (Keeling) Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(48,'Colombia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(49,'Comoros','0000-00-00 00:00:00','0000-00-00 00:00:00'),(50,'Cook islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(51,'Costa Rica','0000-00-00 00:00:00','0000-00-00 00:00:00'),(52,'Cote de azur','0000-00-00 00:00:00','0000-00-00 00:00:00'),(53,'Croatia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(54,'Cuba','0000-00-00 00:00:00','0000-00-00 00:00:00'),(55,'Curacao','0000-00-00 00:00:00','0000-00-00 00:00:00'),(56,'Cyprus','0000-00-00 00:00:00','0000-00-00 00:00:00'),(57,'Czech Republic','0000-00-00 00:00:00','0000-00-00 00:00:00'),(58,'Democratic Republic of the congo.','0000-00-00 00:00:00','0000-00-00 00:00:00'),(59,'Denmark','0000-00-00 00:00:00','0000-00-00 00:00:00'),(60,'Djibouti','0000-00-00 00:00:00','0000-00-00 00:00:00'),(61,'Dominica','0000-00-00 00:00:00','0000-00-00 00:00:00'),(62,'Dominican Republic','0000-00-00 00:00:00','0000-00-00 00:00:00'),(63,'Ecuador','0000-00-00 00:00:00','0000-00-00 00:00:00'),(64,'Egypt','0000-00-00 00:00:00','0000-00-00 00:00:00'),(65,'El Salvador','0000-00-00 00:00:00','0000-00-00 00:00:00'),(66,'Equatorial Guinea','0000-00-00 00:00:00','0000-00-00 00:00:00'),(67,'Eritrea','0000-00-00 00:00:00','0000-00-00 00:00:00'),(68,'Estonia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(69,'Ethiopia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(70,'Falkland islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(71,'Faroe Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(72,'Fiji','0000-00-00 00:00:00','0000-00-00 00:00:00'),(73,'Finland','0000-00-00 00:00:00','0000-00-00 00:00:00'),(74,'France','0000-00-00 00:00:00','0000-00-00 00:00:00'),(75,'French Guiana','0000-00-00 00:00:00','0000-00-00 00:00:00'),(76,'French Polynesia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(77,'French Southern Territory','0000-00-00 00:00:00','0000-00-00 00:00:00'),(78,'Gabon','0000-00-00 00:00:00','0000-00-00 00:00:00'),(79,'Gambia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(80,'Georgia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(81,'Germany','0000-00-00 00:00:00','0000-00-00 00:00:00'),(82,'Ghana','0000-00-00 00:00:00','0000-00-00 00:00:00'),(83,'Gibraltar','0000-00-00 00:00:00','0000-00-00 00:00:00'),(84,'Greece','0000-00-00 00:00:00','0000-00-00 00:00:00'),(85,'Greenland','0000-00-00 00:00:00','0000-00-00 00:00:00'),(86,'Grenada','0000-00-00 00:00:00','0000-00-00 00:00:00'),(87,'Guadaloupe','0000-00-00 00:00:00','0000-00-00 00:00:00'),(88,'Guam','0000-00-00 00:00:00','0000-00-00 00:00:00'),(89,'Guatamala','0000-00-00 00:00:00','0000-00-00 00:00:00'),(90,'Guernsey','0000-00-00 00:00:00','0000-00-00 00:00:00'),(91,'Guinea','0000-00-00 00:00:00','0000-00-00 00:00:00'),(92,'Guinea-Bissau','0000-00-00 00:00:00','0000-00-00 00:00:00'),(93,'Guyana','0000-00-00 00:00:00','0000-00-00 00:00:00'),(94,'Haiti','0000-00-00 00:00:00','0000-00-00 00:00:00'),(95,'Heard Island and McDonals Island','0000-00-00 00:00:00','0000-00-00 00:00:00'),(96,'Honduras','0000-00-00 00:00:00','0000-00-00 00:00:00'),(97,'Hong Kong','0000-00-00 00:00:00','0000-00-00 00:00:00'),(98,'Hungary','0000-00-00 00:00:00','0000-00-00 00:00:00'),(99,'Iceland','0000-00-00 00:00:00','0000-00-00 00:00:00'),(100,'India','0000-00-00 00:00:00','0000-00-00 00:00:00'),(101,'Indonesia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(102,'Iran','0000-00-00 00:00:00','0000-00-00 00:00:00'),(103,'Iraq','0000-00-00 00:00:00','0000-00-00 00:00:00'),(104,'Ireland','0000-00-00 00:00:00','0000-00-00 00:00:00'),(105,'Isle of Man','0000-00-00 00:00:00','0000-00-00 00:00:00'),(106,'Israel','0000-00-00 00:00:00','0000-00-00 00:00:00'),(107,'Italy','0000-00-00 00:00:00','0000-00-00 00:00:00'),(108,'Jamaica','0000-00-00 00:00:00','0000-00-00 00:00:00'),(109,'Japan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(110,'Jersey','0000-00-00 00:00:00','0000-00-00 00:00:00'),(111,'Jordan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(112,'Kazakhstan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(113,'Kenya','0000-00-00 00:00:00','0000-00-00 00:00:00'),(114,'Kiribati','0000-00-00 00:00:00','0000-00-00 00:00:00'),(115,'Kosovo','0000-00-00 00:00:00','0000-00-00 00:00:00'),(116,'Kuwait','0000-00-00 00:00:00','0000-00-00 00:00:00'),(117,'Kyrgyzstan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(118,'Laos','0000-00-00 00:00:00','0000-00-00 00:00:00'),(119,'Latvia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(120,'Lebanon','0000-00-00 00:00:00','0000-00-00 00:00:00'),(121,'Lesotho','0000-00-00 00:00:00','0000-00-00 00:00:00'),(122,'Liberia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(123,'Libya','0000-00-00 00:00:00','0000-00-00 00:00:00'),(124,'Liechtenstein','0000-00-00 00:00:00','0000-00-00 00:00:00'),(125,'Lithuania','0000-00-00 00:00:00','0000-00-00 00:00:00'),(126,'Luxembourg','0000-00-00 00:00:00','0000-00-00 00:00:00'),(127,'Macao','0000-00-00 00:00:00','0000-00-00 00:00:00'),(128,'Macedonia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(129,'Madagascar','0000-00-00 00:00:00','0000-00-00 00:00:00'),(130,'Malawi','0000-00-00 00:00:00','0000-00-00 00:00:00'),(131,'Malaysia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(132,'Maldives','0000-00-00 00:00:00','0000-00-00 00:00:00'),(133,'Mali','0000-00-00 00:00:00','0000-00-00 00:00:00'),(134,'Malta','0000-00-00 00:00:00','0000-00-00 00:00:00'),(135,'Marshall Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(136,'Martinique','0000-00-00 00:00:00','0000-00-00 00:00:00'),(137,'Mauritinia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(138,'Mauritius','0000-00-00 00:00:00','0000-00-00 00:00:00'),(139,'Mayotte','0000-00-00 00:00:00','0000-00-00 00:00:00'),(140,'Mexico','0000-00-00 00:00:00','0000-00-00 00:00:00'),(141,'Micronesia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(142,'Moldava','0000-00-00 00:00:00','0000-00-00 00:00:00'),(143,'Monaco','0000-00-00 00:00:00','0000-00-00 00:00:00'),(144,'Mongolia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(145,'Montenegro','0000-00-00 00:00:00','0000-00-00 00:00:00'),(146,'Montserrat','0000-00-00 00:00:00','0000-00-00 00:00:00'),(147,'Morocco','0000-00-00 00:00:00','0000-00-00 00:00:00'),(148,'Mozambique','0000-00-00 00:00:00','0000-00-00 00:00:00'),(149,'Myanmar (Burma)','0000-00-00 00:00:00','0000-00-00 00:00:00'),(150,'Namibia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(151,'Nauru','0000-00-00 00:00:00','0000-00-00 00:00:00'),(152,'Nepal','0000-00-00 00:00:00','0000-00-00 00:00:00'),(153,'Netherlands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(154,'New Caledonia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(155,'New Zealand','0000-00-00 00:00:00','0000-00-00 00:00:00'),(156,'Nicaragua','0000-00-00 00:00:00','0000-00-00 00:00:00'),(157,'Niger','0000-00-00 00:00:00','0000-00-00 00:00:00'),(158,'Nigeria','0000-00-00 00:00:00','0000-00-00 00:00:00'),(159,'Niue','0000-00-00 00:00:00','0000-00-00 00:00:00'),(160,'Norfolk Island','0000-00-00 00:00:00','0000-00-00 00:00:00'),(161,'North Korea','0000-00-00 00:00:00','0000-00-00 00:00:00'),(162,'Northern Mariana Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(163,'Norway','0000-00-00 00:00:00','0000-00-00 00:00:00'),(164,'Oman','0000-00-00 00:00:00','0000-00-00 00:00:00'),(165,'Pakistan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(166,'Palau','0000-00-00 00:00:00','0000-00-00 00:00:00'),(167,'Palestine','0000-00-00 00:00:00','0000-00-00 00:00:00'),(168,'Panama','0000-00-00 00:00:00','0000-00-00 00:00:00'),(169,'Papua New Guinea','0000-00-00 00:00:00','0000-00-00 00:00:00'),(170,'Paraguay','0000-00-00 00:00:00','0000-00-00 00:00:00'),(171,'Peru','0000-00-00 00:00:00','0000-00-00 00:00:00'),(172,'Phillipines','0000-00-00 00:00:00','0000-00-00 00:00:00'),(173,'Pitcaim','0000-00-00 00:00:00','0000-00-00 00:00:00'),(174,'Poland','0000-00-00 00:00:00','0000-00-00 00:00:00'),(175,'Portugal','0000-00-00 00:00:00','0000-00-00 00:00:00'),(176,'Puerto Rico','0000-00-00 00:00:00','0000-00-00 00:00:00'),(177,'Qatar','0000-00-00 00:00:00','0000-00-00 00:00:00'),(178,'Reunion','0000-00-00 00:00:00','0000-00-00 00:00:00'),(179,'Romania','0000-00-00 00:00:00','0000-00-00 00:00:00'),(180,'Russia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(181,'Rwanda','0000-00-00 00:00:00','0000-00-00 00:00:00'),(182,'Saint Barthelemy','0000-00-00 00:00:00','0000-00-00 00:00:00'),(183,'Saint Helena','0000-00-00 00:00:00','0000-00-00 00:00:00'),(184,'Saint Kitts and Nevis','0000-00-00 00:00:00','0000-00-00 00:00:00'),(185,'Saint Lucia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(186,'Saint Martin','0000-00-00 00:00:00','0000-00-00 00:00:00'),(187,'Saint Pierre and Miquelon','0000-00-00 00:00:00','0000-00-00 00:00:00'),(188,'Saint Vincent and the Grenadines','0000-00-00 00:00:00','0000-00-00 00:00:00'),(189,'Samoa','0000-00-00 00:00:00','0000-00-00 00:00:00'),(190,'San Marino','0000-00-00 00:00:00','0000-00-00 00:00:00'),(191,'San Tome and Principe','0000-00-00 00:00:00','0000-00-00 00:00:00'),(192,'Saudi Arabia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(193,'Senegal','0000-00-00 00:00:00','0000-00-00 00:00:00'),(194,'Serbia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(195,'Seychelles','0000-00-00 00:00:00','0000-00-00 00:00:00'),(196,'Sierra Leone','0000-00-00 00:00:00','0000-00-00 00:00:00'),(197,'Singapore','0000-00-00 00:00:00','0000-00-00 00:00:00'),(198,'Sint Maarten','0000-00-00 00:00:00','0000-00-00 00:00:00'),(199,'Slovakia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(200,'Slovenia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(201,'Solomon Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(202,'Somalia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(203,'South Africa','0000-00-00 00:00:00','0000-00-00 00:00:00'),(204,'South Georgia and the South Sandwich Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(205,'South Korea','0000-00-00 00:00:00','0000-00-00 00:00:00'),(206,'Spain','0000-00-00 00:00:00','0000-00-00 00:00:00'),(207,'Sri Lanka','0000-00-00 00:00:00','0000-00-00 00:00:00'),(208,'Sudan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(209,'Suriname','0000-00-00 00:00:00','0000-00-00 00:00:00'),(210,'Svalbard and Jan Mayen','0000-00-00 00:00:00','0000-00-00 00:00:00'),(211,'Swaziland','0000-00-00 00:00:00','0000-00-00 00:00:00'),(212,'Sweden','0000-00-00 00:00:00','0000-00-00 00:00:00'),(213,'Switzerland','0000-00-00 00:00:00','0000-00-00 00:00:00'),(214,'Syria','0000-00-00 00:00:00','0000-00-00 00:00:00'),(215,'Taiwan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(216,'Tajikistan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(217,'Tanzania','0000-00-00 00:00:00','0000-00-00 00:00:00'),(218,'Thailand','0000-00-00 00:00:00','0000-00-00 00:00:00'),(219,'Timor-Leste (East Timot)','0000-00-00 00:00:00','0000-00-00 00:00:00'),(220,'Togo','0000-00-00 00:00:00','0000-00-00 00:00:00'),(221,'Tokelau','0000-00-00 00:00:00','0000-00-00 00:00:00'),(222,'Tonga','0000-00-00 00:00:00','0000-00-00 00:00:00'),(223,'Trinidad and Tobago','0000-00-00 00:00:00','0000-00-00 00:00:00'),(224,'Tunesia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(225,'Turkey','0000-00-00 00:00:00','0000-00-00 00:00:00'),(226,'Turkmenistan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(227,'Turks and Caicos Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(228,'Tuvalu','0000-00-00 00:00:00','0000-00-00 00:00:00'),(229,'Uganda','0000-00-00 00:00:00','0000-00-00 00:00:00'),(230,'Ukraine','0000-00-00 00:00:00','0000-00-00 00:00:00'),(231,'United Arab Emirates','0000-00-00 00:00:00','0000-00-00 00:00:00'),(232,'United Kingdom','0000-00-00 00:00:00','0000-00-00 00:00:00'),(233,'United States','0000-00-00 00:00:00','0000-00-00 00:00:00'),(234,'United States Minor Outlying Islands','0000-00-00 00:00:00','0000-00-00 00:00:00'),(235,'Uruguay','0000-00-00 00:00:00','0000-00-00 00:00:00'),(236,'Uzbekistan','0000-00-00 00:00:00','0000-00-00 00:00:00'),(237,'Vanuatu','0000-00-00 00:00:00','0000-00-00 00:00:00'),(238,'Vatican City','0000-00-00 00:00:00','0000-00-00 00:00:00'),(239,'Venezuela','0000-00-00 00:00:00','0000-00-00 00:00:00'),(240,'Vietnam','0000-00-00 00:00:00','0000-00-00 00:00:00'),(241,'Virigin Islands (British)','0000-00-00 00:00:00','0000-00-00 00:00:00'),(242,'Vigin Islands (US)','0000-00-00 00:00:00','0000-00-00 00:00:00'),(243,'Wallis and Futuna','0000-00-00 00:00:00','0000-00-00 00:00:00'),(244,'Western Sahara','0000-00-00 00:00:00','0000-00-00 00:00:00'),(245,'Yemen','0000-00-00 00:00:00','0000-00-00 00:00:00'),(246,'Zambia','0000-00-00 00:00:00','0000-00-00 00:00:00'),(247,'Zimbabwe','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `Countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `absenteeism`
--

DROP TABLE IF EXISTS `absenteeism`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `absenteeism` (
  `absenteeism_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`absenteeism_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absenteeism`
--

LOCK TABLES `absenteeism` WRITE;
/*!40000 ALTER TABLE `absenteeism` DISABLE KEYS */;
INSERT INTO `absenteeism` VALUES (1,'Sick','2016-02-03','2016-02-29',1,'fsfsdfsdf','2016-02-03 00:21:05','2016-02-03 00:21:05');
/*!40000 ALTER TABLE `absenteeism` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `department_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `department_manager` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `department_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1),('2015_12_02_194303_Departments',1),('2015_12_05_170636_create_permission_tables',1),('2015_12_13_155910_create_teams',1),('2015_12_31_151046_Countries_Table',1),('2016_02_02_184158_register_absenteeism',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'manage_users','manage user accounts','2016-02-03 00:20:50','2016-02-03 00:20:50'),(2,'manage_break','manage break queue','2016-02-03 00:20:50','2016-02-03 00:20:50'),(3,'manage_departments','manage departments','2016-02-03 00:20:50','2016-02-03 00:20:50'),(4,'manage_teams','manage teams','2016-02-03 00:20:50','2016-02-03 00:20:50');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrator','','2016-02-03 00:20:50','2016-02-03 00:20:50'),(2,'Agent','','2016-02-03 00:20:50','2016-02-03 00:20:50'),(3,'Department manager','','2016-02-03 00:20:50','2016-02-03 00:20:50'),(4,'Manager','','2016-02-03 00:20:50','2016-02-03 00:20:50');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `manager` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_permissions`
--

DROP TABLE IF EXISTS `user_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_has_permissions` (
  `user_id` int(10) unsigned NOT NULL,
  `permission_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`permission_id`),
  KEY `user_has_permissions_permission_id_foreign` (`permission_id`),
  CONSTRAINT `user_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_has_permissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_permissions`
--

LOCK TABLES `user_has_permissions` WRITE;
/*!40000 ALTER TABLE `user_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_roles`
--

DROP TABLE IF EXISTS `user_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_has_roles` (
  `role_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `user_has_roles_user_id_foreign` (`user_id`),
  CONSTRAINT `user_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_has_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_roles`
--

LOCK TABLES `user_has_roles` WRITE;
/*!40000 ALTER TABLE `user_has_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `department` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `team` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'User','Admin','Foobar street 4','','Brussels','Belgium','admin@timecontrol.be','$2y$10$2nuI6u9Oa66ekXTj.J4C4eLNkU6tGK5b9GQ49HvKIdEvUsNa7t/D6','','','0','0',NULL,'2016-02-03 00:20:50','2016-02-03 00:20:50'),(2,'User','Default','Foobar street 4','','Brussels','Belgium','agent@timecontrol.be','$2y$10$7HpkNM2NblCAzfXd1u43pu8EY07lrY/dTRXUv3n85LwmUvomimQ46','','','0','0',NULL,'2016-02-03 00:20:50','2016-02-03 00:20:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-03  0:24:06
