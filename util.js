function convertNetEffectiveToGross(netEffectiveRent, leaseDuration, monthsFree) {
    //note- the netEffectiveRent that we get from the website is a rounded number (3981.25 vs. 3981) and will probably not generate the completely correct gross rent 
    return netEffectiveRent * leaseDuration / (leaseDuration-monthsFree);
}

function testConvertNetEffectiveToGross(netEffectiveRent, leaseDuration, monthsFree, correctGrossRent) {
    console.assert(convertNetEffectiveToGross(netEffectiveRent, leaseDuration, monthsFree) === correctGrossRent, {
        netEffectiveRent,
        leaseDuration,
        monthsFree,
        errorMsg: `${convertNetEffectiveToGross(netEffectiveRent, leaseDuration, monthsFree)} is not the right gross rent for a net effective rent of $${netEffectiveRent} on a ${leaseDuration} month lease with ${monthsFree} months free`
    })
}

testConvertNetEffectiveToGross(3981.25, 24, 3, 4550) 
testConvertNetEffectiveToGross(1833 + 1/3, 12, 1, 2000) 

//this test is failing because of weird javascript math... which is evaluating my function to 2250.0000000000005
// testConvertNetEffectiveToGross(2250*12/13, 13, 1, 2250) // the netEffectiveRent here is written this way because there's not a trivial fraction that I can use to represent 2076.9230769 (which is the true net effective rent, and will probably be advertised as 2077)

//this function will figure out if the rent price listed on streeteasy might be a net effective rent
//in the future, we will use some NLP techniques to parse the listing description to figure out if they mention anything about gross rent or it being a promotion
function checkIfGrossRent(rent){
    return false;
}