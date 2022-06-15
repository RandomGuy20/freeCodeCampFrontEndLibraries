
let totalQuotes;

let chosenValues = [];

let currentAuthor;
let currentQuote;

const textArea = ".text";
const textColor = ".text-color";
const autherArea = "#author";
const colorChange = ".color-change";
const authtext = ".author";
const body = "body";
const twitter = "#twitter";
const tumblr = "#tumblr";
const button = "button";


const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];



  /* To Do List
  1. Change Background and Quote Button on each click -- Done
  Get quote on initial page load -- Done
  2. Need to Make sure Quote Makrs stay Visible - Done
  3. Need to change ehight of container pending how big paragraph is  -
  4. Twitter Click
  5. Tumbler Click
  6. Animate Color Change Better -- Done
  Make Div Dybnamic Sizing
  Paragrpah text and quote image match

  CSS
  1. Fix Middle Quote Box - Centered better


  */

  //Get Quotes

function getQuotes()
{
    fetch("https://type.fit/api/quotes").then(res => res.json()).then(results =>
    {
        quoteData = results;
        totalQuotes =  $(quoteData).toArray().length;

        console.log(quoteData);
        console.log(totalQuotes)
        console.log(quoteData[5].text)
    })

}

function NumberExists(number) 
{
    if(chosenValues.length > 0 ) 
    {
        if (chosenValues.includes(number)) 
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}

function BuildQuote() 
{
    let qDigit;
    console.log("Build Quote before while loop")
    while (true) 
    {
        qDigit = Math.floor(Math.random() * totalQuotes);
        console.log("Q digit is: " + qDigit)
        if(!NumberExists(qDigit))
        {
            break;
        }
    }
    chosenValues.push(qDigit);

    // get the quote
    currentQuote = quoteData[qDigit].text;


    //Get the author
    currentAuthor = quoteData[qDigit].author;


    //Get new color
    let colorNum = Math.floor(Math.random() *(11 -0 +1) +0);
//    / $(colorChange).css("background-color", colors[colorNum]);




    //Fade Text in and out
    $(".text-holder").animate({opacity:0},500,function () 
    {
        $(this).animate({ opacity: 1 }, 500);
        $(textColor).css("color", colors[colorNum]);
        $(textColor).text(currentQuote);
    });

    //Fade Author in and out
    $(".author-container").animate({opacity:0},500,function () 
    {
        $(this).animate({ opacity: 1 }, 500);
        $(author).css("color", colors[colorNum]);
        $(autherArea).text("- " + currentAuthor);
    });

    // Fade Body in and out
    $(body).delay(1000).css("background-color",colors[colorNum]);

    //Change Button Colors
    $(".btn").delay(1000).css("background-color",colors[colorNum]);


    // Set Twittwer info
    $(twitter).attr("href", 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+ encodeURIComponent(currentQuote + " " + currentAuthor));

    //Set Tumbler data
    $(tumblr).attr("href","https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +  encodeURIComponent(currentAuthor) +
          '&content=' + encodeURIComponent(currentQuote) +'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');

}

$(document).ready(function () 
{
    getQuotes();
    setTimeout(function()
    {
        BuildQuote();
    },600);

});

//Listen For Quote Click
$("#new-quote").click(function (e) 
{     
    BuildQuote();
});

 