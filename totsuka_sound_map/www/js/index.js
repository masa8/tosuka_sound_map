/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        app.audioButton();
        
        var sw = L.latLng(35.392409,139.524994),
         ne = L.latLng(35.404722,139.538726),
        bounds = L.latLngBounds(sw,ne);
        var map = L.map('map', {center: [35.39525, 139.52975], zoom: 17, touchZoom: false, maxBounds: bounds});
        
        L.tileLayer('./img/map/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 18,
                    minZoom: 14
                    }).addTo(map);
        
        
        
        //
        var data  = [{
                     "type": "Feature",
                     "properties":{
                        "title":"八坂神社",
                        "desc":"７月１４日は八坂神社のお札まき！",
                        "image":"img/ofudamaki.jpg",
                        "audio":"audio/ofudamaki.MP3"},
                     "geometry": {
                        "type": "Point",
                        "coordinates":[139.52975,35.39525]
                        }
                     }
                     
                     ];
        
        L.Icon.Default.imagePath = 'css/images';
        var geo_layer = L.geoJson(data,{ onEachFeature:function(f,l){
                                l.bindPopup(
                                           f.properties.title);
                                l.on("click",function(){
                                               document.getElementById("title").innerText = f.properties.title;
                                               document.getElementById("description").innerText = f.properties.desc;
                                               document.getElementById("image").setAttribute("src",f.properties.image);
                                               document.getElementById("audio").setAttribute("src",f.properties.audio);
                                     
                                     
                                     });
                  
                  $("#midokoro").append('<li lng="'+ f.geometry.coordinates[0] + '" lat="' + f.geometry.coordinates[1] + '" ><a href="#"  >' + f.properties.title + '</a></li>').listview().listview('refresh');

                                    
                                  }});
        geo_layer.addTo(map);
        
        
        // Click on the List in Side panel
        $(document).on("click", '#midokoro  li', function(event) {
                       $("#midokoro_panel").panel("close");
                       var selected = L.latLng($(this).attr("lat"),$(this).attr("lng"));
                       map.panTo(selected);
                       geo_layer.eachLayer(function(marker){
                       if ( marker.getLatLng().equals( selected )){
                                           marker.fire('click');
                        }
                                           
                                           });
         }
        );
        
 
    
    },

    audioButton:function(){
        function done(){
            $("#audio").text("聞く");
            $("#audio").toggleClass('play');

        }
        
        $("#audio").click( function(){
            var newvalue = ""
            if ( $("#audio").text() == "聞く" ){
                myAudio.play($("#audio").attr("src"), done);
                newvalue = "停止";
                $(this).toggleClass('play');
                $(this).text(newvalue).button('refresh');
            }else{
                myAudio.stop();
                newvalue = "聞く";
                $("#audio").text(newvalue);
                $(this).toggleClass('play');
            }
                          });
        
    }


};

app.initialize();