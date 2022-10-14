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
    $.get("https://6141d8f84d16670017ba29f3.mockapi.io/muavu/mv", function (data, status) {
        console.log(data);
        $("#sv-tbl tbody").empty();
        //Duyet danh sach 
        for (var i = 0; i < data.length; i++) {
            var tr = '<tr>' +
                '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].tenmv+ '</td>' +
                '<td>' + data[i].sanluong + '</td>' +
                '<td>' + data[i].donvi + '</td>' +
                '<td>' + data[i].ngaybd+ '</td>' +
                '<td>' + data[i].ngayth+ '</td>' +
                '<td>' + data[i].trangthai + '</td>' +
                '<td>' + "<a onclick='edit(" + data[i].id + ")' class='btnEdit'> <i data='" + data[i].id + "' class='far fa-edit'></i></a>" + " <a onclick='deleteUser(" + data[i].id + ")'> <i  class='far fa-trash-alt'></i></a>" + '<td>'
            '</tr>';
            $("#sv-tbl tbody").append(tr);
        }
    })
}

function edit(id) {

    //Lay du lieu tu server
    $.get("https://6141d8f84d16670017ba29f3.mockapi.io/muavu/mv/" + id, function (data, status) {
      
        $("#tenmv").val(data.tenmv);
        $("#ngaybd").val(data.ngaybd);
        $("#donvi").val(data.donvi);
        $("#ngayth").val(data.ngayth);
        $("#sanluong").val(data.sanluong);
        $("#trangthai").val(data.trangthai);
       
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
                url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/mv/" + id,
                method: "PUT",
                data: {
                    "tenmv": $("#tenmv").val(),
                    "ngaybd": $("#ngaybd").val(),
                    "donvi": $("#donvi").val(),
                    "ngayth": $("#ngayth").val(),
                    "sangluong": $("#sanluong").val(),
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

//thêm dữ liệu//
$("#submit").click(function () {
    var ng_dung = {
        "tenmv": $("#tenmv").val(),
        "ngaybd": $("#ngaybd").val(),
        "donvi": $("#donvi").val(),
        "ngayth": $("#ngayth").val(),
        "sanluong": $("#sanluong").val(),
        "trangthai": $("#trangthai").val(),
       
    };
    if (isAdd) {
        var tenmv = $("#tenmv").val();
        var ngaybd= $("#ngaybd").val();
        var donvi= $("#donvi").val();
        var ngayth= $("#ngayth").val();
        var sanluong= $("#sanluong").val();
        var trangthai= $("#trangthai").val();
       

        if (tenmv === "" || ngaybd === "" || donvi === "" || sanluong === ""|| ngayth === "" || trangthai === "") {
            $("#error").css("display", "block");
            if (tentb === "") {
                $("#tenmv").css("border", "1px red solid");
            } else {
                $("#tenmv").css("border", "none");
            }
            if (ngaybd === "") {
                $("#ngaybd").css("border", "1px red solid");
            } else {
                $("#ngaybd").css("border", "none");
            }
            if (sanluong === "") {
                $("#sanluong").css("border", "1px red solid");
            } else {
                $("#sanluong").css("border", "none");
            }
            if (donvi=== "") {
                $("#donvi").css("border", "1px red solid");
            } else {
                $("#donvi").css("border", "none");
            }
            if (ngayth === "") {
                $("#ngayth").css("border", "1px red solid");
            } else {
                $("#ngayth").css("border", "none");
            }
            if (trangthai=== "") {
                $("#trangthai").css("border", "1px red solid");
            } else {
                $("#trangthai").css("border", "none");
            }
        }
        else {
            $("#addsvtab").css("display", "none");
            $(".d-flex").css("opacity", "1");


            $.ajax(
                { url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/mv/", method: "POST", data: ng_dung }
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
    $("#tenmv").val("");
    $("#donvi").val("");
    $("#ngaybd").val("");
    $("#sanluong").val("");
    $("#ngayth").val("");
    $("#trangthai").val("");
}
// phần xóa dữ liệu//
function deleteUser(id) {
    $.ajax({
        url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/mv/" + id,
        method: "DELETE"
    }).done(function () {
        loadData();
    })
}