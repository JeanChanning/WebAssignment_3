function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

function prevClick(){
    page = parseInt(getParams("page")) - 1
    if(isNaN(page)){
        page = 1;
    }
    if(page < 1){
        page = 1;
    }
    window.location.href="AnotherMovieIndex.html?page=" + page;
}
function nextClick(){
    page = parseInt(getParams("page")) + 1
    if(isNaN(page)){
        page = 2;
    }
    if(page > 500){
        page = 500;
    }
    window.location.href="AnotherMovieIndex.html?page=" + page;
}
function pageGoto() {
    var page_goto = document.getElementById("page_goto").value;
    window.location.href="AnotherMovieIndex.html?page=" + page_goto;
}

function searchClick(){
    var name_part = document.getElementById("name").value;
    window.open("SearchResult.html?name=" + name_part);
}

//get page
let page = getParams("page");
if(page == null || page > 500 || page < 1){
    page = 1;
}

//set pagination
if(page > 490){
    for(var i = 1; i <= 10; i++) {
        var button_name = "page" + String(i);
        page_button = document.getElementById(button_name);
        text = 490 + i - 1;
        page_button.innerText = text;
        page_button.innerText = 490 + i;
        page_button.setAttribute("href", "AnotherMovieIndex.html?page=" + page_button.innerText);
    }
}
else {
    for(var i = 1; i <= 10; i++) {
        var button_name = "page" + String(i);
        page_button = document.getElementById(button_name);
        text = parseInt(page) + parseInt(i - 1);
        page_button.innerText = text;
        page_button.setAttribute("href", "AnotherMovieIndex.html?page=" + page_button.innerText);
    }
}

//get content
var httpRequest = new XMLHttpRequest();
url = "http://112.74.53.9.:8080/FilmJavaServer/findFilmByPage?page=" + page;
httpRequest.open("GET", url, true);
httpRequest.send();

//set content
httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200) {
        let list = eval(httpRequest.responseText);

        for (let index = 0; index < 20; index++) {
            var link = "MovieDetails.html?id=" + list[index]["_Id"];
            var title = list[index]["title"];

            var pubdate = eval(list[index]["pubdate"]);

            var rating_data = JSON.parse(list[index]["rating"].toString().replace(/'/g, "\""));
            var average = rating_data.average;
            var rating = parseFloat(rating_data.average) * 6;
            var rating_people = rating_data.rating_people;

            var poster = list[index]["poster"];
            var summary_total = list[index]["summary"].toString()
            var summary = summary_total.substring(0, 80) + '\n' + summary_total.substring(80, 160) + '……';

            var casts_data = JSON.parse(list[index]["casts"].toString().replace(/'/g, "\"").replace(/O"/g, "O'"));
            cs = '';
            for (var i of casts_data) {
                cs += i.name + ' / ';
            }
            var casts = cs.substring(0, cs.length - 3);

            var tableObj = document.getElementById("movieTable");
            tableObj.innerHTML +=
                '<td>' +
                '    <div style="font-size: 20px" class="row clearfix">\n' +
                '        <div class="col-md-3 column">\n' +
                '            <img style="width: 210px;height: 308px;" alt="' + title + '" src="' + poster + '" /> \n' +
                '        </div>\n' +
                '        <div class="col-md-9 column">\n' +
                '            <div class="row clearfix">\n' +
                '                <div class="col-md-9 column">\n <a href="' + link + '">' + title + '</a>' +
                '                </div>\n' +
                '                <div class="col-md-3 column">\n' +
                '                    <div id="bg">\n' +
                '                        <div id="over" style="width:' + rating + 'px"></div>\n' +
                '                    </div>' +
                '                    <span style="color: #ac2925">' + average + '</span> (' + rating_people + '人已评价)' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div style="font-size: 16px" class="row clearfix">\n' +
                '                <div class="col-md-9 column">\n' + pubdate +
                '                </div>\n' +
                '            </div>' +
                '            <div class="row clearfix">\n' +

                '            </div>\n' +
                '            <div class="row clearfix">\n' +
                '                <div class="col-md-12 column">\n' + casts +
                '                </div>\n' +
                '            </div>\n' +
                '            <hr />' +
                '            <div class="row clearfix">\n' +
                '                <div class="col-md-12 column">\n' +
                '                    <p>\n' + summary +
                '                    </p>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>' +
                '    <hr class="hr4"/>\n'
            '</td>'
        }
    }
};
