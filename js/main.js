function selectyear(){
    var s= document.getElementById("year");

    for(var i=new Date().getFullYear(); i> 1935 ;i--){
        s.innerHTML=s.innerHTML+"<option value=i>"+i+"</option>";
    }
}



function getS(pageNo=1){
    var title= document.getElementById("search").value;
    var apicl="http://www.omdbapi.com/?s="+encodeURI(title)+"&page="+pageNo.toString()+"&callback=?&apikey=154d259c";
    console.log(apicl);
    $.getJSON(apicl, function (result) {
        displayJSON(result);
      });
}

function getAS(title=document.getElementById("title").value, mtype=document.getElementById("mtype").value, year=document.getElementById("year").value){

     var apicl="http://www.omdbapi.com/?t="+encodeURI(title)+"&type="+mtype+"&y="+year+"&callback=?&apikey=154d259c";
    
     $.getJSON(apicl, function (result) {
        displayJSON(result);
      });
}
var pageNo=1;
function displayJSON(obj){
    console.log(obj);
    var res=document.getElementById("Response");
    res.innerHTML=null;

    if(obj.Response=="False"){
        res.innerText="Unable to find movie..";
    }
    else{
        if(obj.hasOwnProperty("Search")){
            res.innerHTML="<h2>Search Results..</h2><br>";

            for(i=0; i<Object.keys(obj.Search).length; i++){
                var sr=document.createElement("div");
                sr.className="listElement";
                sr.setAttribute("onclick","getAS("+'"'+obj.Search[i].Title+'"'+","+'"'+obj.Search[i].Type+'"'+","+'"'+ obj.Search[i].Year+'"'+")");
                sr.innerHTML=obj.Search[i].Title+"<img src="+obj.Search[i].Poster+" width=150px height=200px><br>";
                res.appendChild(sr);
            }
            pageNo++;
            sr.innerHTML=sr.innerHTML+"<button onclick=getS("+pageNo+")>Next</button>";
        
        }
        
        else{
            res.innerHTML=
            "<b>Title:</b>"+obj.Title+
            "<br><img src="+obj.Poster+">"+
            "<br><b>Year:</b>"+obj.Year +
            "<br><b>Rated:</b>"+obj.Rated +
            "<br><b>Released:</b>"+obj.Released +
            "<br><b>Runtime:</b>"+obj.Runtime + 
            "<br><b>Genre: </b>"+obj.Genre +
            "<br><b>Director:</b>"+obj.Director + 
            "<br><b>Writer:</b>"+obj.Writer +
            "<br><b>Actors:</b>"+obj.Actors + 
            "<br><b>Plot:</b>"+obj.Plot +
            "<br><b>Language:</b>"+obj.Language +
            "<br><b>Country:</b>"+obj.Country +
            "<br><b>Awards:</b>"+obj.Awards +
            "<br><b>imdbRating:</b>"+obj.imdbRating; 
        }       
    }

}
