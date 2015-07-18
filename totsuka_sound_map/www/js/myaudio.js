//
// Simple Audio player
//

	
var myAudio = (function() {
 
 var my_media = null;
 
 // Core functions
 function do_play(path,status_callback){
     my_media = new Media(getMediaURL(path),null,null,status_callback);
     my_media.play();
 }

 function do_stop(){
    my_media.stop();
    my_media.release();
    my_media = null;
 }

 // Utils
 function getMediaURL(s) {
               if (device.platform.toLowerCase() === "android"){
               var android_path = "/android_asset/www/" + s;
               return android_path;
               }
               return s;
  }
 
 // Callbacks
 var done_callback = function(){ /* do nothing */}
               
 var status_callback = function(status){
     // Done.
   if ( 4 == status ){
     // do anything such as changing the label of your button
     do_stop();
     done_callback();
     
    }
 }
               

 // API
  return {
    play: function(path,play_finished_callback){
               if ( play_finished_callback ){
                done_callback = play_finished_callback;
               }
               if(!my_media){
               do_play(path,status_callback);
                }else{
               do_stop();
               do_play(path);
               }
            },
    stop: function(){
               if ( my_media ){
               do_stop();
               }
            }
    };
               
}()); //MyAudio
