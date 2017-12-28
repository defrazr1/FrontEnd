
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetInput = $('#street').val();
    var cityInput = $('#city').val();
    var address = streetInput + ', ' + cityInput;

    var streetViewURL = 
     'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' +
     address + '';

    $body.append('<img class="bgimg" src="' + streetViewURL + '">');


    var URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    URL += '?' + $.param(
        {
            'q': cityInput,
            'api-key': "7a588d2f5cda43d09c2c948e059feb9a",
        });
    
    $.getJSON(URL, function(data) {
        var articles = data.response.docs;
        $.each(articles, function(key, val) {
            var article = articles[key];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url +'">' +
                article.headline.main +
                    '</a>'+
                '<p>' + article.snippet + '</p>' +
            '</li>');
        });
    })
    .fail(function() {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    })

    //         $('.append('<li id="' + key + '">' + val + '</li>');
    //     });

    //     $( '<ul/>', {
    //         'class': 'article-list',
    //         html: items.join('') 
    //     }).appendTo($nytElem);
    // });

//     $.getJSON( "ajax/test.json", function( data ) {
//   var items = [];
//   $.each( data, function( key, val ) {
//     items.push( "<li id='" + key + "'>" + val + "</li>" );
//   });
 
//   $( "<ul/>", {
//     "class": "my-new-list",
//     html: items.join( "" )
//   }).appendTo( "body" );
// });



    
    return false;
};

$('#form-container').submit(loadData);
