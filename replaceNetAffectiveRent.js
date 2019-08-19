/* TODO: not all listings are showing the net effective rent. 
Some listings may actually be showing the gross rent, in which case,
we do not want to do anything else.
*/

const isNetEffectiveRent = true; //true for now, logic will be written later to figure out if we're actually looking at a net effective rent (see checkIfGrossRent in util.js)
// TODO we're just going to assume that the lease will be 12 months with 1 month free for now. 
//we will eventually use some NLP to get these numbers
const leaseDuration = 13;
const monthsFree = 2;

// check in the page text for the word "rental" to make sure it's a rental and not a sale.
const listingInfo = document.querySelector("#content > main > div.row.DetailsPage > article.right-two-fifths > section.actions").innerText;
const isRental = listingInfo.search(/rental/i) > -1;

if (isNetEffectiveRent && isRental) { 
    /* We are scraping the section of the DOM that has the price (which we want to eventually manipulate)
    priceElementText might be things like: 
        "$3,095 FOR RENT"
        "↓ $5,862 NO FEE"
    */
    let priceNode = document.querySelector("#content > main > div.row.DetailsPage > article.right-two-fifths > section.main-info > div > div.details_info_price > div.price");
    let priceElementText = priceNode.innerText;
    // This regex matches for a string that starts with '$', followed by any number of numerical digits (0-9) and commas (,)
    let regex = /\$[\d,]*/;
    // the String.prorotype.match function returns an array with the results, we are just getting the first result here
    // it gets the full price, as a string, using the regex above.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    let priceString = priceElementText.match(regex)[0];
    //remove all dollar sign and commas from the priceString
    let purePriceString = priceString.replace(/[$,]/g, '');
    let parsedRent = parseInt(purePriceString);
    
    const grossRent = Math.round(convertNetEffectiveToGross(parsedRent, leaseDuration, monthsFree)) 
    
    // here, reconstruct the HTML that we want.
    let htmlWithGrossRent = `<span>$${grossRent.toLocaleString()} Gross </span><span style="text-decoration: line-through;">${priceString} </span>`;
    priceNode.innerHTML = priceNode.innerHTML.replace(priceString, htmlWithGrossRent);
    
    //create new node to display information about the promotion
    const newNode = document.createElement('div');
    newNode.innerText = `${monthsFree} month${monthsFree >1? 's': ''} free on a ${leaseDuration} month lease`
    const parentDiv = priceNode.parentNode;
    // This inserts the new node after the priceNode, by calling insertBefore on priceNode's next sibling.
    parentDiv.insertBefore(newNode, priceNode.nextSibling);
}

//this function is copied over from util.js, since I was just using util.js as a scratchpad to write this function and test it.
// function convertNetEffectiveToGross(netEffectiveRent, leaseDuration, monthsFree) {
//     return netEffectiveRent * leaseDuration / (leaseDuration-monthsFree);
// }