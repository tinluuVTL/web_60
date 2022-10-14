var emailArray = [];
var passwordArray = [];

var loginBox = $("#login");
var regBox = $("#register");
var forgetBox = $("#forgot");

var loginTab = $("#lt");
var regTab = $("#rt");

function regTabFun() {
    event.preventDefault();

    console.log("regTab");
    loginBox.css("visibility", "hidden");
    regBox.css("visibility", "visible");
    forgetBox.css("visibility" , "visible");

    regTab.css("backgound-color","rgb(255, 8, 125)");
    regTab.css("border-radius", "10px");
    loginTab.css("backgound-color","rgb(247, 77, 145)");
    loginTab.css("border-radius", "10px");
}
function loginTabFun() {
    event.preventDefault();

    regBox.css("visibility", "hidden");
    loginBox.css("visibility", "visible");
    forgetBox.css("visibility", "visible");

    loginTab.css("backgound-color", "rgb(255, 8, 125)");
    loginTab.css("border-radius", "10px");
    regTab.css("backgound-color", "rgb(247, 77, 145)");
    regTab.css("border-radius", "10px");
}

function forTabFun() {
    event.preventDefault();

    regBox.css("visibility", "hidden");
    loginBox.css("visibility", "hidden");
    forgetBox.css("visibility", "visible");

    regTab.css("backgound-color", "rgb(255, 8, 125)");
    regTab.css("border-radius", "10px")
    loginTab.css("backgound-color", "rgb(247, 77, 145)");
    loginTab.css("border-radius", "10px");

}
$(document).ready(function () {

    $("#submitBtn").click(function(){
        register();
    })

    function register() {
        event.preventDefault();

        var email = $("#re").val();
        var password = $("#rp").val();
        var passwordRetype = $("#rrp").val();
        if (email == "") {
            $("#re").css("border", "5px solid red");
            alert("nhập email.");
            return;
        }
        else if (password == "") {
            $("#rp").css("border", "5px solid red");
            alert(" yêu cầu nhập mật khẩu.");
            return;
        }
        else if (passwordRetype == "") {
            $("#rrp").css("border", "5px solid red");
            alert(" yêu cầu nhập mật khẩu.");
            return;
        }
        else if (password != passwordRetype) {
            $("#rp").css("border", "5px solid red");
            $("#rrp").css("border", "5px solid red");
            alert("Mật khẩu không khớp, hãy nhập lại Mật khẩu của bạn.");
            return;
        }
        else if (emailArray.indexOf(email) == -1) {
            emailArray.push(email);
            passwordArray.push(password);
        
            alert(email + " Cảm ơn đã đăng ký.\n Hãy thử đăng nhập ngay bây giờ");

            $("#re").val(""); 
            $("#rp").val("");
            $("#rrp").val("");
        }
        else {
            alert(email + " đã đăng ký.");
            return;
        }
    }

    $("#log-submitBtn").click(function(){
        login();
    })
    function login() {
        event.preventDefault();
       

        var email = $("#se").val();
        var password = $("#sp").val();

        var i = emailArray.indexOf(email);

        if (emailArray.indexOf(email) == -1) {
            if (email == "") {
                $("#se").css("border", "5px solid red");
                alert("vui lòng nhập email.");
                return;
            }
            $("#se").css("border", "5px solid red");
            alert("Email chưa được đăng ký.");
            return;
        }
        else if (passwordArray[i] != password) {
            if (password == "") {
                $("#sp").css("border", "5px solid red");
                alert(" yêu cầu nhập mật khẩu.");
                return;
            }
            $("#sp").css("border", "5px solid red");
            alert("Mật khẩu không hợp lệ.");
            return;
        }
        else {
            location.href = "home.html"
            alert(email + "  chào mừng bạn đến với trang web của chúng tôi.");

            $("#se").val("");
            $("#sp").val("");
            return;
        }

    }

});
