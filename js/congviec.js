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
    $.get("https://6141d8f84d16670017ba29f3.mockapi.io/muavu/cv", function (data, status) {
        console.log(data);
        $("#sv-tbl tbody").empty();
        //Duyet danh sach 
        for (var i = 0; i < data.length; i++) {
            var tr = '<tr>' +
                '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].tencv+ '</td>' +
                '<td>' + data[i].cvthuoc + '</td>' +
                '<td>' + data[i].ngaybd+ '</td>' +
                '<td>' + data[i].mota+ '</td>' +
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
    $.get("https://6141d8f84d16670017ba29f3.mockapi.io/muavu/cv/" + id, function (data, status) {
      
        $("#tencv").val(data.tencv);
        $("#ngaybd").val(data.ngaybd);
        $("#cvthuoc").val(data.cvthuoc);
        $("#mota").val(data.mota);
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
                url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/cv" + id,
                method: "PUT",
                data: {
                    "tencv": $("#tencv").val(),
                    "ngaybd": $("#ngaybd").val(),
                    "cvthuoc": $("#cvthuoc").val(),
                    "mota": $("#mota").val(),
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
        "tencv": $("#tencv").val(),
        "ngaybd": $("#ngaybd").val(),
        "cvthuoc": $("#cvthuoc").val(),
        "mota": $("#mota").val(),
        "trangthai": $("#trangthai").val(),
       
    };
    if (isAdd) {
        var tencv = $("#tencv").val(); 
        var ngaybd= $("#ngaybd").val();
        var cvthuoc= $("#cvthuoc").val();
        var mota= $("#mota").val();
        var trangthai= $("#trangthai").val();
       

        if (tencv === ""  || ngaybd === "" || cvthuoc === "" || mota === "" || trangthai === "") {
            $("#error").css("display", "block");
            if (tencv === "") {
                $("#tencv").css("border", "1px red solid");
            } else {
                $("#tencv").css("border", "none");
            }
            if (ngaybd === "") {
                $("#ngaybd").css("border", "1px red solid");
            } else {
                $("#ngaybd").css("border", "none");
            }
            if (cvthuoc === "") {
                $("#cvthuoc").css("border", "1px red solid");
            } else {
                $("#cvthuoc").css("border", "none");
            }
            if (mota === "") {
                $("#mota").css("border", "1px red solid");
            } else {
                $("#mota").css("border", "none");
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
                { url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/cv/", method: "POST", data: ng_dung }
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
    $("#tencv").val("");
    $("#cvthuoc").val("");
    $("#ngaybd").val("");
    $("#mota").val("");
    $("#trangthai").val("");
 
} 

function deleteUser(id) {
    $.ajax({
        url: "https://6141d8f84d16670017ba29f3.mockapi.io/muavu/cv/" + id,
        method: "DELETE"
    }).done(function () {
        loadData();
    })
}