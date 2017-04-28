// JavaScript Document

// set this to be the URL for the SMS script

function updateinnReachButton() {
    searchType = $("#searchtype option:selected").val();
    searchArg = $("#searcharg").val();

    if(searchType.match(/t|a|d/)) {
        innReachArg = searchType + ":(" + searchArg + ")";
    }
    else {
        innReachArg = searchArg;
    } 

    $("#innReachLink").attr("href", innReachUrl + innReachArg)
}

innReachUrl = "http://searchmobius.org/iii/encore/search/C__S";


$(document).ready(function () {
	
	
		$("span:contains(WebPAC PRO)").hide(); //Hide the iii footer

		$('#searchtype').change(function(){
		$("#exampleText").load("/screens/" + this.value + ".inc");
		});
		//Changes the search examples

		//var selectAny = $('#b option[value=""]')
		//$('#b option:not([value^="z"])').detach();
		//selectAny.prependTo("#b")
		//Hides the out-of-scope locations
		innReachButton = "<a id='innReachLink' href=''><span class='button'><img src='/screens/ico_mobius.png' alt=''><span class='buttonText'>Search MOBIUS</span></span></a>";


	    if($(".browseScreen")[0]) {

	        $(".navigationRow a .modifySearch").parent().parent().after(innReachButton); // drop a button that doesn't go anywhere

	        updateinnReachButton(); // Just set the href initially
	        // update the link href if the user changes search types (even if they don't actually submit it)
	        $("#searcharg").change(function() {
	                updateinnReachButton();
	        });
	        $("#searchtype").change(function() {
	                updateinnReachButton();
	        });
	    } else if ($(".bibSearch")[0]) {

	        var encore_button = $("div.navigationRowRecord a[href^='http://searchmobius.org/iii/encore/search']");
	        var encore_url    = encore_button.attr('href');
	        var re = /^(.*?C__S)(.*?)(__O.*)$/;
	        var url_parts = encore_url.match(re);
	        var title = url_parts[2];

	        // Replace some characters with Encore equivalents
  	        title = title.replace(/%3D/g, "Lw%3D%3D");	    // =
	        title = title.replace(/%3F/g, "Pw%3D%3D");		// ?
	        title = title.replace(/%2F/g, "Lw%3D%3D");	    // &
	        title = title.replace(/%3B/g, "SMCLN");		    // ;
        
   	        // Replace Unicode character codes with characters
	        var unicode_array = title.match(/%7Bu....%7D/g);
	        for (var i in unicode_array) {
	        	var character_code = unicode_array[i].match(/%7Bu(....)%7D/)[1];
		        title = title.replace(/%7Bu....%7D/, encodeURI(String.fromCharCode("0x" + character_code)));
	        }

			url_parts[0] = "";
	        url_parts[2] = title;
            encore_button.attr("href", url_parts.join(""));

	    }


});