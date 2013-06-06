/*****************Global variables********************/
var feednt = null;
var geocoder;


/****************** Functions *****************************/

/* Initialization function.
 * It is called once when the page is load
 */
function globalInit() {

    hideAddressBar();
    setTimeout(function() {
        fixMapHeight();
        initializeMap(mapLat, mapLon);
    }, 500);

    //Enable scroll for older versions of android
    touchScroll('mapFilterList');
}


/* Initialises a google map using map api v3 */
function initializeMap(Lat, Lon) {

    //define the center location 
    var myLatlng = new google.maps.LatLng(Lat, Lon);
    //define the map options
    var mapOptions = {
        center: myLatlng,
        zoom: mapZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //instantiate the map wih the options and put it in the div holder, "map-canvas"
    map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

    $.each(markersArray, function(i, marker) {
        marker.setMap(null);
    });

    if (infoBubble)
        overrideBubbleCloseClick();

    /* var oms will hold all the markers so as to resolve
     * the issue of overlapping ones
     */
    oms = new OverlappingMarkerSpiderfier(map);
    var iw = new google.maps.InfoWindow();
    oms.addListener('click', function(marker) {
        iw.setContent(marker.desc);
        iw.open(map, marker);
    });

    /* We initialize the infobubble styling */
    infoBubble = new InfoBubble({
        shadowStyle: 1,
        padding: 0,
        backgroundColor: '#F8804F',
        borderRadius: 10,
        arrowSize: 10,
        borderWidth: 2,
        maxWidth: 300,
        borderColor: '#f8b24f',
        disableAutoPan: false,
        arrowPosition: 30,
        arrowStyle: 2,
        hideCloseButton: true
    });
}


// Function for adding a marker to the page.
// Markers are added asynchronously as we read the xively feeds
function addMarker(feed) {
    var current_markerpos = new google.maps.LatLng(feed.location.lat, feed.location.lon);
    var marker_image = getMarkerImage();
    var current_marker = new google.maps.Marker({
        position: current_markerpos,
        map: map,
        icon: marker_image
    });

    markersArray[feed.id] = current_marker;
    oms.addMarker(current_marker);
    google.maps.event.addListener(current_marker, 'click', function() {
        infoBubble.setContent(setInfoWindowSensor(feed));
        infoBubble.open(map, current_marker);

        setTimeout("$('#feedBubble').parent().parent().css('overflow', 'hidden')", 100);
    });
}

/*
 * Returns the marker image picking a unique color for every category
 */
function getMarkerImage() {

    return 'images/sensor.png';
}

/* Sets the content of the infoBubble for the given 
 * feed
 */
function setInfoWindowSensor(feed)
{
    var date = new Date(feed.datastreams[0].at);
    var measureDate = dateFormat(date, "dd/mm/yyyy, hh:MM:ss");

    var contentTemplate =
            "<div id='feedBubble'><a href='#page3' onclick='overrideDetailClick(\"" +
            feed.id + "\"); return false;'>" +
            "<div class='title'>" +
            feed.title +
            "</div>" +
            "<div class='measureDate'>" + measureDate +
            "</div>" + "<div class='value'>" + feed.datastreams[0].current_value +
            " " + feed.datastreams[0].unit.label +
            "</div>" + "</a></div><div id='bubbleClose'><a href='' onclick='return overrideBubbleCloseClick();'><img src='images/close.png' width='25' height='25' alt='close' /></a></div>";

    return contentTemplate;
}

/* Sets the content of the details page for the given 
 * event
 */
function setDetailPageSensor(feed) {

    setInfoPage(feed);
    var contentTemplate =
            "<div class='feed-data'>" +
            "<div class='title'>" + feed.title + "</div>" +
            "<ul>";

    $.each(feed.datastreams, function(i, stream) {

        var date = new Date(stream.at);
        var measureDate = dateFormat(date, "dd/mm/yyyy, hh:MM:ss");

        var image = "";
        var text = "";
        var iconLegend = "";

        $.each(stream.tags, function(j, tg) {
            tag = tg.toString().toLowerCase();

            switch (tag) {
                case "temperature":
                    image = "<img src='images/temperature2.png' alt='Temperature' />";
                    iconLegend = tag;
                    text = "";
                    break;

                case "humidity":
                    image = "<img src='images/humidity.png' alt='Humidity' />";
                    iconLegend = tag;
                    text = "";
                    break;

                case "carbon dioxide":
                    image = "<img src='images/icon-co2.png' alt='Carbon2' />";
                    iconLegend = tag;
                    break;

                case "noise":
                    image = "<img src='images/decibel.png' alt='Noise' />";
                    iconLegend = tag;
                    break;

                case "carbon monoxide":
                    image = "<img src='images/icon-co.png' alt='Carbon' />";
                    iconLegend = tag;
                    break;

                case "ozone":
                    image = "<img src='images/icon-o3.png' alt='Ozone' />";
                    iconLegend = tag;
                    break;

                case "nitrogen dioxide":
                    image = "<img src='images/icon-no2.png' alt='Nitrogen' />";
                    iconLegend = tag;
                    break;

                case "electricity":
                    image = "<img src='images/icon-power.png' alt='Electricity' />";
                    iconLegend = tag;
                    break;

                default :
                    if (image != "") {
                        text = "";
                    }
                    else {
                        text = "<div class='text'>" + tag + " " + "</div>";
                        image = "";
                        iconLegend = "";
                    }
                    break;
            }
        });

        var unit = "";
        if (stream.unit != 'undefined' && stream.unit != null)
            unit = stream.unit.label;

        contentTemplate += "<li id='mylist'><span class='image-icon'>" + image + "</span>" + text + "<div class='showDetails'>" + iconLegend + "</div><span class='image-text'>" + stream.current_value + " " + unit + "</span><div class='feedDetails'></div><div id='center-button'><a href='#' data-role='button' data-icon='feed-graph' onclick='historyGraphClick(" + feed.id + ",\"" + stream.id + "\"); return false;'>History </a></div><div class='valueDate'>"
                + measureDate + "</div><div class='feedDetails'></div></li>";
    });
    return contentTemplate;
}


/* Sets the content of the Listing Page      */
function setListPageSensors()
{
    var contentTemplate = "";

    $.each(cachedfeedsArray, function(i, feed) {

        //var isFavourite = getFavouriteValue(feed.id);
        var imageClass = "sdfsdf";//(isFavourite ? "star" : getMarkerClass(feed.category[0]));
        var className = "sdfsdf";//(isFavourite ? " class='favourite'" : " class='nonfavourite'");

        contentTemplate +=
                "<li>" +
                "<a href='' onclick='overrideDetailClick(\"" + feed.id + "\"); return false;'>" +
                "<span class='" + imageClass + " icon'></span>" +
                "<h3>" + feed.title + "</h3>" +
                "<h4>" + showAlltags(feed.tags) + "</h4>" +
                "</a>" +
                "</li>";
    }
    );
    return contentTemplate;
}


/* Sets the content of the info page 
 * based on dataset metadata
 */
function setInfoPage(feed)
{
    var updated = dateFormat(new Date(feed.updated), "dd/mm/yyyy, hh:MM:ss");
    var created = dateFormat(new Date(feed.created), "dd/mm/yyyy, hh:MM:ss");

    var contentTemplate = "<li>Feed Id: <b>" + feed.id + "</b></li>" +
            "<li>Title: <b>" + feed.title + "</b></li>" +
            "<li>Status: <b>" + feed.status + "</b></li>" +
            "<li>Creator: <b>" + feed.creator + "</b></li>" +
            "<li>Created: <b>" + created + "</b></li>" +
            "<li>Updated: <b>" + updated + "</b></li>" +
            "<li>Tags: " + showAlltags(feed.tags) + "</li>";
    $('#info > article > ul').html(contentTemplate);
}


/* Bubble on click event listener */
function overrideDetailClick(id) {
    //Get feed by id
    var feed = cachedfeedsArray[id];
    //Pass data to details constructor
    $('#item').html(setDetailPageSensor(feed));
    $.mobile.changePage("#page3", {transition: "none", reverse: false, changeHash: false});
    window.location.href = "#page3?id=" + id;
    return true;
}


/* Bubble close click feed listener */
function overrideBubbleCloseClick() {
    infoBubble.close();
    return false;
}

/* Load list page using feeds variable */
function loadListPageData() {
    $('#list > ul').html(setListPageSensors());
}

/* Refreshes the list of feeds in the List Page */
function refreshListPageView() {
    if ($("#list > ul").hasClass("ui-listview")) {
        $("#list > ul").listview('refresh');
    }
}

/* Called from details page. It calls the png graph from xively
 * 
 * @param {id} feed_id
 * @param {id} datastream_id
 * @returns {Boolean}
 */


function historyGraphClick(feed_id, datastream_id) {
    $("#graph").hide();
    var src = "https://api.xively.com/v2/feeds/" + feed_id + "/datastreams/" +
            datastream_id + ".png?w=360&h=240&b=true&t=" + cachedfeedsArray[feed_id].tags[0];
    var contentGraph = "<p style='text-align:center'><img src='" + src + "' alt='Graph loading...' /></p>";

    $('#history-graph > article').html(contentGraph);


    /* Update the time range radios with the current feed and datastream */
    $("#24h").val(feed_id + "," + datastream_id);
    $("#3days").val(feed_id + "," + datastream_id);
    $("#14days").val(feed_id + "," + datastream_id);


    $.mobile.changePage("#history-graph", {transition: "none", reverse: false, changeHash: false});
    window.location.href = "#history-graph?id=" + feed_id;
    return true;
}

/* Click handler for the time range radios. Loads the xively png graph
 * according to the selected date range
 * 
 * @param {type} feed_id
 * @param {type} datastream_id
 * @param {type} timerange
 * @returns {undefined}
 */
function historyGraphDateClick(feed_id, datastream_id, timerange) {

    $("#graph").show();
    var startTimestamp = "";
    var now = new Date();
    var endTimestamp = dateFormat(now, "yyyy-mm-dd'T'HH:MM:ss'Z'");

    if (timerange == '24h')
    {
        startTimestamp = now.setDate(now.getDate() - 1);
    }
    else if (timerange == '3days')
    {
        startTimestamp = now.setDate(now.getDate() - 3);
    }
    else // 14 days, the max history xively offers
    {
        startTimestamp = now.setDate(now.getDate() - 14);
    }
    startTimestamp = dateFormat(startTimestamp, "yyyy-mm-dd'T'HH:MM:ss'Z'");

    var src = "https://api.xively.com/v2/feeds/" + feed_id + "/datastreams/" +
            datastream_id + ".png?w=360&h=240&b=true&t=" + cachedfeedsArray[feed_id].tags[0] +
            "&start=" + startTimestamp + "&end=" + endTimestamp;

    var contentGraph = "<img src='" + src + "' alt='Graph loading...' />";

    $('div > article p').html(contentGraph);

}
/*Button enhancement*/
$(document).on('pagebeforeshow', '#page3', function() {
    $('[data-role="button"]').button();
});


/* Refreshes the map when the mobile device
 *  orientation changes
 */
$(window).resize(function() {
    hideAddressBar();
    setTimeout(function() {
        fixMapHeight();
        refreshMap();
    }, 500);
});

/* Refreshes the global map onject */
function refreshMap() {
    if (map) {
        google.maps.event.trigger(map, 'resize');
    }
}

/* Returns an array of tags as a string */
function showAlltags(tags) {

    var result = "";
    $.each(tags, function(i, tag) {
        result += "<div class='tag'>" + tag + "</div>";
    });
    return result;
}


/* Fetches the defined xively feeds */
function getLiveFeeds() {

    $.each(feeds, function(i, feedID) {
        feedID = feeds[i];

        $.ajax({
            url: 'http://api.xively.com/v2/feeds/' + feedID + '.json',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $("#myLog").append("Data<br/>" + data);
                cachedfeedsArray[data.id] = data;
                //remove the marker from the map before plotting it again
                if (markersArray[data.id] != null)
                    markersArray[data.id].setMap(null);
                addMarker(data);
                loadListPageData();
                refreshListPageView();
            },
            error: function(jqXHR, exception) {
                $("#myLog").append(JSON.stringify(jqXHR) + "  " + JSON.stringify(exception));
            },
            beforeSend: setHeader
        });
    });
}

function setHeader(xhr) {
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('X-ApiKey', 'PFolLMUgMnYAzcNajbmA_X8dO7iSAKwvTlAxcytmUUd1ND0g');
}

/****************** Event Handlers*************************/

$(document).ready(function() {

    /* Click handler for the 'near me' button */
    $('.feeds-nearme').click(function() {
        lastLoaded = 'nearme';
        $.mobile.changePage("#page1", {transition: "none"});
        $('.navbar > ul > li > a').removeClass('ui-btn-active');
        $('.feeds-nearme').addClass('ui-btn-active');

        /* Check if we can get geolocation from the browser */
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                //define the map options
                var mapOptions = {
                    center: myLatlng,
                    zoom: mapZoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map.setOptions(mapOptions);

                if (!isNearMeMarkerLoaded) {
                    /* Load near me marker only once */
                    isNearMeMarkerLoaded = true;
                    var currentmarkerpos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    var currentmarker = new google.maps.Marker({
                        position: currentmarkerpos,
                        map: map
                    });
                }
            });
        } else {
            initializeMap(mapLat, mapLon);
            google.maps.event.trigger(map, 'resize');
        }

        /* Event Tracking in Analytics */
//        trackEvent('nearme');
    });

    /* Click handler for the 'show all' button */
    $('.feeds-showall').click(function() {
        if (lastLoaded != 'showall') {
            lastLoaded = 'showall';
            var myLatlng = new google.maps.LatLng(mapLat, mapLon);
            //define the map options
            var mapOptions = {
                center: myLatlng,
                zoom: mapZoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map.setOptions(mapOptions);
        }

        $.mobile.changePage("#page1", {transition: "none"});
        $('.navbar > ul > li > a').removeClass('ui-btn-active');
        $('.feeds-showall').addClass('ui-btn-active');

        /* Event Tracking in Analytics */
//        trackEvent('showall');
    });

    /* Click handler for the 'list' button */
    $('.feeds-list').click(function() {
        $.mobile.changePage("#page2", {transition: "none"});

        /* Event Tracking in Analytics */
//        trackEvent('showlist');
    });


    /* Checks for the active page and performs the 
     * relevant actions
     */
    $('.page').bind("pageshow", function(event, data) {
        if ($(this).attr('id') == 'page1') {
            refreshMap();
            pageId = 0;
        }
        if ($(this).attr('id') == 'page2') {
            $('.navbar > ul > li > a').removeClass('ui-btn-active');

            $('.feeds-list').addClass('ui-btn-active');
            refreshListPageView();
            pageId = 0;
        }
        if ($(this).attr('id') == 'page3') {
            $('.navbar > ul > li > a').removeClass('ui-btn-active');
        }
    });

    /* Check if the datastream tags should be dispalyed
     * or not in the details page 
     */
    $("#isOff").click(function() {
        $(".showDetails").hide();
    });

    $("#isOn").click(function() {
        $(".showDetails").each(function() {
            if ($(this).html() != "")
            {
                $(this).show();
            }
        })
    });

    /* Check if the datastream tags should be displayed
     * or not in the details page 
     */
    $("input[name='radio-action']").click(function() {
        var ids = $(this).val().split(",");
        historyGraphDateClick(ids[0], ids[1], $(this).attr('id'));
    });

    getLiveFeeds();

}); //end of document ready


/* Refreshes the map when the mobile device
 *  orientation changes
 */
$(window).resize(function() {
    hideAddressBar();
    setTimeout(function() {
        fixMapHeight();
        refreshMap();
    }, 500);
});


/* Used to fix map height depending on device screen size */
function fixMapHeight() {
    var sh = window.innerHeight ? window.innerHeight : $(window).height();
    var bh = $('.page > header:first').height();
    var diff = sh - bh;

    $('#map-container').height(diff);
    $('#page1').height(sh);
}

/* Used to hide the nav bar */
function hideAddressBar() {
    //Fake mobile by increasing page height, so address bar can hide.
    var sh = window.innerHeight ? window.innerHeight : $(window).height();
    $('#page1').height(sh * 2);
    $('#map-container').height(sh * 2);

    var doc = $(document);
    var win = this;

    // If there's a hash, or addEventListener is undefined, stop here
    if (!location.hash && win.addEventListener) {
        window.scrollTo(0, 1);
    }
}

/* Older versions of android do not allow scroll for divs. 
 * Use the functions bellow to fix this bug. 
 */
function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
function touchScroll(id) {
    var versionRX = new RegExp(/Android [0-9]/);
    var versionS = new String(versionRX.exec(navigator.userAgent));
    var version = parseInt(versionS.replace("Android ", ""));

    if (isTouchDevice() && version < 4) { //if touch events exist and older than android 4
        var el = document.getElementById(id);
        var scrollStartPos = 0;

        document.getElementById(id).addEventListener("touchstart", function(event) {
            scrollStartPos = this.scrollTop + event.touches[0].pageY;
            event.preventDefault();
        }, false);

        document.getElementById(id).addEventListener("touchmove", function(event) {
            this.scrollTop = scrollStartPos - event.touches[0].pageY;
            event.preventDefault();
        }, false);
    }
}

/*
 * Event Tracking in Google Analytics 
 *  Category is the same for all events 
 *  City-Name is the same for all the events
 */

/*
 function trackEvent(action) {
 _gaq.push(['_trackEvent', 'Events', action, 'City-Name']);
 }*/
    