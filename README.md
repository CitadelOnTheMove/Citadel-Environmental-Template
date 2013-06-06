Citadel-Environmental-Template
==============================

CITADEL on the move - Mobile application template for Environmental Data - www.citadelonthemove.eu

Deployment

1.  Put all the files under a folder named 'citadel-environmental-template' inside the web directory of your local webserver.
2.  Open the Config.php file and fill in your root web directory,e.g. (in a WAMP default installation): 

        define(“HTDOCS_ROOT”, “C:/wamp/www/”)
3.  Configure the Xively feeds you want to monitor inside index.php (defaults in Manchester)
4.  Open a browser and point it at: http://localhost/citadel-environmental-template/index.php
5.  The template application is up and running with the set Xively feeds.

For more details on how to install the template and the underlying technology please refer to the 
[guide documents](doc/Installation Guide-Environmental Template.docx) inside the 'doc' folder. 