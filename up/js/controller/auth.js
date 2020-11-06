
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
      
 
   
    
});

//end of auth controller


//====================================================================================