<?php
/*
 * Configuration settings
*/

// directories
define("HTDOCS_ROOT", "C:/wamp/www/"); //Don't forget to insert the web root directory (for example:
                                       // "C:/wamp/www/")
define("BASE_DIR", "environmental-template/" );
define("CLASSES_DIR", "php/");
define("CLASSES", HTDOCS_ROOT . BASE_DIR . CLASSES_DIR);
define("SERVERNAME", "http://localhost/"); //Don't forget to replace localhost
                                           //with your IP address, if you want to connect to the template                                                 with your mobile phone

define("DEBUG", false);

// Map center and zoom level
define("MAP_CENTER_LATITUDE", 53.483526);
define("MAP_CENTER_LONGITUDE", -2.23065399999996);
define("MAP_ZOOM", 6);
?>