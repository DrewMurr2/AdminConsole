function login() {
    var us = document.getElementById("usr").value
    var pw = document.getElementById("pwd").value
    options = {
        url: "https://roilapi.azurewebsites.net/api/AdminLogin?user=" + us + "&password=" + pw
            /*        url: "http://localhost:49614/api/AdminLogin?user=" + us + "&password=" + pw*/
            
        , type: "GET"
    , }
    $.ajax(options).success(function (response) {
        var tempO = JSON.parse(response);
        generateTable(tempO)
    });
};

function generateTable(o) {
    var html = ''
    html += '<h2>' + o.username + ' Admin Console</h2>\
    <table class="table table-striped">\
           <thead>\
            <tr>'
    o.columnheadings.forEach(function (column) {
        html += '<th>' + column + '</th>'
    })
    html += '<th>' + 'Delete' + '</th>'
    html += '<th>' + 'Switch Active/Historic' + '</th>'
    html += '</tr>\
        </thead>\
        <tbody>'
    o.rows.forEach(function (row) {
        html += '<tr>'
        var Historic = true
        row.forEach(function (item) {
            if (item == 'Active') Historic = false
            html += '<th>' + item + '</th>'
        })
        html += '<th>' + '<button type="button" class="btn btn-danger">Delete</button>' + '</th>'
        if (Historic) html += '<th>' + '<button type="button" class="btn btn-success">Active</button>' + '</th>'
        else html += '<th>' + '<button type="button" class="btn btn-warning">Historic</button>' + '</th>'
        html += '</tr>'
    })
    html += '<tr>'
    o.rows[0].forEach(function (row) {
        html += '<th>' + '<input type="text" class="form-control" id="' + row + '">' + '</th>'
    })
    html += '<th>' + '<button type="button" class="btn btn-success">Add New</button>' + '</th>'
    html += '</tr>'
    html += '\
        </tbody>\
    </table>'
    $('#tableContainer').html(html)
}