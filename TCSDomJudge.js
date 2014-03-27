// ==UserScript==
// @name       TCS DomJudge Bootstrap
// @namespace  http://domjudge.tcs.uni-luebeck.de/
// @version    2013.09.26
// @description  TCS DomJudge - Twitter Bootstrap extension
// @match      http://domjudge.tcs.uni-luebeck.de/domjudge/*
// @match      http://domjudge.tcs.uni-luebeck.de/domjudge/team/*
// @copyright  2013 Malte Skambath
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
$(document).ready(function(){
    
    function getXmlRequest() {
        var xmlhttp = null;
        // Mozilla
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    }
    
    function requestContests() {
        var xmlhttp = getXmlRequest();
        xmlhttp.open("GET", 'contests.php', true);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var parser = new DOMParser();
  				var doc = parser.parseFromString(xmlhttp.responseText, "text/xml");
                var tbl = doc.getElementsByTagName("table")[0];
                var trs = tbl.getElementsByTagName('tr');
                
                var ulx = document.getElementById('contestmenu');
                 for (var i=1;i<trs.length;i++) {
					 var tds=trs[i].getElementsByTagName('td');
                     var cell=tds[6];
                     var ac = cell.getElementsByTagName('a')[0];
                     var orighref = ac.href;
                     var idx = tds[0].getElementsByTagName('a')[0].innerText;
                     idx = idx.substring(1,idx.lenght);
                     
                     var cname = ac.innerText;
                 
                     var li = document.createElement('li');
                     var link = document.createElement('a');
                     
                     link.appendChild(document.createTextNode(cname));
                     
                     var urlparts= document.URL.split('?');
                     link.setAttribute('href',urlparts[0]+'?cid='+idx);
                     
                     li.appendChild(link);
                     ulx.appendChild(li);

                 }
                
            }
            
        };
        xmlhttp.send(null);
    }
     function requestCurrentContest() {
        var xmlhttp = getXmlRequest();
         
        xmlhttp.open("GET", 'scoreboard.php', true);
        xmlhttp.onreadystatechange = function() {
            
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var parser = new DOMParser();
                
  				var doc = parser.parseFromString(xmlhttp.responseText, "text/xml");
                
                var h1 = doc.getElementsByTagName("h1")[0];
                var a = h1.getElementsByTagName('a')[0];
                var ulx = document.getElementById('navlinks');
                var li = document.createElement('li');
                var link = document.createElement('a');
                var scbname = h1.innerHTML.split('<')[0];
                var cname = scbname.substring(10,scbname.length);
                a.innerText=cname;
                //alert(a.href);
                link.href=a.href;
                li.appendChild(a);
                ulx.insertBefore(li,ulx.firstChild);
                
            }
            
        };
        xmlhttp.send(null);
    }
     
    function mainNav(links) {
        var navList = $('<ul id="navlinks" class="nav">');
        var out = '';
        
        for (var i = 0; i < links.length; i++) {
            out += '<li id"' + links[i].id +'" ><a  href="' + links[i].url + '" title="' + links[i].title + '" >' + links[i].text + '</a>';
        }
        
        navList.html(out);
        return navList;
    }
    
    
    // -- Add Bootstrap --
    //$('head').append('<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap.css" rel="stylesheet">');
    //$('head').append('<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.css" rel="stylesheet">');
    //$('head').append('<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/3.0.0/css/bootstrap-combined.min.css" rel="stylesheet">');
    //$('head').append('<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">');
    //$('head').append('<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-theme.min.css">');
    //$('body').prepend('<style>body { padding-top: 30px; }  .result {width: 60ex;} .langid {width: 60ex;} span.fileinputs{position:absolute;height=30px;} select{margin-bottom:0px;} h3{line-height:20px;} input[type="file"]{width: 100px}</style>');
    //$('body').append('<script src="//code.jquery.com/jquery.js"></script>');
    
    $('head').append('<link href="//swimcalc.malte-skambath.de/css/bootstrap.css" rel="stylesheet">');
    $('head').append('<style> inbut[type="button"]{ color:red; } body { padding-top: 30px; }  .result {width: 60ex;} .scoreboard tr {height: 20px;} .langid {width: 60ex;} select{margin-bottom:0px;} input[type="file"]{width: 0px} h3{line-height:20px;} </style>');
    $('head').append('<script src="//code.jquery.com/jquery.js"></script>');
    //$('body').append('<script src="//swimcalc.malte-skambath.de/js/bootstrap.js"></script>');
    $('head').append('<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>');
    
    
    
    //1.5 Make some objects for some custom elements
    var navLinks = [
        {   
            id: "index",
            url : 'index.php', 
            title : '', 
            text : 'Overview' 
        },
        {   
            id: "scoreboard",
            url : 'scoreboard.php', 
            title : '', 
            text : 'Scoreboard' 
        },
        {   
            id: "contests",
            url : 'contests.php', 
            title : '', 
            text : 'Contests' 
        },
        {   
            id: "logout",
            url : 'logout.php', 
            title : '', 
            text : 'Logout' 
        }

    ];

    
    
    var clkt = document.getElementById('clock');      
    if (clkt!=null){
        var clk = clkt.innerHTML;
        var contestmenu = $('<ul id="contestmenu" class="dropdown-menu" role="menu">');
        var cmentry = $('<li class="dropdown">');
        var cmentrya = $('<a href="#"  class="dropdown-toggle" data-toggle="dropdown">switch contest <b class="caret"></b></a>');
        var lclock = $('<li><div><font >'+clk+'</font></div></li>');
        var navelem = mainNav(navLinks);
        var nbcontainer = $('<div class="container">');
        var navi = $('<div class="navbar-inner" id="navbar-main">');
        var navb = $('<div class="navbar navbar-inverse navbar-fixed-top">');
        
        cmentry.append(cmentrya);
        cmentry.append(contestmenu);
        navelem.append(cmentry);
        navelem.append(lclock);
        nbcontainer.append(navelem);
        navi.append(nbcontainer);
        
        
        
        
        navb.append(navi);
        $('body').prepend(navb); 
        
        requestContests();
        requestCurrentContest();
    }
    
    // -- buttons --
    var oSbmBtn = document.getElementsByTagName('input');
	for(var i=0;i<oSbmBtn.length;i++){
        var oldSubmitBtn = oSbmBtn[i];
        if (oldSubmitBtn.type != 'submit') continue;
		var newSubmitBtn = document.createElement('button');
        //<input type="submit" name="submit" id="submit" value="submit" onclick="return checkUploadForm();
		newSubmitBtn.appendChild(document.createTextNode(oldSubmitBtn.value));
 	   	newSubmitBtn.setAttribute('class', 'btn btn-primary');
    	newSubmitBtn.setAttribute('name', oldSubmitBtn.name);
        newSubmitBtn.setAttribute('submit', oldSubmitBtn.submit);
    	newSubmitBtn.setAttribute('type', 'submit');
    	newSubmitBtn.setAttribute('value', oldSubmitBtn.value);
        //alert(oldSubmitBtn.onclick);
    	newSubmitBtn.setAttribute('onclick', oldSubmitBtn.onclick);
		oldSubmitBtn.parentNode.replaceChild(newSubmitBtn, oldSubmitBtn);
    }
    
    // -- medals --
    var imgs = document.getElementsByTagName('img'); 
	
	for(var i=0;i<imgs.length;i++){
        var im = imgs[i];
        if (im.hasAttribute('title')){        
            if (im.title == 'bronze'||im.title == 'silver' ||im.title == 'gold') {
                im.setAttribute('width',"15px");
                im.setAttribute('height',"inherit");
            }
        }
    }
    
  
    
    var x = document.getElementsByTagName('input');
    
    for (var i=0;i<x.length;i++) {
		if (x[i].type != 'reset') continue;
        var newCancelBtn = document.createElement('button');
        var oldCancelBtn = x[i];
        //<input type="reset" value="cancel" />
        newCancelBtn.appendChild(document.createTextNode('cancel'));
        newCancelBtn.setAttribute('class', 'btn btn-danger');
        newCancelBtn.setAttribute('name', 'submit');
        newCancelBtn.setAttribute('type', 'reset');
        newCancelBtn.setAttribute('value', 'cancel');
        oldCancelBtn.parentNode.replaceChild(newCancelBtn, oldCancelBtn);
    }
    
    
	        // -- remove old menu --
    var mtop = document.getElementById("menutop");
	var mtr = document.getElementById("menutopright");
    mtop.parentNode.removeChild(mtop);
	mtr.parentNode.removeChild(mtr);

 	
    // -- submission table --
    var submitlist = document.getElementById("submitlist");
    var table = submitlist.getElementsByTagName("table")[0];
    var thead = table.getElementsByTagName("thead")[0];
    var th = thead.getElementsByTagName("th")[0];
        th.setAttribute("style","width : 400ex");
	
    // -- select boxes --
	var langid = document.getElementById("langid");
	var probid = document.getElementById("probid");
	probid.setAttribute('style' , 'width:250px');
	langid.setAttribute('style' , 'width:100px');
	document.getElementById("codebutton").className = "btn btn-default";
    document.getElementById("codebutton").parentNode.className = "";
    document.getElementById("codebutton").parentNode.setAttribute ('style','zindex:"1";');
  
});