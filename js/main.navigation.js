/*
 * main.navigation.js
 * Navigation module for simmonsdev.space
*/

main.navigation = (function(){
    // ------------------- BEGIN MODULE SCOPE VARIABLES -------------------
    var
        configMap = {
            anchor_schema_map : {
                developer: { isOpen: false},
                name: { isOpen: false},
                about: { isOpen: false},
                resume: { isOpen: false},
                projects: { isOpen: false}
            },

            navItems : ['name','about','resume','projects'],

            expandIndicator: String()
            +'<div>+</div>',

            main_html: String()
            +'<div class="main-developer-root"><p class="link">developer = {</p></div>'
                +'<div class="main-developer-root" id="main-nav-indicator"><p class="link" id="expandIndicator">+</p></div>'
                +'<div id="main-nav-container" style="display:none;">'
                    +'<div class="main-developer-name"><p class="link">jacobSimmons : {</p></div>'
                        +'<div class="main-developer-name"><p class="link">}</p></div>'
                    +'<div class="main-developer-about"><p class="link">about : {</p></div>'
                        +'<div class="main-developer-about"><p class="link">}</p></div>'
                    +'<div class="main-developer-resume"><p class="link">resume : {</p></div>'
                        +'<div class="main-developer-resume"><p class="link">}</p></div>'
                    +'<div class="main-developer-projects"><p class="link">projects : {</p></div>'
                        +'<div class="main-developer-projects"><p class="link">}</p></div>'
                +'</div>'
            +'<div class="main-developer-root link"><p>};</p></div>',

            name_html: String()
            +'<div class="pageContent" >'
            +'<img class="profileImage" src="/images/profile.jpg" /></br></br>'
            +   '<p>Email: <a href="mailto:jacob.simmons523@gmail.com" target="_top">jacob.simmons523@gmail.com</a></p>'
            +   '<p>Facebook: <a href="https://www.facebook.com/jacob.t.simmons">jacob.t.simmons</a></p>'
            +   '<p>Instagram: <a href="https://www.instagram.com/jacob.t.simmons/">jacob.t.simmons</a></p>'
            +   '<p>Google+: <a href="https://plus.google.com/102017456169792241091/posts">Jacob Simmons</a></p>'
            +'</div>',
            about_html: String()
            +'<div class="pageContent">'
            +   '<p>I am currently a Business Systems Analyst with Flint Hills Resources. I started working for FHR in May 2012 as a Software Developer.</p>'
            +   '<p>There are many hobbies I enjoy doing outside of work. This includes but is not limited to:</p>'
            +   '<ul>'
            +       '<li>Anything Programming related</li>'
            +       '<li>Woodworking</li>'
            +       '<li>Brazilian Jiu Jitsu with <a href="http://www.foxfitnessbjj.com/index.html">Fox Fintess</a></li>'
            +       '<li>PC Gaming</li>'
            +       '<li>Riding Motorcycles</li>'
            +       '<li>Playing Soccer</li>'
            +       '<li>Lifting Weights</li>'
            +   '</ul>'
            +'</div>',
            resume_html: String()
            +'<div class="pageContent"><p></p>'
            +'<div id="pdfResume"></div>'
            +'</div>',
            
            projects_html: String()
            +'<div class="pageContent">'
            +'<p>These are projects I\'m currently or would like to be working on:</p>'
                +'</br>'
            +   '<ul>'
            +       '<li>This site: I\'d like to smooth out the functionality of this site and optimize what is currently written. Making the site completely mobile friendly and state driven are currently versions I\'m looking into. I\'ll continue to use this site as a playground for web development. If it is in disarray, this could be why.</li>'
            +'</br>'
            +       '<li>Budgeting Application: A lot of my experimentation with programming can be related to issues or problems I see. One of those is tracking budgets and account transactions. I think there is a disconnect between people and their money due to most transactions occuring through a piece of plastic or digitally. Being able to restore a tangible feeling with making purchases and being able to track where you are spending money is a problem that has always interested me. I\'d like to create something that would reestablish this connection and allows for easy monitoring of your accounts and spending.</li>'
            +'</br>'
            +       '<li>Continue to learn new JavaScript frameworks and libraries. There are so many interesting JS tools and frameworks available. If I could get to the point of literally being able to speak in JS, I would be cool with that.</li>'
            +   '</ul>'
            +'</div>'
           
        },

        stateMap = {
            $conatiner: null,
            anchor_map: {}
        },
        jqueryMap = {},

        initializeNav, setJqueryMap, configureResumePDF, initModule,
        bindNavItems, bindLinks;

    // ------------------- END MODULE SCOPE VARIABLES -------------------

    // ------------------- BEGIN DOM METHODS -------------------

    setJqueryMap = function(){
        var $container = stateMap.$conatiner;

        jqueryMap = {
            $container: $container,
            $developer: $container.find('.main-developer-root'),
            $name: $container.find('.main-developer-name'),
            $about: $container.find('.main-developer-about'),
            $resume: $container.find('.main-developer-resume'),
            $projects: $container.find('.main-developer-projects'),
            $devDiv: $container.find('#main-nav-container'),
            $devDivInd: $container.find('#main-nav-indicator')
        };
    };

    bindRootNav = function(){

        jqueryMap.$developer.click(function(event){
            if(configMap.anchor_schema_map.developer.isOpen)
            {
                jqueryMap.$devDiv.hide('slow');
                jqueryMap.$devDivInd.show('slow');
                configMap.anchor_schema_map.developer.isOpen = false;
            }
            else
            {
                jqueryMap.$devDiv.show('slow');
                jqueryMap.$devDivInd.hide('slow');
                configMap.anchor_schema_map.developer.isOpen = true;
            }
            event.stopPropagation();
        });
    };

    bindNavItems = function(array){
        for(var i = 0; i < array.length; i++){
            bindLinks(array[i]);
        }
    };

    bindLinks = function(item){
        var itemClass = '.main-developer-' + item;
        var $item = jqueryMap.$container.find(itemClass);
        $item.click(function(event){
            $item.find('.pageContent').first().toggle('slow');
            event.stopPropagation;
        })
        
    };
    // ------------------- END DOM METHODS -------------------

    // ------------------- BEGIN UTILITY METHODS -------------------

    addPageContent = function() {
        // Rework to dynamically add/remove content
        jqueryMap.$name.first().append(configMap.name_html);
        jqueryMap.$about.first().append(configMap.about_html);
        jqueryMap.$resume.first().append(configMap.resume_html);
        jqueryMap.$projects.first().append(configMap.projects_html);
        jqueryMap.$container.find('#expandIndicator').effect('pulsate',{times:20}, 12000);
    };

    configureResumePDF = function(){
        var options = {
            fallbackLink: "<p>Download Resume <a href='[url]'>Here</a></p>",
        };
        PDFObject.embed("/pdf/Jacob_Simmons_Resume.pdf", '#pdfResume',
        options, {pdfOpenParams:{zoom:100,width:"50%"}});
    };

    // ------------------- END UTILITY METHODS -------------------

    initModule = function($container){
        stateMap.$conatiner = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
        bindRootNav();
        bindNavItems(configMap.navItems);
        addPageContent();
        configureResumePDF();
    };

    return { initModule: initModule };
}());