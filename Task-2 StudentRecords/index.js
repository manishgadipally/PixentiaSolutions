function captureStudentRecords(){
    let studentName = $("#inputEmail4").val();
    let studentEmail = $("#inputemail4").val();
    let studentStatus = $("#inputState").val();
    if(validateInputValues(studentName,studentEmail,studentStatus)){
        addRecordToTable(studentName,studentEmail,studentStatus);
        clearInputValues();
    }
    else{
        return true;
    }
}

function addRecordToTable(studentName,studentEmail,studentStatus){
    $('#student-table-records tr:last').after(`<tr><td>${studentName}</td><td>${studentEmail}</td><td>${studentStatus}</td>/tr>`);
}

function validateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};

function clearInputValues(){
    $("#inputEmail4").val("");
    $("#inputemail4").val("");
    $("#inputState").val("Select");
}

function validateInputValues(studentName,studentEmail,studentStatus){
    let isValid = true;
    if(!studentName){
        $(".errorMsgName").html("Please enter student name").show();
        isValid = false;
    }
    else{
        $(".errorMsgName").hide();
    }

    if(studentEmail){
        if(validateEmail(studentEmail)){
            $(".errorMsgEmail").hide();
        }
        else{
            $(".errorMsgEmail").html("Please enter valid email").show();
            isValid = false;
        }
    }
    else{
        $(".errorMsgEmail").html("Please enter email address").show();
    }
    if(studentStatus == "Select"){
        $(".errorMsgStatus").show();
        isValid = false;
    }
    else{
        $(".errorMsgStatus").hide();
    }
    return isValid;
}

function exportTableToExcel(){
    var downloadurl;
    var dataFileType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById("student-table-records");
    var tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    var filename = filename ? `${filename}.xls`:'export_excel_data.xls';
    
    // Create download link element
    downloadurl = document.createElement("a");
    
    document.body.appendChild(downloadurl);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTMLData], {
            type: dataFileType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;
        downloadurl.download = filename;
        downloadurl.click();
    }
}