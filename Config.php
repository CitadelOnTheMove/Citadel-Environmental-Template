<?php
/*
 * Configuration settings
*/

// Useful directories
$root_path = dirname(dirname(__FILE__)) . '/';
$web_path = dirname($_SERVER['PHP_SELF']);
$relative_path = $_SERVER['SERVER_NAME'] . dirname($web_path) . '/';
$path_parts = explode('/', $web_path);
$app_path = end($path_parts) . '/';
if (isset($_SERVER['HTTPS'])) {
	$server_name = "https://" . $relative_path;
} else {
	$server_name = "http://" . $relative_path;
}

// directories
define("HTDOCS_ROOT", $root_path); //Don't forget to insert the web root directory (for example:
                                       // "C:/wamp/www/")
define("BASE_DIR", $app_path);
define("CLASSES_DIR", "php/");
define("CLASSES", HTDOCS_ROOT . BASE_DIR . CLASSES_DIR);
define("SERVERNAME", $server_name); //Don't forget to replace localhost
                                           //with your IP address, if you want to connect to the template                                                 with your mobile phone

define("DEBUG", false);

// Map center and zoom level
define("MAP_CENTER_LATITUDE", 53.483526);
define("MAP_CENTER_LONGITUDE", -2.23065399999996);
define("MAP_ZOOM", 6);
//description of environmental categories
define("OZONE_DESCRIPTION", "Ozone is not directly emitted, but is formed by a complex set of reactions involving nitrogen oxides and hydrocarbons in the presence of sunlight. Like nitrogen dioxide, high levels of ozone can irritate and inflame the lungs. It can also cause eye irritation, migraine and coughing.");
define("NITROGEN_DIOXIDE_DESCRIPTION", "Nitrogen oxides are formed during high temperature combustion processes from the oxidation of nitrogen in the air or fuel. Nitrogen Dioxide has several health impacts and includes general irritation to the eyes, irritation of the respiratory system and shortness of breath.");
define("CARBON_DIOXIDE_DESCRIPTION", "Carbon dioxide is a colorless gas that contributes to global warming. Exposure to concentrations of 10 percent or more of carbon dioxide can cause death, unconsciousness, or convulsions. Exposure may damage a developing fetus. Exposure to lower concentrations of carbon dioxide can cause hyperventilation, vision damage, lung congestion, central nervous system injury, abrupt muscle contractions, elevated blood pressure, and shortness of breath. Exposure can also cause dizziness, headache, sweating, fatigue, numbness and tingling of extremities, memory loss, nausea, vomiting, depression, confusion, skin and eye burns, and ringing in the ears.");
define("CARBON_MONOXIDE_DESCRIPTION", "Carbon monoxide is a odorless, tasteless, colorless and toxic gas. Carbon monoxide is produced as a by-product of combustion. Any combustion process, fuel burning appliance, vehicle or other device has the potential to produce carbon monoxide gas. Breathing CO can cause headache, dizziness, vomiting, and nausea. If CO levels are high enough, you may become unconscious or die. Exposure to moderate and high levels of CO over long periods of time has also been linked with increased risk of heart disease.");
define("TEMPERATURE_DESCRIPTION", "A temperature is a numerical measure of hot and cold. Its measurement is by detection of heat radiation, particle velocity, kinetic energy, or most commonly, by the bulk behavior of a thermometric material. It may be calibrated in any of various temperature scales, Celsius, Fahrenheit, Kelvin, etc.");
define("NOISE_DESCRIPTION", "Noise means any unwanted sound. Elevated workplace or other noise can cause hearing impairment, hypertension, ischemic heart disease, annoyance, and sleep disturbance.");
define("HUMIDITY_DESCRIPTION", "Humidity is the amount of water vapor in the air. Ideal humidity is generally described as between 40 percent and 60 percent, although some experts believe it should be closer to 35-45 percent. When humidity is higher than this, as is common in the summer, it can contribute to the growth of mold, dust mites, and fungus, making it particularly dangerous for people with asthma and allergies. Low humidity is equally dangerous, however, and may even lead to serious complications to your health.");


