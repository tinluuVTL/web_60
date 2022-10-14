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
    $.get("https://60adc01980a61f00173319a5.mockapi.io/nv", function (data, status) {
        console.log(data);
        $("#sv-tbl tbody").empty();
        //Duyet danh sach 
        for (var i = 0; i < data.length; i++) {
            var tr = '<tr>' +
                '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].ten+ '</td>' +
                '<td>' + data[i].sdt + '</td>' +
                '<td>' + data[i].gioitinh + '</td>' +
                '<td>' + data[i].diachi+ '</td>' +
                '<td>' + data[i].ngaylam+ '</td>' +
                '<td>' + data[i].cvlam + '</td>' +
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
    $.get("https://60adc01980a61f00173319a5.mockapi.io/nv/" + id, function (data, status) {
      
        $("#ten").val(data.ten);
        $("#ngaylam").val(data.ngaylam);
        $("#cvlam").val(data.cvlam);
        $("#gioitinh").val(data.gioitinh);
        $("#diachi").val(data.diachi);
        $("#sdt").val(data.sdt);
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
                url: "https://60adc01980a61f00173319a5.mockapi.io/nv/" + id,
                method: "PUT",
                data: {
                    "ten": $("#ten").val(),
                    "ngaylam": $("#ngaylam").val(),
                    "sdt": $("#sdt").val(),
                    "cvlam": $("#cvlam").val(),
                    "gioitinh": $("#gioitinh").val(),
                    "diachi": $("#diachi").val(),
                   
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
        "ten": $("#ten").val(),
        "ngaylam": $("#ngaylam").val(),
        "cvlam": $("#cvlam").val(),
        "sdt": $("#sdt").val(),
        "gioitinh": $("#gioitinh").val(),
        "diachi": $("#diachi").val(),
       
    };
    if (isAdd) {
        var ten = $("#ten").val();
        var ngaylam= $("#ngaylam").val();
        var cvlam = $("#cvlam").val();
        var sdt= $("#sdt").val();
        var gioitinh= $("#gioitinh").val();
        var diachi= $("#diachi").val();
       

        if (ten=== "" || ngaylam === "" || diachi === "" || cvlam === ""|| gioitinh === "" || sdt === "") {
            $("#error").css("display", "block");
            if (ten === "") {
                $("#ten").css("border", "1px red solid");
            } else {
                $("#ten").css("border", "none");
            }
            if (ngaylam === "") {
                $("#ngaylam").css("border", "1px red solid");
            } else {
                $("#ngaylam").css("border", "none");
            }
            if (cvlam=== "") {
                $("#cvlam").css("border", "1px red solid");
            } else {
                $("#cvlam").css("border", "none");
            }
            if (diachi=== "") {
                $("#diachi").css("border", "1px red solid");
            } else {
                $("#diachi").css("border", "none");
            }
            if (sdt === "") {
                $("#sdt").css("border", "1px red solid");
            } else {
                $("#sdt").css("border", "none");
            }
            if (gioitinh=== "") {
                $("#gioitinh").css("border", "1px red solid");
            } else {
                $("#gioitinh").css("border", "none");
            }
           

        }
        else {
            $("#addsvtab").css("display", "none");
            $(".d-flex").css("opacity", "1");


            $.ajax(
                { url: "https://60adc01980a61f00173319a5.mockapi.io/nv/", method: "POST", data: ng_dung }
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
    $("#ten").val("");
    $("#diachi").val("");
    $("#sdt").val("");
    $("#cvlam").val("");
    $("#ngaylam").val("");
    $("#gioitinh").val("");
  
}

function deleteUser(id) {
    $.ajax({
        url: "https://60adc01980a61f00173319a5.mockapi.io/nv/" + id,
        method: "DELETE"
    }).done(function () {
        loadData();
    })
}