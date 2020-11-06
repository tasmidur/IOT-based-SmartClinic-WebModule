const firebaseConfig = {
    apiKey: "AIzaSyDnZ9tqxqw6ZobreFCOVg6ZysqcB_fg1MU",
    authDomain: "hum-and-temp-test.firebaseapp.com",
    databaseURL: "https://hum-and-temp-test.firebaseio.com",
    projectId: "hum-and-temp-test",
    storageBucket: "hum-and-temp-test.appspot.com",
    messagingSenderId: "911595237525",
    appId: "1:911595237525:web:413e363ebc4d9802016b9c",
    measurementId: "G-B32MX4FWDP"
  };
firebase.initializeApp(firebaseConfig);

let database = firebase.database(); 


//page config
if(!localStorage.hasOwnProperty("islogin")){
    console.log(localStorage.hasOwnProperty("islogin"));
    window.location.href = "login.html";
}

//end of page config



// ================================================================

//login controller

$(document).ready(function(){
    $("#loginbtn").click(function(){

        var email=$("#email").val();
    
        var password=$("#pass").val();
        let is_check=false;

      
    
        database.ref('/userProfile').orderByChild("email").equalTo(email).limitToLast(1).on("value", function(snapshot) {
        
            snapshot.forEach(element => {
               

                if(element.val().email===email&&element.val().password===password){
                    console.log(element.val().email,element.val().password);
                    localStorage.setItem("islogin",element.val().email)
                    is_check=true;
                    console.log('set',localStorage.getItem("islogin"));
                }

            });

            if(is_check && localStorage.getItem("islogin")!=null){
                console.log(localStorage.getItem("islogin"));
                $("#msg").show();
                $("#msg").text("You Have Successfully Loged In");
                   setTimeout(function(){
                    $("#msg").hide();
                    $("#msg").text("");
                    window.location.href="index.html";
                   },5000);

            }else{
                $("#msg").show();
                    $("#msg").text("Invalid User");
                       setTimeout(function(){
                        $("#msg").hide();
                        $("#msg").text("");
                        //window.location.href="create.html";
                       },5000);
            }
            
        });
       
    })
    
    
    
    $("#singup").click(()=>{
    
        localStorage.setItem("islogin",null);
    
        var email=$("#email").val();
    
        var password=$("#pass").val();
    
       
    
        database.ref('/userProfile').orderByChild("email").equalTo(email).limitToLast(1).on("value",function(snapshot) {
          
           let emailexist=snapshot.val();

            console.log(emailexist);

            if(!snapshot.val()){
                database.ref('/userProfile').push({
                    email:email,
                    password:password 
                });
                database.ref('/userProfile').orderByChild("email").equalTo(email).on("child_added",function(snapshot) {
                   console.log(snapshot.key);
        
                   if(snapshot.key){
                    $("#msg").show();
                    $("#msg").text("You Have Successfully Created Your Account");
                    localStorage.setItem("islogin",snapshot.val().email)
                    console.log("res", localStorage.getItem("islogin"))
                       setTimeout(function(){
                        $("#msg").hide();
                        $("#msg").text("");
                        window.location.href="index.html";
                       },5000);
                      
                   }else{
                  
                    $("#msg").text("You are not Successfully Created Your Account");
                    $("#msg").show();
                    setTimeout(function(){
                        $("#msg").hide();
                        $("#msg").text("");
                       },5000);
                   }
                });
        
            }else{
                $("#msg").show();
                $("#msg").text("You have already an account");
                setTimeout(function(){
                    $("#msg").hide();
                    $("#msg").text("");
                   },5000);
            }
            
        });
    
       
    })
      
 
    $("#singout").click(function(){
            console.log('singout', 'click');
            localStorage.removeItem("islogin");
            console.log(localStorage.hasOwnProperty("islogin"));
            window.location.href="login.html";
        
    });
    
});

//end of auth controller


//====================================================================================




//data show in this section


// temperature
database.ref('temp').on('child_added',(snap)=>{
    console.log(snap.val());
    $("#temperature").text(snap.val()+" C")
  });


  // humidity
database.ref('hum').on('child_added',(snap)=>{
    console.log(snap.val());
    $("#humidity").text(snap.val()+" %")
  });

   