function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

let id = getParams("id")
var httpRequest = new XMLHttpRequest();
url = "http://112.74.53.9.:8080/FilmJavaServer/findFilmById?id=" + id;
httpRequest.open("GET", url, true);
httpRequest.send();

httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200) {
        let text = eval(httpRequest.responseText)[0];
        console.log(text);

        title.innerText = text.title;
        genres.innerText = eval(text.genres);
        duration.innerText = eval(text.duration) + " (分钟)";
        summary.innerText = text.summary;
        countries.innerText = eval(text.countries);
        poster.setAttribute("src", text.poster);
        poster.setAttribute("alt", text.title);
        pubdate.innerText = eval(text.pubdate);

        ds = ''
        for(var i of eval(text.directors)){
            ds += i.name + ' / '
        }
        directors.innerText = ds.substring(0, ds.length - 3)

        cs = ''
        for(var i of eval(text.casts)){
            cs += i.name + ' / ';
        }
        casts.innerText = cs.substring(0, cs.length - 3);


    }
}
