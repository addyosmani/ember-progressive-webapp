# Ember Zuperkülblog Progressive Web App

A Progressive Web App built using Ember.

![](https://cloud.githubusercontent.com/assets/110953/15867845/f26a07e6-2cdc-11e6-9256-14d63358c9fa.jpg)

## How it was built

* [Google I/O 2016 video](https://www.youtube.com/watch?v=srdKq0DckXQ&list=PLNYkxOF6rcIDz1TzmmMRBC-kd8zPRTQIP&index=21)
* [Slides](https://speakerdeck.com/addyosmani/progressive-web-apps-across-all-frameworks)

## Performance breakdown

* [Lighthouse](http://output.jsbin.com/rumere/quiet)
* WebPageTest Speed Index scores
  * Before any optimisations or Service Worker. [Deployed version](https://6-dot-ember-pwa-14.appspot.com/#/art)
    * Cable: [http://www.webpagetest.org/result/160512_EB_AAD/](http://www.webpagetest.org/result/160512_EB_AAD/) - 1st view: 2884
    * 3G: [http://www.webpagetest.org/result/160512_8F_AA7/](http://www.webpagetest.org/result/160512_8F_AA7/) - 1st view: 4581
  * After Service Worker (but no FastBoot). [Deployed version](https://3-dot-ember-pwa-14.appspot.com/#/art)
    * Cable: [http://www.webpagetest.org/result/160512_QB_9X5/](http://www.webpagetest.org/result/160512_QB_9X5/) - 1st view: 5377, Repeat: 2637
    * 3G: [http://www.webpagetest.org/result/160512_18_9ZY/](http://www.webpagetest.org/result/160512_18_9ZY/) - 1st view: 7933, Repeat: 3109
  * FastBoot + SW + critical-path CSS. [Deployed version](https://ember-pwa.herokuapp.com) 
    * Cable: [http://www.webpagetest.org/result/160511_BT_2FQ2/](http://www.webpagetest.org/result/160511_BT_2FQ2/) - 1st view: 972, Repeat: 414
    * 3G: [http://www.webpagetest.org/result/160511_R6_2FQC/](http://www.webpagetest.org/result/160511_R6_2FQC/) - 1st view: 2001, Repeat: 426

Time to first meaningful interaction - we are waiting for Lighthouse to support this via the 'input readiness' metric.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

