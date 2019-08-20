For engineers looking at this project- it is still very much a work in progress!

What this is: a chrome extension that runs on Streeteasy.com that shows an apartment rental's gross rent instead of the net effective rent, which is often advertised
Suggested reading for understanding gross and net effective rent: https://www.transparentcity.co/blog/net-effective-rent-versus-gross-rent
Presentation about this project: https://docs.google.com/presentation/d/1tDQYenAo14tRcz_1XTGaVwkl8-c-M89BxSoHHUMG8Oc/edit?usp=sharing

Technologies used: 
- chrome extension API (https://developer.chrome.com/extensions)
- lots of other native Javascript APIs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
* I specifically chose to not use any external libraries or frameworks for this project for ease of development and learning.

To install this project and get it working on your machine:
1. Go to chrome://extensions/ and turn on developer mode in the upper right corner
2. Click "Load unpacked" and choose this directory
3. You should now see this extension, called Streeteasier, installed, with a description and icon that is my logo. Make sure it's enabled with the blue slider in the bottom righthand corner of the extension's description box on chrome://extensions/.

To "use" this project:
This is a simple chrome extension, which just runs a script on the page. 
There's no interaction or action that needs to be taken.
To see the script, go to any rental listing pages such as https://streeteasy.com/building/60-water-street/1412?featured=1 and see that the rent has been replaced with "$xxxx Gross"

Explanation of files/how to read this codebase:
- manifest.json: lays out the logistics of the extension. Here, we essentially say that when you are on a certain domain (e.g. streeteasy), some scripts will run
- the script is at replaceNetEffectiveRent.js. That's pretty much all there is to it!
- util.js is currently a file not being used anywhere, but will eventually become a module/imported into other files. 

What I learned so far on this project:
- how to use simple Regex
- how to simply manipulate the DOM
- how to browse through and read and *understand* documentation on MDN and developer.chrome.com
- inheritance and the prototype chain
- how to be a power user of the chrome dev tools, especially the elements tab!
- how to debug in VS code and set breakpoints
- how to use console.assert for very simple testing


//TODO:
- BUGS:
    - the gross rent being calculated is based on assumptions of the lease length and months free
- FEATURES:
    - show the gross rent on the rental search results page too (see replaceNetEffectiveRent-search.js)
    - improve design to make it consistent/less invasive on Streeteasy
    - use NLP to parse the description of the listing to better understand the promotional language
    - make sure the script doesn't run on listings that are already listing the gross rent
- OTHER: 
    - improve clarity of code
    - improve performance - we want the DOM manipulation to be as smooth as possible
    - create github pages site for this project
    - put it on the chrome store after sufficient QA testing!
