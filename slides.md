# Web 
<br/>  
<br/>  
##Mobile HTML5 websites and Hybrid Apps with AngularJS
<br/>
## _How to code today with tomorrow tools - mobile edition_
###Carlo Bonamico - [@carlobonamico](https://twitter.com/carlobonamico)
###NIS s.r.l.
###carlo.bonamico@gmail.com
###carlo.bonamico@nispro.it


--
# In short
* AngularJS lets you use today the features of next-generation web standards, 
  * making front-end development more productive and fun
* What's better, it provides its "magic" tools to both web AND mobile apps
  * databinding, dependency injection
  * modularity, composable and event-driven architecture 

* This``code-based`` interactive talk will share some lessons learned 
  * how to structure applications
  * tune bandwidth and performance
  * interact with mobile-specific elements such as touch, sensors
  * native-looking UX with Ionic Framework

--
#Web vs Native
* I do not want to join the fight ;-)

* The web tends to always be more powerful than people think!
  * and the gap with native will only become smaller with time
  
* There are many use cases for web-based sites and hybrid apps (HTML5 packed in an app)
  * avoiding install on device
  * ensuring always latest version
  * platform support: iOS, Android, Windows Phone... 
  * easier and more familiar development workflow
* And my favorite...
  * to use Angular magic!
--
#So why AngularJS
* Open Source framwework
  * fast-growing
  * great community

<img src="http://localhost:8000/angularjs.png" style="width: 200px;"/>
##[http://www.angularjs.org](http://www.angularjs.org)
<br/>

* Lets you adopt future web architecture and tools today
  * anticipate Web Components and EcmaScript 6

##Create modular, robust, testable apps
-- 
#Angular gives structure and modularity
* Dependency Injection
 * split component definition from component wiring
 
* Module composition e.g.
  * common modules
  * mobile-only components
  * desktop-only components

<br/>

## What you get: write less code, reuse more the code you write!
--
#But...
##...isn't a web / JS Mobile app unusably slow?

<br/>

## Let's try...

<br/>

##_This_ presentation is an Angular-based _Single Page Application_

<br/>
##Now we launch it on a phone and explore it with Chrome usb debugging
--
#Discovering the device 
* ``about:inspect``

<img src="http://localhost:8000/images/chrome-devices.png" class="centerImage"/>

* enable port forwarding from laptop to phone
* open ``http://localhost:8000`` on the phone
--
#Monitoring CPU usage and FPS
<img src="http://localhost:8000/images/chrome-monitor.png" class="centerImage"/>
--
#Inspecting the page on the phone
<img src="http://localhost:8000/images/chrome-inspect.png" class="centerImage"/>
--
#What's inside
* A View: index.html
  * + a [style.css](style.css)
  * peppered-up with AngularJS 'ng-something' directives
* A model
  * data: slides.md
  * code: array of slide object
* A controller
  * script.js
--
#The model
```javascript
   var slide = {
                    number: i + 1,
                    title: "Title " + i,
                    content: "#Title \n markdown sample",
                    html: "",
                    background: "backgroundSlide"
    };
```
--
#A service to load slides from markdown
```js
    ngSlides.service('slidesMarkdownService', function ($http) {
    var converter = new Showdown.converter();
    return {
        getFromMarkdown: function (path) {
            var slides = [];

            $http({method: 'GET', url: path}).
                success(function (data, status, headers, config) {
                    var slidesToLoad = data.split(separator); //two dashes
                    for (i = 0; i < slidesToLoad.length; i++) {
                        var slide = {
                            content: slidesToLoad[i],
                            //.. init other slide fields
                        };
                        slide.html = converter.makeHtml(slide.content);
                        slides.push(slide);
                    }
                });
            return slides;
        } } })
```
--
#A simple declarative view
* binding the model to the html

```html
<body ng-app="ngSlides" ng-class="slides[currentSlide].background"
      ng-controller="presentationCtrl">

<div id="slidesContainer" class="slidesContainer" >
    <div class="slide" ng-repeat="slide in slides"
                       ng-show="slide.number == currentSlide" >

        <div ng-bind-html="slide.html"></div>

        <h4 class="number">{{slide.number}}</h4>

    </div>

</div>
</body>
```
* and a very simple css for positioning elements in the page
--
#A controller focused on interaction
```javascript

    ngSlides.controller("presentationCtrl", function ($scope, $http,
                                      $rootScope, slidesMarkdownService) {

    $scope.slides = slidesMarkdownService.getFromMarkdown('slides.md');

    $scope.currentSlide = 0;

    $scope.next = function () {
        $scope.currentSlide = $scope.currentSlide + 1;

    };

    $scope.previous = function () {
        $scope.currentSlide = $scope.currentSlide - 1;
    };


});

```   
--
#AngularJS magic
## Any sufficiently advanced technology is indistinguishable from magic.
###_Arthur C. Clarcke_

<br/>

* Add search within the slides in one line
```
<div ng-repeat="slide in slides | filter:q">...</div>
```
* where q is a variable containing the search keyword
--
#AngularJS magic is made of
* Two-way Databinding 
  * split the view from the logic ``{{slide.number}}``
* Dependency Injection 
  * gives decoupling, testability & enriching of code and tags
```
  function SlidesCtrl($scope, SlidesService) {
    SlidesService.loadFromMarkdown('slides.md');
  }
```
* The power of composition - of
  * modules 
    * ``module('slides',['slides.markdown'])``
  * directives 
    * `` <h1 ng-show='enableTitle' ng-class='titleClass'>..</h1>``
  * filters 
    * `` slide in slides | filter:q | orderBy:title | limit:3``
  * ...

--
#So Angular let you write less code
* But what's more important, 
  * less "low value" code 
  * more readable code

* So you can concentrate on your application idea

* AngularJS is opinionated
  * but it will let you follow a different way in case you really need it
--
#So, back to our mobile apps...
* Speed can mean many things
* UX speed vs processing speed
  * databinding lets you easily display data progressively
  * client-side rich models and filtering let you respond quickly to user input
* network delays vs app response times

##But the challenge isn't just being performant

* Being an _awesome_ mobile app 
  * handle gestures
  * respect user expectations (e.g. swipeable cards )
  * manage navigation
  * manage app state and off-line availability
  
--
#Performance Tips
* reduce DOM manipulation
  * use simple markup 
  * move all styling to CSS
* no JS Animation, use CSS3 
  * HW accelerated transitions
* optimize your databindings
  * [https://www.exratione.com/2013/12/considering-speed-and-slowness-in-angularjs/](https://www.exratione.com/2013/12/considering-speed-and-slowness-in-angularjs/)
* bind once and targeted bindings
  * [https://github.com/Pasvaz/bindonce](https://github.com/Pasvaz/bindonce)
--
#Performance Tuning
* Tune with AngularJS Batarang
  * [https://github.com/angular/angularjs-batarang](https://github.com/angular/angularjs-batarang)
  
<img src="http://localhost:8000/images/chrome-batarang.png" class="centerImage"/>

-- 
#Bandwidth optimizations
* The biggest cost is opening a connection, not transferring files
  * use HTTP Keep-alive
  * enable GZip compression
  * [https://developers.google.com/speed/pagespeed/module](https://developers.google.com/speed/pagespeed/module)

* Local manipulation of data greatly reduces network traffic
  * Local DB and sync
--
#Support Touch and Gestures
* Module _ng-touch_
  * fastclick: eliminate the 300ms delay
  * easily manage swipes
  ```
  <div ng-swipe-left="next()" >
  ```
* for advanced cases: 
  * ionic-gestures
 * hammer.js

--
#Storing state
* On the device
  * Session storage
  * Local storage
  * lawnchair
  * PouchDB [http://pouchdb.com/](http://pouchdb.com/)

* In the cloud
  * Mongolab [http://mongolab.com](http://mongolab.com)
  * Firebase with AngularFire [https://www.firebase.com](https://www.firebase.com)
  * BaasBox [http://www.baasbox.com](http://www.baasbox.com)
--
#Managing sensors
* HTML5 standard APIs support only some sensors
  * location (very good support)
  * orientation
  * acceleration
  
* Additional sensors require the PhoneGap APIs

* need to wrap all callbacks with 
  * ``$apply()``
  * or better, a dedicated service
* to notify Angular of changes occurred out of its lifecycle
  
--
# How to develop for mobile?
* Chrome remote debugging and screencast
  * [https://developers.google.com/chrome-developer-tools/docs/remote-debugging](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)
```
chrome://inspect/#devices
```
* Emulate device resolutions, DPIs, sensors: 
  * Chrome emulator
  * Ripple Emulator [http://emulate.phonegap.com](http://emulate.phonegap.com)

--
#Issues
* Development-time structure
  * multiple files
  * component/dependency managers (bower...)
* Compile-time structure
  * limited number of files
  * concatenation
  * minification
* Use a toolchain
  * Marcello Teodori's talk on JS Power Tools
--
#Testable mobile apps?
* first phase: prototyping on a Desktop browser
* second phase: unit testing
  * way easier with AngularJS
* third phase: on device testing

* Chrome on-device debugging
-- 
#Packaging apps for markets
* Phonegap
  * [http://phonegap.com/](http://phonegap.com/)
  * [https://cordova.apache.org/](https://cordova.apache.org/)
* Phonegap Build
  * [http://build.phonegap.com](http://build.phonegap.com)
* Chrome Apps for Mobile
  * [http://blog.chromium.org/2014/01/run-chrome-apps-on-mobile-using-apache.html  ](http://blog.chromium.org/2014/01/run-chrome-apps-on-mobile-using-apache.html  )
--
# Development tips
* Cordova Browser
  * you install it once
  * and open your code on your web server
  * continuous refresh without reinstalling the app

--
# What about the UI? 
* or better the UX - _User Experience_?
* Comparing mobile web frameworks
  * [http://moduscreate.com/5-best-mobile-web-app-frameworks-ionic-angulalrjs/](http://moduscreate.com/5-best-mobile-web-app-frameworks-ionic-angulalrjs/)

* JQuery Mobile
  * widgets-only
  * DOM-heavvy
  * Angular integration is not simple (different lifecycles)
  * at most, JQ Mobile for CSS and Angular for navigation and logic
--
#Enter Ionic Framework 
* AngularJS-based, Open Source
  * performance obsessed
  * mobile-looking
  * extensible

<img src="http://localhost:8000/images/ionic.png" class="centerImage"/>

* [http://ionicframework.com/](http://ionicframework.com/)
* [http://ionicframework.com/getting-started/](http://ionicframework.com/getting-started/)
* [http://ionicframework.com/docs/guide/](http://ionicframework.com/docs/guide/)
--
#What's inside?
* Ionic CSS
* Ionic Icons
* Ionic Directives

* and support Tooling
--
#Ionic CSS
* elegant yet very lightweight

<img src="http://localhost:8000/images/ionic-css.png" class="sideImage"/>

```
<div class="list">
  <div class="item item-divider">
    Candy Bars
  </div>
  <a class="item" href="#">
    Butterfinger
  </a>
</div>
```
* [http://ionicframework.com/docs/](http://ionicframework.com/docs/)

* 3D animations, HW accelerated
* sass-based for custom theming
* 500 free icons (ionicons)

--
#Ionic Directives
* mobile navigation and interactions 
```
<ion-list>
  <ion-item ng-repeat="item in items"
    item="item"
    can-swipe="true"
    option-buttons="itemButtons">
  </ion-item>
</ion-list>
```
<img src="http://localhost:8000/images/ionic-list.png" class="sideImage"/>

* services for
  * gestures
  * navigation
* [http://ionicframework.com/docs/api](http://ionicframework.com/docs/api)
--
#Let's play around... (with Live Reload)

<img src="http://localhost:8000/images/ionic-plnkr.png" class="centerImage" />

* [http://plnkr.co/edit/Mcw6F2BQP3RbB8ZhBYRl?p=preview](http://plnkr.co/edit/Mcw6F2BQP3RbB8ZhBYRl?p=preview)


--
#Navigation 
* based on UI-Router 
* [http://angular-ui.github.io/ui-router](http://angular-ui.github.io/ui-router)
  * sub-views (e.g. Tabs)
  * per-view navigation history

* UI Gallery 
  * [http://ionicframework.com/present-ionic/slides/#/16 ](http://ionicframework.com/present-ionic/slides/#/16 )

<img src="http://localhost:8000/images/ionic-navigation.png" class="sideImage"/>

--
#Ionic Tooling
* PhoneGap based build chain
```
$ npm -g install ionic
$ ionic start myApp tabs

$ cd myApp
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

--
#The Future
* AngularJS 2.0 will be _Mobile First_
  * performance
  * browser support
  * [http://blog.angularjs.org/2014/03/angular-20.html](http://blog.angularjs.org/2014/03/angular-20.html)
  
* Web Components on Mobile
* EcmaScript 6 - ``Object.observe()`` -> ultrafast binding



--
#Lessons learnt
* AngularJS can be viable on mobile
  * interactivity in plain HTML5 views
  
* AngularJS changes your way of working (for the better!)
  * let you free of concentrating on your ideas
  * makes for a way faster development cycle
  * makes for a way faster interaction with customer cycle
  * essential for Continuous Delivery!
--
#Lessons learnt
* Like all the magic wands, you could end up like Mikey Mouse as the apprentice sorcerer
* Getting started is very easy
* But to go further you need to learn the key concepts
  * scopes
  * dependency injection
  * directives
  * promises

* So get your training!
  * Codemotion training (june 2014)
    * [http://training.codemotion.it/](http://training.codemotion.it/)

* __NEW! Advanced AngularJS course__ 
  * coming in July-September 2014

--
#To learn more
* Books
  * [http://www.ng-book.com/](http://www.ng-book.com/) - __Recommended!__
  * AngularJS and .NET [http://henriquat.re](http://henriquat.re)

* Online tutorials and video trainings:
  * [http://www.yearofmoo.com/](http://www.yearofmoo.com/)
  * [http://egghead.io](http://egghead.io)

* All links and reference from my Codemotion Workshop
  * [https://github.com/carlobonamico/angularjs-quickstart](https://github.com/carlobonamico/angularjs-quickstart)
  * [https://github.com/carlobonamico/angularjs-quickstart/blob/master/references.md](https://github.com/carlobonamico/angularjs-quickstart/blob/master/references.md)

* Full lab from my Codemotion Workshop
  * [https://github.com/carlobonamico/angularjs-quickstart](https://github.com/carlobonamico/angularjs-quickstart)
--
#Even more
* Optimizing AngularJS for mobile
  * [http://blog.revolunet.com/angular-for-mobile](http://blog.revolunet.com/angular-for-mobile)
  * [http://www.ng-newsletter.com/posts/angular-on-mobile.html](http://www.ng-newsletter.com/posts/angular-on-mobile.html)
  * [https://www.youtube.com/watch?v=xOAG7Ab_Oz0](https://www.youtube.com/watch?v=xOAG7Ab_Oz0)
  * [http://www.bennadel.com/blog/2492-What-A-Select-watch-Teaches-Me-About-ngModel-And-AngularJS.htm](http://www.bennadel.com/blog/2492-What-A-Select-watch-Teaches-Me-About-ngModel-And-AngularJS.htm)
* Web Components
  * [http://mozilla.github.io/brick/docs.html](http://mozilla.github.io/brick/docs.html)
  * [http://www.polymer-project.org/](http://www.polymer-project.org/)
--
#Thank you!
* Explore these slides
  * [https://github.com/carlobonamico/mobile-html5-websites-and-hybrid-apps-with-angularjs](https://github.com/carlobonamico/mobile-html5-websites-and-hybrid-apps-with-angularjs)
  * [https://github.com/carlobonamico/angularjs-future-web-development-slides](https://github.com/carlobonamico/angularjs-future-web-development-slides)
* My presentations
  * [http://slideshare.net/carlo.bonamico](http://slideshare.net/carlo.bonamico)
* Follow me at [@carlobonamico](https://twitter.com/carlobonamico) / [@nis_srl](https://twitter.com/nis_srl)
  * will publish these slides in a few days
* Attend my Codemotion trainings
  * [http://training.codemotion.it/](http://training.codemotion.it/)
