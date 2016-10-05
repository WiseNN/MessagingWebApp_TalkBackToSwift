/*jslint browser: true*/
/*jslint white: true */
/*global $, jQuery, alert*/
///*global Firebase*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ 
///*global define */
/*global fireRef */





//variables
var ref = fireRef.database().ref();
var msgAry = [];

//DEBUGGING OUTPUT
console.log("ref2: "+ref);





$ (document).ready(function main(msg){
    "use strict";
    console.log("ready!");
    debugger;
    
//    firebase.on("child_added", function(snapshot, prevChildKey) {
//     
//  var newPost = snapshot.val();
//  console.log(newPost);
////  console.log("Title: " + newPost.title);
////  console.log("Previous Post ID: " + prevChildKey);
//}); 
    
    
    function scrollDown()
    {
        $("#msgScreen").animate({ scrollTop: $("#msgScreen")[0].scrollHeight}, 0);
    }
    
    function test()
    {
        var leftMsg = document.getElementsByClassName("leftMsg")[0];
        leftMsg.value = "changeMe";
        $(".leftMsg").text("MY LEFT MESSAGE!");
    }
    
     function appendLeftMsg(msg)
    {
        var leftMessage = msg;
        $(".allMessages").append("<dt class=\"leftUserContainer\"><div class=\"circleFacePlate leftPlate\">NW</div><p class=\"leftMsg\">"+leftMessage+"</p></dt><br>");
        scrollDown();
    }
    function appendRightMsg(msg) 
    {
        
        var rightMessage = msg;
        $(".allMessages").append("<br><dt class=\"rightUserContainer\"><div class=\"circleFacePlate rightPlate\">SRL</div><p class=\"rightMsg\">"+rightMessage+"</p></dt><br>");
        scrollDown();
    }
    
    function loadDatabase()
    {
        // iterate through children of firebase db @ 'messages' level
        var dbConvoRef = ref.child('privateChat/WiseNN/tellMeWhen2Go/messages');
        dbConvoRef.on('child_added', function(dataSnapshot) {

    
        //String version of db for console viewing    
        var msgDbObj = dataSnapshot.val();
            var msgDbObjStr = JSON.stringify(msgDbObj,null, 3);

            
            //DEBUGGING OUTPUT
            console.log("stringify: "+msgDbObjStr);
            console.log(" ");
            console.log(" ");
            console.log("object: "+msgDbObj.message);
                        
            msgAry.push(msgDbObj.message);
            console.log("msgAry: "+msgAry);

            var sender = msgDbObj.sender;
            console.log("sender: "+sender);
            if (sender === "tellMeWhen2Go")
            {
                appendRightMsg(msgDbObj.message);
            }
            else if (sender === "WiseNN")
            {
                appendLeftMsg(msgDbObj.message);
            }
                
                        
          });
        
    }
    
    function postMessage(message)
    {
        
//        debugger;
        var dbConvoRef = ref.child('privateChat/WiseNN/tellMeWhen2Go/messages/');
        var dbConvoRefKey =  ref.child('privateChat/WiseNN/tellMeWhen2Go/messages/').push().key;
        var recipeintDBConvoRef = ref.child("privateChat/tellMeWhen2Go/WiseNN/messages/");
        var recipeintDBConvoRefKey = ref.child("privateChat/tellMeWhen2Go/WiseNN/messages/").push().key;
       var date = "2016-07-19";
        var usrPostsDBRef = ref.child("user-posts/tellMeWhen2Go/"+date+"/");
        var usrPostsDBRefKey = ref.child("user-posts/tellMeWhen2Go/"+date+"/").push().key;

        
//        guard ((MyFireAuth.sharedInstance?.currentUser) != nil) || MyFireAuth.sharedInstance?.currentUser != MyFireAuth.user
//            else{
//                sessionTimedOut()
//                return
//        }
//        guard let message = postMesgTxtField.text where postMesgTxtField.text! != "" else{
//            print("no message in text field")
//            return
//        }
        
        
//        let index1 = NSDate().description.startIndex.advancedBy(10)
//        let date = NSDate().description.substringToIndex(index1)
//        let rangeBegin = NSDate().description.startIndex.advancedBy(11)
//        let rangeEnd = NSDate().description.startIndex.advancedBy(18)
//        let range = (rangeBegin...rangeEnd)
//        let time = NSDate().description.substringWithRange(range)
        
        console.log("post Message Before Posting: "+message);
        
        var time = "24:00";
        console.log("the date: "+date);
        //privateChat post
        var post = {};
        post["sender"] = "tellMeWhen2Go";
        post["message"] = message;
        post["date"] = date;
        post["time"] = time;
        
        //child updates for the privateChat/messages child
        var userMsgPost = {};
        userMsgPost["message"] = message;
        userMsgPost["time"] = time;
        
        //Child update for the direct-child user-posts
        var childUpdatesForUserPosts = {};
            childUpdatesForUserPosts[usrPostsDBRefKey] = userMsgPost;
        
        //database updates for PRIMARY user's privateChat line
        var childUpdatesForPrivateChat = {};
        childUpdatesForPrivateChat[dbConvoRefKey] = post;
        
        console.log("-----------------------------");
        console.log("CHILD UPDATE: "+childUpdatesForUserPosts);
        console.log("-----------------------------");
        usrPostsDBRef.update(childUpdatesForUserPosts);
        dbConvoRef.update(childUpdatesForPrivateChat);
        recipeintDBConvoRef.update(childUpdatesForPrivateChat);
        
    }

    
    
    
document.getElementById("textAreaId").addEventListener("keypress", function(e){
    
    
    var key = e.keyCode || e.which;
    if ( key === 13)
        {
           
            var message = document.getElementById("textAreaId").value;
            postMessage(message);
            document.getElementById("textAreaId").value = "";   
        }
    
    });    
    
    document.getElementById("sendButton").addEventListener("click", function(){
        
        
        
        var message = document.getElementById("textAreaId").value;
        postMessage(message);
        document.getElementById("textAreaId").value = "";
    });
    
    
    loadDatabase();
    
});




