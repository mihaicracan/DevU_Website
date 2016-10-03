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
        this.$sub_logo = this.$masthead.find(".sub-logo");

        this.$videos = $("iframe[src*='//www.youtube.com'], iframe[src*='vimeo.com']");
        this.$sliders = $("a[data-slide-to]");

        this.$more_btn = $("#more");

        this.gallery_wrapper  = document.querySelectorAll('.pswp')[0];
        this.$albums          = $(".section.portofolio").find(".album");

        this.$menu_wrapper         = $(".masthead-nav");
        this.$menu_items           = this.$menu_wrapper.find("li");
        this.$menu_item_home       = this.$menu_wrapper.find(".home");
        this.$menu_item_services   = this.$menu_wrapper.find(".services");
        this.$menu_item_team       = this.$menu_wrapper.find(".team");
        this.$menu_item_contact    = this.$menu_wrapper.find(".contact");

        this.modal = {};
        this.modal.$box   = $("#myModal");
        this.modal.$title = this.modal.$box.find(".modal-title");
        this.modal.$body  = this.modal.$box.find(".modal-body");

        this.$cover_wrapper     = $("#cover-wrapper");
        this.$web_services_wrapper     = $("#web-services-wrapper");
        this.$mobile_services_wrapper  = $("#mobile-services-wrapper");
        this.$iot_services_wrapper     = $("#iot-services-wrapper");
        this.$team_wrapper       = $("#team-wrapper");
        this.$offer_wrapper      = $("#offer-wrapper");
        this.$contact_wrapper    = $("#contact-wrapper");

        this.$members = this.$team_wrapper.find(".member");

        this.contact = {};
        this.contact.$name    = $("#inputName");
        this.contact.$email   = $("#inputEmail");
        this.contact.$message = $("#inputMessage");
        this.contact.$btn     = $("#contactBtn");
    },

    bindEvents: function(){
        this.$window.scroll(this.animateHeader.bind(this));

        this.$sliders.click(this.slideToContent);

        // Animate team member on hover
        this.$members.hover(function() {
            APP.animateMember(this, "on");
        }, function() {
            APP.animateMember(this, "off");
        });

        this.contact.$btn.click(this.sendMessage.bind(this));
    },

    animateHeader: function(step){
        var top = this.$window.scrollTop();

        // change header style
        if (top < 10) {
            if (this.$masthead.hasClass("light")) {
                this.$masthead.removeClass("light");
                this.$sub_logo.css('opacity', 0);
                APP.$masthead.css('border-bottom', 'none');
            }
        } else {
            if (!this.$masthead.hasClass("light")) {
                this.$masthead.addClass("light");
                setTimeout(function() {
                    APP.$sub_logo.css('opacity', 1);
                    APP.$masthead.css('border-bottom', '2px solid #f5f5f5');
                }, 250);
            }
        }

        // update menu items
        var offset = 400;

        if (top < this.$web_services_wrapper.offset().top - offset) {
            if (!this.$menu_item_home.hasClass("current")) {
                APP.$menu_items.removeClass("current");
                this.$menu_item_home.addClass("current");
            }
        }   
        else if (top > this.$web_services_wrapper.offset().top - offset && top < this.$mobile_services_wrapper.offset().top - offset) {
            if (!this.$menu_item_services.hasClass("current")) {
                APP.$menu_items.removeClass("current");
                this.$menu_item_services.addClass("current");
            }
                
            APP.animateSlide('web_services');
        }
        else if (top > this.$mobile_services_wrapper.offset().top - offset && top < this.$iot_services_wrapper.offset().top - offset) {
            if (!this.$menu_item_services.hasClass("current")) {
                APP.$menu_items.removeClass("current");
                this.$menu_item_services.addClass("current");
            }

            APP.animateSlide('mobile_services');
        }
        else if (top > this.$iot_services_wrapper.offset().top - offset && top < this.$team_wrapper.offset().top - offset) {
            if (!this.$menu_item_services.hasClass("current")) {
                APP.$menu_items.removeClass("current");
                this.$menu_item_services.addClass("current");
            }

            APP.animateSlide('iot_services');
        }
        else if (top > this.$team_wrapper.offset().top - offset && top < this.$offer_wrapper.offset().top - offset) {
            if (!this.$menu_item_team.hasClass("current")) {
                APP.$menu_items.removeClass("current");
                this.$menu_item_team.addClass("current");
            }
            
            APP.animateSlide('team');
        }
        else if (top > this.$offer_wrapper.offset().top - offset && top < this.$contact_wrapper.offset().top - offset) {
            if (!this.$menu_item_team.hasClass("current")) {
                APP.$menu_items.removeClass("current");
                this.$menu_item_team.addClass("current");
            }

            APP.animateSlide('offer');
        }
        else if (top > this.$contact_wrapper.offset().top - offset) {
            if (!this.$menu_item_contact.hasClass("current")) {
                APP.$menu_items.removeClass("current");
                this.$menu_item_contact.addClass("current");

                APP.animateSlide('contact');
            }
        }
    },

    animateSlide: function(slide, cb) {
        var $title     = APP["$" + slide + "_wrapper"].find("h2");
        var $subtitle  = APP["$" + slide + "_wrapper"].find("h3");
        var $picture   = APP["$" + slide + "_wrapper"].find(".picture");
        var $content   = APP["$" + slide + "_wrapper"].find(".content");

        var step   = 150;
        var offset = 0;
        var animated = $title.hasClass('animate-hide') ? false : true;

        if (!animated) {
            setTimeout(function() {
                $title.removeClass('animate-hide');
                $picture.removeClass('animate-hide');
            }, offset);

            setTimeout(function() {
                $subtitle.removeClass('animate-hide');
            }, step * 1 + offset);

            setTimeout(function() {
                $content.removeClass('animate-hide');
            }, step * 2 + offset);

            setTimeout(function() {
                if (typeof cb === 'function') {
                    cb(animated);
                }
            }, step * 3 + offset);
        }
    },

    animateMember: function(member, state) {
        if (state == "on") {
            $(member).velocity({
                scaleX: 1.03,
                scaleY: 1.03
            });
        }
        else if (state == "off") {
            $(member).velocity({
                scaleX: 1,
                scaleY: 1
            });   
        }
    },

    slideToContent: function(e){
        e.preventDefault();
        var to = $(this).data("slide-to");
        var $el = APP["$"+to+"_wrapper"];

        APP.$menu_items.removeClass("active");
        $(this).addClass("active");

        var top = ($el.offset().top < 83) ? 0 : ($el.offset().top - 83);

        $("html, body").animate({
            scrollTop: top
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
                body: "Thank you!<br>We'll check your message as soon as possible."
            });

            var data = {
                name: this.contact.$name.val(),
                email: this.contact.$email.val(),
                message: this.contact.$message.val()
            };

            APP.contact.$name.val("");
            APP.contact.$email.val("");
            APP.contact.$message.val("");

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
        APP.$videos.each(function() {
            $(this).attr('data-aspectRatio', this.height / this.width);
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
