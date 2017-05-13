var request = new XMLHttpRequest();
var geocoder;
  var map,latlng;
  var marker,value,postalcode;
  var markersArray = [];
  var bounds;

function initialize () {
  var index = {lat: 32.75, lng: -97.13};
    geocoder = new google.maps.Geocoder();
         map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: index
        });

         marker = new google.maps.Marker({
          map: map
        });
          google.maps.event.addListener(map, 'bounds_changed', function() {
             bounds = map.getBounds();
      });
       
         mark(marker);
}


function codeAddress(lat,lng) {
  console.log(lat+" "+lng);

     geocoder = new google.maps.Geocoder();
        var myLatlng = new google.maps.LatLng(lat, lng);
        console.log(myLatlng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
        markersArray.push(marker);
        mark(marker);
  }

  function mark(marker){
     var contentString = "<br /><br /><hr />Coordinate: "+value+" "+postalcode; 
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    }); 
      marker.addListener('click', function() { 
      infowindow.open(map,marker);
  }); 
  }



function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

function displayResult(data){

 var myNode = document.getElementById("placeList");

          if(myNode!=null)
          while (myNode.firstChild) {
              myNode.removeChild(myNode.firstChild);
          }
  for(var i=0; i<data.businesses.length; i++ ){
     var image = document.createElement("img");
     image.setAttribute("src", data.businesses[i].image_url);
     var div = document.createElement("div");
   //  console.log(json.results[i].title.length<0);
     div.innerHTML = "</br><a href="+data.businesses[i].url+">Place Name: " + ((data.businesses[i].name.length==0)?'No data provided':data.businesses[i].name) + "</a>";
     document.getElementById("placeList").appendChild(div);
     document.getElementById("placeList").appendChild(image);
     document.getElementById("placeList").appendChild(document.createElement("br"));
     var ratingUrl = document.createElement("img");
     ratingUrl.setAttribute("src",data.businesses[i].rating_img_url);
    // var node = document.createTextNode("Image Rating: "+((data.businesses[i].rating_img_url==null ||data.businesses[i].rating_img_url=="")?"No data provided":data.businesses[i].rating_img_url));
   //  ratingUrl.appendChild(node);
     document.getElementById("placeList").appendChild(ratingUrl);
     var snippetUrl = document.createElement("p");
     var node = document.createTextNode("Snippet_Url data: "+((data.businesses[i].snippet_text==null ||data.businesses[i].snippet_text=="")?"No data provided":data.businesses[i].snippet_text));
     snippetUrl.appendChild(node);
     document.getElementById("placeList").appendChild(snippetUrl);
     


  
  }
}

function sendRequest () {
   clearOverlays();
   var xhr = new XMLHttpRequest();
   console.log(document.getElementById("search").value);
   xhr.open("GET", "proxy.php?term="+document.getElementById("search").value+"&bounds="+bounds.getSouthWest().lat()+","+bounds.getSouthWest().lng()+"|"+bounds.getNorthEast().lat()+","+bounds.getNorthEast().lng()+"&limit=10");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          for(var i=0;i<json.businesses.length;i++){
             codeAddress(json.businesses[i].location.coordinate.latitude,json.businesses[i].location.coordinate.longitude);
          }
          displayResult(json);
         // document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
       }
   };
   xhr.send(null);
}
