var isAdd;
$(document).ready(function () {
    $("#addsv").click(function () {
        $("#addModal").css("display", "block");
        $(".d-flex").css("opacity", ".2");
        isAdd = true;
    });
    loadData();
});

loadData();
function loadData() {
    //lay du lieu
    $.get("https://6141d8f84d16670017ba29f3.mockapi.io/muavu/user", function (data, status) {
        console.log(data);
        $("#sv-tbl tbody").empty();
        //Duyet danh sach 
        for (var i = 0; i < data.length; i++) {
            var tr = '<tr>' +
                '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].fullname + '</td>' +
                '<td>' + data[i].gender + '</td>' +
                '<td>' + data[i].permission + '</td>' +
                '<td>' + data[i].phoneNumber + '</td>' +
                '<td>' + "<a onclick='edit(" + data[i].id + ")' class='btnEdit'> <i data='" + data[i].id + "' class='far fa-edit'></i></a>" + " <a onclick='deleteUser(" + data[i].id + ")'> <i  class='far fa-trash-alt'></i></a>" + '<td>'
            '</tr>';
            $("#sv-tbl tbody").append(tr);


        }
        // Hien thi du lieu        
    })
    //Hien thi len giao dien
}

function edit(id) {

    //Lay du lieu tu server
    $.get("https://6141d8f84d16670017ba29f3.mockapi.io/muavu/user/" + id, function (data, status) {
      
        $("#username").val(data.username);
        $("#fullname").val(data.fullname);
        $("#password").val(data.password);
        $("#gender").val(data.gender);
        $("#permission").val(data.permission);
        $("#phoneNumber").val(data.phoneNumber);
        //Hien thi modal
        showModal();

    })
        function showModal() {
        $("#addModal").css("display", "block");
        $(".d-flex").css("opacity", ".2");
    }

    $("#btnCloseModal").click(function () {
        $("#addModal").css("display", "none");
        $(".d-flex").css("opacity", "1");
        window.location.reload();
    });
    $("#submit").click(function () {
        isAdd = false;
        $.ajax(
            {
                url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/user/" + id,
                method: "PUT",
                data: {
                    "username": $("#username").val(),
                    "password": $("#password").val(),
                    "fullname": $("#fullname").val(),
                    "gender": $("#gender").val(),
                    "phoneNumber": $("#phoneNumber").val(),
                    "permission": $("#permission").val(),
                }
            }
        ).done(function (msg) {
            console.log(msg);
            closeModal();
            loadData();
            window.location.reload();
        });
    })
}


$("#submit").click(function () {
    var ng_dung = {
        "username": $("#username").val(),
        "password": $("#password").val(),
        "fullname": $("#fullname").val(),
        "gender": $("#gender").val(),
        "phoneNumber": $("#phoneNumber").val(),
        "permission": $("#permission").val(),
    };
    if (isAdd) {
        var password = $("#password").val();
        var username = $("#username").val();
        var fullname = $("#fullname").val();
        var gender = $("#gender").val();
        var phoneNumber = $("#phoneNumber").val();
        var permission = $("#permission").val();

        if (password === "" || username === "" || fullname === "" || gender === "" || phoneNumber === "" || permission === "") {
            $("#error").css("display", "block");
            if (password === "") {
                $("#password").css("border", "1px red solid");
            } else {
                $("#password").css("border", "none");
            }
            if (username === "") {
                $("#username").css("border", "1px red solid");
            } else {
                $("#username").css("border", "none");
            }
            if (fullname === "") {
                $("#fullname").css("border", "1px red solid");
            } else {
                $("#fullname").css("border", "none");
            }
            if (gender === "") {
                $("#gender").css("border", "1px red solid");
            } else {
                $("#gender").css("border", "none");
            }
            if (phoneNumber === "") {
                $("#phoneNumber").css("border", "1px red solid");
            } else {
                $("#phoneNumber").css("border", "none");
            }

        }
        else {
            $("#addsvtab").css("display", "none");
            $(".d-flex").css("opacity", "1");


            $.ajax(
                { url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/user/", method: "POST", data: ng_dung }
            ).done(function () {
                closeModal();

                loadData();
                window.location.reload();
            })

        }
    }

});



function closeModal() {
    $(".d-flex").css("opacity", "1");
    $("#btnCloseModal").css("display", "none");
    window.location.reload();
    $("#username").val("");
    $("#fullname").val("");
    $("#password").val("");
    $("#gender").val("");
    $("#phoneNumber").val("");
}

function deleteUser(id) {
    $.ajax({
        url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/user/" + id,
        method: "DELETE"
    }).done(function () {
        loadData();
    })
    
}