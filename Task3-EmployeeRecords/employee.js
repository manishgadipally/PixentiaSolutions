$(document).ready(function () {
    $(".act-employees").click(function(){
        let activeEmpData = filterByStatus(EmployeeInformationArray,"active");
        generateEmployeeHtml(activeEmpData);
        });
        
        $(".in-act-employees").click(function(){
            let InactiveEmpData = filterByStatus(EmployeeInformationArray,"inActive");
            generateEmployeeHtml(InactiveEmpData);
         });
        
         $(".both-employees").click(function(){
            generateEmployeeHtml(EmployeeInformationArray);
         }); 
  });

var EmployeeInformationArray =[];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp.responseText);
        EmployeeInformationArray = data;
       generateEmployeeHtml(data);
    }
};
xhttp.open("GET", "empData.json", true);
xhttp.send();

function filterByStatus(data,status){
    if(status == "active"){
       return data.filter(x => x.status == "Active");
    }
    else{
        return data.filter(y => y.status == "Inactive");
    }
}
function generateEmployeeHtml(data){
    let empHtml ="<tr><th>Employee Name</th><th>Organization Name</th><th>Status</th></tr>";
    $.each(data, (_index, value) => {
            empHtml += `<tr><td>${value.first_name}&nbsp${value.last_name}</td><td>${value.organization_name}</td><td>${value.status}</td></tr>`
        });
    $("#employee-table-records").html(empHtml);
    
}

