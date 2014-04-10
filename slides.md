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
# Why AngularJS
AngularJS lets you use today the features of next-generation web standards, making front-end development more productive and fun. What's better, it provides its "magic" tools such as databinding, dependency injection, modularity, composable and event-driven architecture to both web AND mobile apps. This "code-based" interactive talk will share some lessons learned in the development of mobile sites and apps with Angular, from how to structure applications, tune bandwidth and performance, interact with mobile-specific elements such as touch, sensors, and native-looking UX with Ionic Framework.


--
#Yes but you can't do that in a web based mobile app/site
* Sure? people used to think it was impossible to get
  * interactive email clients (GMail)
  
The web is (and will always be) more powerful than people think!
  * this also applies to the mobile web platform
  * mobile access which will overcome the "desktop" web in terms of traffic next year
--
#Web vs Native
* I do not want to join the fight :-)
  * but the gap will only become closer with time
  
* there are many use cases for web-based sites
  * 
* and apps
  * maximizing platform support (iOS, Android, Windows Phone... )
  * to use Angular magic (filters, templating)
--
#But isn't JS on Mobile so slow?
--
#Speed can mean many things
* UX speed vs processing speed

* But the challenge isn't just being performant
  * handle gestures
  * respect user expectations (e.g. swipeable cards )
  * manage navigation
  * 
--
#Performance
* reduce DOM manipulation
* no JS Animation, use CSS3 -> hw accelerated
* maneageable number of binding
* bind once and targeted bindings


Use the Batarang for tuning
--
#Navigation
* limits of ng-route
  * single subview
--
#Managing sensors
* HTML5 standard APIs
  * location
  * orientation
  * acceleration
* more with PhoneGap APIs

-- 
#Tools
* Phonegap
* Phonegap Build

--
#Support Touch and Gestures
* ng-touch
  * ng-swipe
  * eliminate fastclick
* ionic-gestures
* hammer.js for corner cases

--
#Storing state
* Local storage
  * 
  * 
* PouchDB
* AngularFire
* BaasBox
--
use pop for prototyping

--
#Camera based

--
#Chrome remote debugging
Chrome screencast
*Chrome emulator


--
#The past
* JQuery Mobile
* Angular integration 
  * different lifecycles
  * at most, JQ Mobile for CSS and Angular for navigation and logic
--
#The present (and near future)
* Ionic Framework 
  * performance obsessed
  * mobile-looking
  * extensible

Open Source

http://ionicframework.com/
--
#Ionic CSS
* elegant yet very lightweight
* 
```

```
* 3D animations, HW accelerated
* sass-based
  * custom theming
  
* 500 free icons (ionicons)

--
#Ionic Directives
* mobile interactions 
* services for
  * 
  
--
#Popups and modals

--
#

--

--
#Navigation 
* based on UI-Router
  * sub-views (e.g. Tabs)
  * per-view navigation history
  * 

--
#

--
#The Future
* AngularJS 2.0 will be _Mobile First_
  * performance
  * browser support

* Web Components on Mobile
* EcmaScript 6 - Object.observe() -> ultrafast binding

-- 
#Angular gives you structure
* Dependency Injection
 * split component definition from component wiring
 
* Module composition e.g.
  * common modules
  * mobile-only components
  * desktop-onnly components

-- 
#Bandwidth optimizations
* The biggest cost is opening a connection, not transferring files
* HTTP Keep-alive
* GZip compression

* Local manipulation
* Local DB and sync?

--
Firebase

-- 

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
  * use <<>> for supporting minification in Angular
--
#Testable mobile apps?
* first phase: prototyping on a Desktop browser
* second phase: unit testing
* third phase: on device testing

* Chrome on-device debugging

--
#OK, wo I will go for HTML5
##to implement my next great service/project

                              ... a few months go by...
                              
##WTF!! I did not think web development was could be that messy!

* Spaghetti code tastes better in a dynamic language such as JS
* I spent most of my time juggling the DOM
* I cannot integrate the Form widgets I love with the charts library I love
* Where is modularization? and encapsulation?
  * "everything" can fiddle with "everything"...  
--

--
#Fast-forward to 2015...
## Definitely a no-brainer: 
<br/>
##go for Web Components + event-driven MVC

* [http://mozilla.github.io/brick/docs.html](http://mozilla.github.io/brick/docs.html)
* [http://www.polymer-project.org/](http://www.polymer-project.org/)

--
<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/William_Ford_Gibson.jpg/144px-William_Ford_Gibson.jpg" style="width: 200px;"/>
--
#Enter AngularJS
##Use tomorrow web technologies today
<br/>
<img src="http://localhost:8000/slides3/angularjs.png" style="width: 200px;"/>
##[http://www.angularjs.org](http://www.angularjs.org)
<br/>
###And almost transparently upgrade as soon as they are available
[http://www.2ality.com/2013/05/web-components-angular-ember.html](http://www.2ality.com/2013/05/web-components-angular-ember.html)

--
#Robust, productive (& fun!) Web dev
##Open Source _toolset_ 
###backed by Google
###great, active and open community
<br/>
###used from startups to Microsoft, Oracle & Google itself
<br/>
##Extremely productive, robust, testable, and scalable
###from mockups to small apps to large enterprise apps
--
#Strong points
* Angular follows and ehnances the _HTML way_ of doing things
  * declarative
  * interoperable
* Event-driven Model-View-Controller
  * plain JS models
* Data binding
##View is as decoupled as possibile from logic
##Great for effective Designer-Developer workflows!
--
Thanks [http://plnkr.co](http://plnkr.co) !
--
#
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
#A service to load the model from markdown
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
        }
    }
})
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
#Integration with non-angular code
* $apply utility function to notify angular of changes
* angular.element( ...).scope()
  * to access controller methods and scope outside angular
```
document.onkeyup = KeyPressed;

function KeyPressed(e) {
    var key = ( window.event ) ? event.keyCode : e.keyCode;

    var controllerElement = angular.element(document.getElementById("slidesContainer"));
    var scope = controllerElement.scope()

    scope.$apply(function () {
        switch (key) {
            case 39:
            {
                scope.next();
                break;
            }
    //...
```
--
#Slide sources in markdown format
* ``slides.md``
```txt
#It's an AngularJS app I wrote in a few hours
<br/>
## Press F12 to be sure!
```

--
#What's inside - details
* A custom directive
* A few filters
--
#AngularJS magic
## Any sufficiently advanced technology is indistinguishable from magic.
###_Arthur C. Clarcke_

```
<li ng-repeat="slide in slides | filter:q">...</li>
```
--
#AngularJS magic is made of
* Dependency Injection
  * makes for decoupling, testability, and enriching of your code and tags

```
  function SlidesCtrl($scope, SlidesService)
  {
    SlidesService.loadFromMarkdown('slides.md');
  }
```
--
#AngularJS magic is made of
* Transparent navigation and history with ``ng-view`` and ``ng-route``
* Databinding
  * a few little tricks (Dirty checking) 
  * which will disappear when the future (ECMAScript6 object.observe) arrives
--
#The power of composition
* Microkernel architecture
  * core: HTML compiler, Dependency Injection, module system
  * everything else is a directive, service or module
* Composition of
  * modules 
    * ``module('slides',['slides.markdown'])``
  * directives 
    * `` <h1 ng-show='enableTitle' ng-class='titleClass'>..</h1>``
  * filters 
    * `` slide in slides | filter:q | orderBy:title | limit:3``
  * ...
--
#Take advantage of AngularJS capabilities
* Integration with other frameworks
  * plain JS for keyboard handling
* AngularJS is opinionated
  * but it will let you follow a different way in case you really really need it
--
#Testing
* Unit Testing
  * mocking
  * http mocking
* End-To-End testing
  * scenarios 
* Jasmine
--
#Weak points
Even angular is not perfect... yet!

* Dynamic page rendering, so SEO is hard
  * temporary solutions with PhantomJS on the server side
  * a few cloud-based services
  * personally think Google is working on fixing that
* Tooling is good but can improve
* Support for lesser browser
--
#Lessons learnt
--
#Lessons learnt
* Getting started is very easy
* But to go further you need to learn the key concepts
  * promises
  * dependency injection
  * directives
  * scopes
--
#Lessons learnt
* Like all the magic wands, you could end up like Mikey Mouse as the apprentice sorcerer

* So get your training!
  * Online
  * Codemotion training (4-5 february and 4-5 march 2014)
    * [http://training.codemotion.it/](http://training.codemotion.it/)
  * NEW! Advanced course! coming in July-September 2014

--
#Lessons learnt
* AngularJS makes for great mockups
  * interactivity in plain HTML views
* AngularJS changes your way of working (for the better!)
  * let you free of concentrating on your ideas
  * makes for a way faster development cycle
  * makes for a way faster interaction with customer cycle
  * essential for Continuous Delivery!

--
#To learn more
* Online tutorials and video trainings:
  * [http://www.yearofmoo.com/](http://www.yearofmoo.com/)
  * [http://egghead.io](http://egghead.io)
* All links and reference from my Codemotion Workshop
  * [https://github.com/carlobonamico/angularjs-quickstart](https://github.com/carlobonamico/angularjs-quickstart)
  * [https://github.com/carlobonamico/angularjs-quickstart/blob/master/references.md](https://github.com/carlobonamico/angularjs-quickstart/blob/master/references.md)
* Full lab from my Codemotion Workshop
  * [https://github.com/carlobonamico/angularjs-quickstart](https://github.com/carlobonamico/angularjs-quickstart)
--
#
* attend Marcello Teodori talk on JS Power Tools

--
#Books
* [http://www.ng-book.com/](http://www.ng-book.com/)
* AngularJS and .NET [http://henriquat.re](http://henriquat.re)
--
#My current plans
* writing about AngularJS and security
--
#Thank you!
* Explore these slides
  * [https://github.com/carlobonamico/angularjs-future-web-development-slides](https://github.com/carlobonamico/angularjs-future-web-development-slides)
* My presentations
  * [http://slideshare.net/carlo.bonamico](http://slideshare.net/carlo.bonamico)
* Follow me at [@carlobonamico](https://twitter.com/carlobonamico) / [@nis_srl](https://twitter.com/nis_srl)
  * will publish these slides in a few days
* Attend my Codemotion trainings
  * [http://training.codemotion.it/](http://training.codemotion.it/)
