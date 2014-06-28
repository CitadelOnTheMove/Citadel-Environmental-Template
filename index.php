<?php include_once 'Config.php'; ?>
<!DOCTYPE html>
<html>
    <head> 
        <title>Environmental Template</title> 
        <!--------------- Metatags ------------------->   
        <meta charset="utf-8" />
        <!-- Not allowing the user to zoom -->    
        <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0"/>
        <!-- iphone-related meta tags to allow the page to be bookmarked -->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        <!--------------- CSS files -------------------> 
        <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.2/jquery.mobile.min.css" />
        <!--        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />        -->
        <!--      <link rel="stylesheet" href="css/environmental.min.css" />-->
        <!--        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile.structure-1.2.0.min.css" /> -->
        <link rel="stylesheet" href="css/my.css" />


        <!--------------- Javascript dependencies -------------------> 

        <!-- Google Maps JavaScript API v3 -->    
        <script type="text/javascript"
                src="https://maps.googleapis.com/maps/api/js?sensor=false">
        </script>
        <!-- Google Maps Utility Library - Infobubble -->     
        <script type="text/javascript"
                src = "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobubble/src/infobubble.js">
        </script>
        <!-- Overlapping markers Library: Deals with overlapping markers in Google Maps -->
        <script src="http://jawj.github.com/OverlappingMarkerSpiderfier/bin/oms.min.js"></script>  
        <!-- jQuery Library --> 
        <script src="js/jquery-1.8.2.min.js"></script>
        <!-- Date Format Library --> 
        <script src="js/date.format.js"></script>
        <!-- jQuery Mobile Library -->
        <script src="//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.2/jquery.mobile.min.js"></script>
<!--        <script src="js/jquery.mobile-1.2.0.min.js"></script>  -->
        <!-- Page params Library: Used to pass query params to embedded/internal pages of jQuery Mobile -->
        <script src="js/jqm.page.params.js"></script>        
        <!-- Template specific functions and handlers -->    
        <script src="js/environmental-lib.js"></script>  

    </head> 

    <body>

        <!--  List Page: Contains a list with environmental categories  -->
        <div data-role="page" id="homePage" class="page">

            <header data-role="header" data-position="fixed" data-id="constantNav">
                <h1>Environmental Data</h1>               
            </header>

            <!--            <div class="list-container">-->
            <div data-role="content" id="category" > 
                <ul data-role='listview' data-theme='a'>
                    <!-- dynamically filled with data -->
                </ul>
            </div>

            <!--            </div>list-container-->
        </div><!-- /page -->

        <!-- Home Page: Contains the Map -->
        <div data-role="page" id="page1" class="page">
            <header data-role="header" data-position="fixed" data-id="constantNav" data-fullscreen="true" data-tap-toggle="false">
                <h1>Environmental Template</h1>
                <a href="#homePage" data-icon="bars" data-iconpos="notext" data-theme="a" title="Environmental Categories" class="ui-btn-left"></a>      

                <div data-role="navbar" class="navbar">
                    <ul>
                        <li><a href="#" class="feeds-nearme" data-theme="a">Near me</a></li>
                        <li><a href="#" class="feeds-showall ui-btn-active" data-theme="a">Show all</a></li>
                        <li><a href="#page2" class="feeds-list" data-theme="a">List</a></li>
                    </ul>
                </div><!-- /navbar -->
            </header>

            <div data-role="content" id="map-filter">              
                <div class="filters-list" id="mapFilterList">
                    <fieldset data-role="controlgroup" data-mini="true" data-theme="a">
                        <!-- dynamically filled with data -->
                    </fieldset>
                </div>             
            </div>

            <div data-role="content" id="map-container">
                <div id="map_canvas" class="map_canvas"></div>
            </div>
        </div> <!-- /page -->


        <!--  List Page: Contains a list with the results  -->
        <div data-role="page" id="page2" class="page">

            <header data-role="header" data-position="fixed" data-id="constantNav">
                <h1> Sensors </h1> 
                <a href="#homePage" data-icon="bars" data-iconpos="notext" data-theme="a" title="Environmental Data" class="ui-btn-left"></a>      
                <a href="" data-icon="back" data-iconpos="notext" data-theme="a" title="Back" data-rel="back" class="ui-btn-right">&nbsp;</a>
                <div data-role="navbar" class="navbar">
                    <ul>
                        <li><a href="#" class="feeds-nearme" data-theme="a">Near me</a></li>
                        <li><a href="#" class="feeds-showall" data-theme="a">Show all</a></li>
                        <li><a href="#" class="feeds-list ui-btn-active" data-theme="a">List</a></li>
                    </ul>
                </div><!-- /navbar -->
            </header>

            <div class="list-container">
                <div class="list-scroll-container">
                    <div data-role="content" id="list" >
                        <ul data-role='listview' data-filter='true' data-theme='a'>
                            <!-- dynamically filled with data -->
                        </ul>
                    </div><!--list-->
                </div><!--list-scroll-container-->
            </div><!--list-container-->
        </div><!-- /page -->


        <!-- Details Page: Contains the details of a selected element -->

        <div data-role="page" id="page3" class="page">
            <header data-role="header" data-position="fixed" >

                <h1> Details</h1>
                <a href="" data-icon="back" data-iconpos="notext" data-theme="a" title="Back" data-rel="back" class="ui-btn-right">&nbsp;</a>
                <a href="#info"  data-transition="pop" data-icon="info" data-iconpos="notext" data-theme="a" title="Info" class="ui-btn-left">&nbsp;</a>

            </header>


            <div data-role="content" id="item">
               
                <a onclick='seeOnMap(); return false;'  class="ui-btn ui-shadow ui-corner-all ui-icon-location ui-btn-icon-notext">See on map</a>
                <span id="detailsTitle"></span>
                <ul  data-role="listview" data-inset="true">
                </ul>
                <div class="ui-body ui-body-a ui-corner-all">
                    <p id="categoryDescription"></p></div>

                <input id="historyButton" data-icon="history" data-iconpos="right" value="View History" type="button">

            </div><!--item-->

        </div> <!-- page --> 



        <!-- Info Page: Contains info of the currently used dataset -->  
        <div data-role="page" data-dialog="true" id="info">

            <header data-role="header">
                <span class="ui-title">Sensor Metadata</span>	
            </header>

            <article data-role="content">
                <ul id="sensorInfo" data-role="listview">
                    <!-- dynamically filled with data -->
                </ul> 
            </article> 
        </div> <!--info-->




        <!-- History graph: The history graph of a datastream -->  
        <div data-role="dialog" id="history-graph">
            <header data-role="header">
                <span class="ui-title">History Graph</span>	
            </header>

            <div data-role="fieldcontain" style="padding-left:10%;">
                <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                    <legend>Date range<br><small>select a period</small></legend>
<!--                    <input name="radio-action" id="24h" value="24h" checked="checked" type="radio">-->
                    <input name="radio-action" id="24h" value="24h" type="radio">
                    <label for="24h">24h</label>
                    <input name="radio-action" id="3days" value="3days" type="radio">
                    <label for="3days">3 days</label>
                    <input name="radio-action" id="14days" value="14days" type="radio">
                    <label for="14days">14 days</label>
                </fieldset>
            </div>   


            <article id="graph" data-role="content">
                <!-- dynamically filled with the graph image -->
            </article> 
        </div> 

        <script type="text/javascript">
            /****************** Global js vars ************************/
            /* GLobal map object */
            var map;
            /* List of feeds read from json object */
            //            "36075",
            var feeds = new Array("125493", "125492", "125488", "125490");
            var cachedfeedsArray = {};
            var mapIsReady = false;
            var markerDataIsReady = false;

            /* Holds all markers */
            var markersArray = new Array();

            /* var oms will hold all the markers so as to resolve
             * the issue of overlapping ones
             */
            var oms;

            /* Remember if a page has been opened at least once */
            var lastLoaded = '';
            /* Remember if 'near me' marker is loaded */
            var isNearMeMarkerLoaded = false;
            /* 
             * Remember if map was initialy loaded. If not
             * it means we loaded list page
             */
            var isMapLoaded = false;
            /*
             * Keeps page id to emulate full url using querystring
             */
            var pageId = 0;
            /* Set infoBubble global variable */
            var infoBubble;

            /* The coordinates of the center of the map */
            var mapLat = <?php echo MAP_CENTER_LATITUDE; ?>;
            var mapLon = <?php echo MAP_CENTER_LONGITUDE; ?>;
            var mapZoom = <?php echo MAP_ZOOM; ?>;
            
            var ozoneDescription = "<?php echo OZONE_DESCRIPTION; ?>";
            var temperatureDescription = "<?php echo TEMPERATURE_DESCRIPTION; ?>";
            var humidityDescription = "<?php echo HUMIDITY_DESCRIPTION; ?>";
            var noiseDescription = "<?php echo NOISE_DESCRIPTION; ?>";
            var carbonMonoxideDescription = "<?php echo CARBON_MONOXIDE_DESCRIPTION; ?>";
            var carbonDioxideDescription = "<?php echo CARBON_DIOXIDE_DESCRIPTION; ?>";
            var nitrogenDioxideDescription = "<?php echo NITROGEN_DIOXIDE_DESCRIPTION; ?>";

            /* Just call the initialization function when the page loads */
            $(window).load(function() {
                globalInit();
            });

        </script>
    </body>
</html>