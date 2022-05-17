var user = $("username").val();
var pwd = $("password").val();
if(user=="")
{
    alert("Username can't be empty! ");
}
else if(pwd=="")
{
    alert("Password can't be empty! ");
}
else if (pwd!="" && user!= ""){
    // 这里加你后端的账号和密码
    if (user=="" && pwd==""){
        alert("Log in successfully! ");
    }
    else{
        alert("Incorrect username or password!");
    }
}