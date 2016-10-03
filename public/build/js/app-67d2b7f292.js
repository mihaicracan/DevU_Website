var Projects = {
    projects: [],

    init: function() {
        this.load('feedstamp-web');
        this.load('feedstamp-mobile');
        this.load('feedstamp-device');
        this.load('brandbassador-web');
        this.load('brandbassador-mobile');
        this.load('piecekeeper-web');
        this.load('piecekeeper-mobile');
        this.load('secondcup-ui');
        this.load('online-tennis');
    },

    get: function(project) {
        if (project in this.projects) {
            return this.projects[project];
        }
    },

    loaded: function(project) {
        return (project in this.projects);
    },

    load: function(project) {
        if (!(project in this.projects)) {
            $.ajax({
                type: "GET",
                url: "./api/project?project=" + project,
                dataType: "json",
                success: function(response) {
                    Projects.projects[project] = [{
                        html: response.project
                    }];
                }
            });
        }
    }
};

Projects.init();
var APP = {

    projects: Projects,
    currentSkill: 0,
    blockSkillsAnimation: false,

    init: function(){
        this.cacheDOM();

        this.initVideos();
        this.bindEvents();

        // Animate menu
        this.animateHeader('display');
        this.animateHeader();
    },

    cacheDOM: function(){
        this.$window   = $(window);
        this.$body     = $("body");
        this.$masthead = $("#masthead");

        this.$videos = $("iframe[src*='//www.youtube.com'], iframe[src*='vimeo.com']");

        this.$more_btn = $("#more");

        this.gallery_wrapper  = document.querySelectorAll('.pswp')[0];
        this.$albums          = $(".section.portofolio").find(".album");

        this.$menu_wrapper         = $(".masthead-nav");
        this.$menu_items           = this.$menu_wrapper.find("li");
        this.$menu_item_skills     = this.$menu_wrapper.find(".skills");
        this.$menu_item_projects   = this.$menu_wrapper.find(".projects");
        this.$menu_item_blog       = this.$menu_wrapper.find(".blog");
        this.$menu_item_contact    = this.$menu_wrapper.find(".contact");

        this.modal = {};
        this.modal.$box   = $("#myModal");
        this.modal.$title = this.modal.$box.find(".modal-title");
        this.modal.$body  = this.modal.$box.find(".modal-body");

        this.$skills_wrapper     = $("#skills-wrapper");
        this.$projects_wrapper   = $("#projects-wrapper");
        this.$project_wrapper    = $("#project-wrapper");
        this.$blog_wrapper       = $("#blog-wrapper");
        this.$contact_wrapper    = $("#contact-wrapper");

        this.$project_content = this.$project_wrapper.find(".project-content");
        this.$project_close   = this.$project_wrapper.find(".close");
        this.skills = {};
        this.skills.chart = {};
        this.skills.chart.$wrapper = $("#skillsChart");
        this.skills.chart.$skills  = this.skills.chart.$wrapper.find(".skill");
        this.skills.chart.$bars    = this.skills.chart.$wrapper.find(".bar");
        this.skills.chart.$labels  = this.skills.chart.$wrapper.find(".chartLabel");
        this.skills.$details = this.$skills_wrapper.find(".details p");

        this.$projects = this.$projects_wrapper.find(".project");

        this.contact = {};
        this.contact.$name    = $("#inputName");
        this.contact.$email   = $("#inputEmail");
        this.contact.$message = $("#inputMessage");
        this.contact.$btn     = $("#contactBtn");
    },

    bindEvents: function(){
        this.$window.scroll(this.animateHeader.bind(this));
        this.$window.resize(function() {
            APP.resizeVideos();
        }).resize();

        this.$more_btn.click(this.slideToContent);

        this.$menu_items.click(this.slideToContent);
        this.$menu_items.click(this.closeProject);
        this.contact.$btn.click(this.sendMessage.bind(this));

        this.$projects.click(function(e) {
            APP.openProject(e);
        });
        this.$project_close.click(function() {
            APP.closeProject();
        });

        this.skills.chart.$skills.click(function() {
            var index = $(this).data('index');
            APP.displaySkillDetails(index);

            APP.blockSkillsAnimation = true;
        });
    },

    animateHeader: function(step){

        if (step == 'display') {
            APP.$masthead.removeClass('animate-hide');

            APP.$menu_items.each(function(i) {
                var item = this;
                setTimeout(function() {
                    $(item).removeClass('animate-hide');
                }, (i + 1) * 150 + 250);
            });
        } else {
            var top = this.$window.scrollTop();

            // change header style
            // if (top < (this.$window.height() - this.$masthead.height())) {
                // this.$masthead.removeClass("fixed");
            // } else {
                // this.$masthead.addClass("fixed");
            // }

            // update menu items
            if (top < this.$skills_wrapper.offset().top - 500) {
                if (this.$menu_item_skills.hasClass("current")) {
                    APP.$menu_items.removeClass("current");
                }
            }   
            else if (top > this.$skills_wrapper.offset().top - 500 && top < this.$projects_wrapper.offset().top - 500) {
                if (!this.$menu_item_skills.hasClass("current")) {
                    APP.$menu_items.removeClass("current");
                    this.$menu_item_skills.addClass("current");

                    APP.animateSlide('skills', function(animated) {
                        if (!animated) {
                            APP.animateChart();
                        }
                    });
                }
            }
            else if (top > this.$projects_wrapper.offset().top - 500 && top < this.$blog_wrapper.offset().top - 500) {
                if (!this.$menu_item_projects.hasClass("current")) {
                    APP.$menu_items.removeClass("current");
                    this.$menu_item_projects.addClass("current");

                    APP.animateSlide('projects');
                }
            }
            else if (top > this.$blog_wrapper.offset().top - 500 && top < this.$contact_wrapper.offset().top - 500) {
                if (!this.$menu_item_blog.hasClass("current")) {
                    APP.$menu_items.removeClass("current");
                    this.$menu_item_blog.addClass("current");

                    APP.animateSlide('blog');
                }
            }
            else if (top > this.$contact_wrapper.offset().top - 500) {
                if (!this.$menu_item_contact.hasClass("current")) {
                    APP.$menu_items.removeClass("current");
                    this.$menu_item_contact.addClass("current");

                    APP.animateSlide('contact');
                }
            }
        }
    },

    animateSlide: function(slide, cb) {
        var $title    = APP["$" + slide + "_wrapper"].find("h2");
        var $subtitle = APP["$" + slide + "_wrapper"].find("h3");
        var $content  = APP["$" + slide + "_wrapper"].find(".content");

        var step = 150;
        var animated = $title.hasClass('animate-hide') ? false : true;

        $title.removeClass('animate-hide');

        setTimeout(function() {
            $subtitle.removeClass('animate-hide');
        }, step * 1);

        setTimeout(function() {
            $content.removeClass('animate-hide');
        }, step * 2);

        setTimeout(function() {
            if (typeof cb === 'function') {
                cb(animated);
            }
        }, step * 3);
    },

    animateChart: function() {
        APP.skills.chart.$bars.each(function() {
            var value = $(this).data('value');

            $(this).velocity({
                height: value + '%'
            }, {
                duration: 1000,
                easing: 'easeOutQuart',
            });
        });

        APP.skills.chart.$labels.velocity({
            opacity: 1
        }, {
            duration: 500,
            delay: 750,
            complete: function() {
                APP.displaySkillDetails(0);
                APP.animateSkills();
            }
        });
    },

    animateSkills: function() {
        setInterval(function() {
            if (!APP.blockSkillsAnimation) {
                APP.currentSkill++;

                if (APP.currentSkill >= APP.skills.chart.$skills.length) {
                    APP.currentSkill = 0;
                }

                APP.displaySkillDetails(APP.currentSkill);
            }
        }, 4000);
    },

    displaySkillDetails: function(index) {
        // mark skill with active class
        APP.skills.chart.$skills.removeClass('active');
        APP.skills.chart.$skills.addClass('inactive');

        $(APP.skills.chart.$skills[index]).removeClass('inactive');
        $(APP.skills.chart.$skills[index]).addClass('active');

        APP.skills.chart.$bars.each(function(i) {
            var style = {};
            if (i == index) {
                style = {
                    backgroundColor: '#2FA385'
                };
            } else {
                style = {
                    backgroundColor: '#394554'
                };
            }

            $(this).velocity(style, 500);
        });

        APP.skills.$details.velocity({
            opacity: 0
        }, {
            duration: 250,
            complete: function(el) {
                $(el).css('display', 'none');

                $(el[index]).css('display', 'block');
                $(el[index]).velocity({
                    opacity: 1
                }, 250);
            }
        });
    },

    openProject: function(e) {
        var project  = $(e.currentTarget).data("project");
        
        if (APP.projects.loaded(project)) {
            var content = APP.projects.get(project);

            APP.$body.addClass('modal-open');

            APP.$project_content.html(content[0].html);
            APP.$project_wrapper.css('display', 'block');
            APP.$project_wrapper.velocity({
                opacity: 1
            }, 250);

            APP.initVideos();
            APP.resizeVideos();
        }
    },

    closeProject: function() {
        APP.$project_content.html("");
        APP.$project_wrapper.velocity({
            opacity: 0
        }, 250, function() {
            APP.$project_wrapper.css('display', 'none');
            APP.$body.removeClass('modal-open');
        });
    },

    slideToContent: function(e){
        e.preventDefault();
        var to = $(this).data("to");
        var $el = APP["$"+to+"_wrapper"];

        APP.$menu_items.removeClass("active");
        $(this).addClass("active");

        $("html, body").animate({
            scrollTop: $el.offset().top
        }, 1000);
    },

    displayModal: function(options){
        this.modal.$title.html(options.title);
        this.modal.$body.html(options.body);

        this.modal.$box.modal('show');
    },

    sendMessage: function(){
        if (this.validateMessage()) {
            APP.displayModal({
                title: "Message Sent",
                body: "Thank you!<br>I will check your message as soon as possible."
            });

            APP.contact.$name.val("");
            APP.contact.$email.val("");
            APP.contact.$message.val("");

            var data = {
                name: this.contact.$name.val(),
                email: this.contact.$email.val(),
                message: this.contact.$message.val()
            };

            $.ajax({
                type: "POST",
                url: "./api/contact",
                data: data,
                dataType: "json",
                success: function(response) {
                    
                }
            });
        }
    },

    validateMessage: function(){
        var valid = true;

        if (this.contact.$name.val().length == 0) {
            valid = false;
            this.contact.$name.addClass("error");
        } else {
            this.contact.$name.removeClass("error");
        }

        if (this.contact.$email.val().length == 0) {
            valid = false;
            this.contact.$email.addClass("error");
        } else {
            this.contact.$email.removeClass("error");
        }

        if (this.contact.$message.val().length == 0) {
            valid = false;
            this.contact.$message.addClass("error");
        } else {
            this.contact.$message.removeClass("error");
        }

        return valid;
    },

    initVideos: function() {
        APP.$videos = $("iframe[src*='//www.youtube.com'], iframe[src*='vimeo.com']");
        console.log(APP.$videos);
        APP.$videos.each(function() {
            $(this).attr('data-aspectRatio', this.height / this.width);
        });
    },

    resizeVideos: function() {
        var newWidth = APP.$project_content.width();

        if (newWidth > 560) newWidth = 560;

        APP.$videos.each(function() {
            var aspectRatio = $(this).attr('data-aspectRatio');

            $(this).width(newWidth);
            $(this).height(newWidth * aspectRatio);
        });
    },

    loadMap: function() {

        if (typeof google == "undefined") {
            return;
        }

        // set your google maps parameters
        var latitude = 44.37021, //If you unable to find latitude and longitude of your address. Please visit http://www.latlong.net/convert-address-to-lat-long.html you can easily generate.
            longitude = 26.1459029,
            map_zoom = 14; /* ZOOM SETTING */

        // google map custom marker icon
        var marker_url = './images/marker.png';
        
        // we define here the style of the map
        var style = [{
            "stylers": [{
                "hue": "#00aaff"
            }, {
                "saturation": -100
            }, {
                "gamma": 2.15
            }, {
                "lightness": 12
            }]
        }];

        // set google map options
        var map_options = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: map_zoom,
            panControl: true,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: style
        };
        
        // inizialize the map
        var map = new google.maps.Map(document.getElementById('map-container'), map_options);
    
        //add a custom marker to the map                
        // var marker = new google.maps.Marker({
        //     position: new google.maps.LatLng(latitude, longitude),
        //     map: map,
        //     visible: true,
        //     icon: marker_url
        // });
    }
}

$(document).ready(function() {
    APP.init();
});
