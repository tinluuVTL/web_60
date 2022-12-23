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
    $.get("https://6141d8f84d16670017ba29f3.mockapi.io/muavu/tb", function (data, status) {
        console.log(data);
        $("#sv-tbl tbody").empty();
        //Duyet danh sach 
        for (var i = 0; i < data.length; i++) {
            var tr = '<tr>' +
                '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].tentb + '</td>' +
                '<td>' + data[i].ngaymua + '</td>' +
                '<td>' + data[i].gia + '</td>' +
                '<td>' + data[i].trangthai + '</td>' +
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
    $.get("https://6141d8f84d16670017ba29f3.mockapi.io/muavu/tb/" + id, function (data, status) {

        $("#tentb").val(data.tentb);
        $("#ngaymua").val(data.ngaymua);
        $("#gia").val(data.gia);
        $("#trangthai").val(data.trangthai);

        //Hien thi modal
        showModal();
        function showModal() {
            $("#addModal").css("display", "block");
            $(".d-flex").css("opacity", ".2");
        }

        $("#btnCloseModal").click(function () {
            $("#addModal").css("display", "none");
            $(".d-flex").css("opacity", "1");
            window.location.reload();
        });
    })


    $("#submit").click(function () {
        isAdd = false;
        $.ajax(
            {
                url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/tb/" + id,
                method: "PUT",
                data: {
                    "tentb": $("#tentb").val(),
                    "ngaymua": $("#ngaymua").val(),
                    "gia": $("#gia").val(),
                    "trangthai": $("#trangthai").val(),

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
        "tentb": $("#tentb").val(),
        "ngaymua": $("#ngaymua").val(),
        "gia": $("#gia").val(),
        "trangthai": $("#trangthai").val(),

    };
    if (isAdd) {
        var tentb = $("#tentb").val();
        var ngaymua = $("#ngaymua").val();
        var gia = $("#gia").val();
        var trangthai = $("#trangthai").val();


        if (tentb === "" || ngaymua === "" || gia === "" || trangthai === "") {
            $("#error").css("display", "block");
            if (tentb === "") {
                $("#tentb").css("border", "1px red solid");
            } else {
                $("#tentb").css("border", "none");
            }
            if (ngaymua === "") {
                $("#ngaymua").css("border", "1px red solid");
            } else {
                $("#ngaymua").css("border", "none");
            }
            if (gia === "") {
                $("#gia").css("border", "1px red solid");
            } else {
                $("#gia").css("border", "none");
            }
            if (trangthai === "") {
                $("#trangthai").css("border", "1px red solid");
            } else {
                $("#trangthai").css("border", "none");
            }


        }
        else {
            $("#addsvtab").css("display", "none");
            $(".d-flex").css("opacity", "1");


            $.ajax(
                { url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/tb/", method: "POST", data: ng_dung }
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
    $("#tentb").val("");
    $("#gia").val("");
    $("#ngaymua").val("");
    $("#trangthai").val("");

}

function deleteUser(id) {
    $.ajax({
        url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/tb/" + id,
        method: "DELETE"
    }).done(function () {
        loadData();
    })
}