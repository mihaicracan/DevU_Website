<!DOCTYPE html>
<html lang="en">
    <head>
        <title>DevU Technologies - Software Company, Bucharest</title>

        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
        <meta name="description" content="We are the team you need to help your business develop its story. Specialized in web and mobile development, we understand and we use the technologies that are defining the digitial world.">

        <link rel="icon" type="image/x-icon" href="{{ url('images/favicon.png') }}"> 
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,700" rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' rel='stylesheet' type='text/css'>
        <!-- <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'> -->
        <link rel="stylesheet" href="{{ url('css/lib.css?v=1.1.0') }}">
        <link rel="stylesheet" href="{{ url(elixir('css/app.css')) }}">
    </head>

    <body>
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
                <h4 class="modal-title" id="myModalLabel"></h4>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Great</button>
              </div>
            </div>
          </div>
        </div>

        <div id="cover-wrapper" class="cover-wrapper">
            <div class="cover-bg"></div>
            <div id="masthead" class="masthead clearfix top fixed not-animate-hide">
                <div class="inner">
                        <div class="navbar-header masthead-header">
                            <div class="logo">
                                <span class="first"></span>
                                <span class="last"></span>
                            </div>
                            <div class="sub-logo">
                                Technologies
                            </div>
                        </div>
                        <nav>
                            <ul class="nav navbar-nav navbar-right masthead-nav">
                                <li class="home not-animate-hide"><a data-slide-to="cover" href="#">Home</a></li>
                                <li class="services not-animate-hide"><a data-slide-to="web_services" href="#">Services</a></li>
                                <li class="team not-animate-hide"><a data-slide-to="team" href="#">Team</a></li>
                                <li class="contact not-animate-hide"><a data-slide-to="contact" href="#">Contact</a></li>
                            </ul>
                        </nav>
                </div>
            </div>
          	<div class="cover-wrapper-inner">
            	<div class="cover-container">
              		<div class="inner cover">
                        <img src="{{ url('images/logo-big-white.png') }}" alt="DevU Technologies" />
                		<h2>Software with a story</h2>
                        <p class="description">We are the team you need to help your business develop its story. Specialized in web and mobile development, we understand and we use the technologies that are defining the digitial world.</p>
                        <p class="hashtag">#Bucharest</p>
                        <!-- <p class="learn-more lead">
                            <a id="more" data-slide-to="web_services" href="#" class="btn btn-lg btn-primary">Find out more</a>
                        </p> -->
              		</div>
            	</div>
            </div>
        </div>

        <div id="web-services-wrapper" class="section web-services">
            <div class="inner">
                <div class="row">
                    <div class="col-sm-6">
                        <h2 class="not-animate-hide">Web Development</h2>
                        <div class="content not-animate-hide">
                            <p>We are delivering the best web products using the right technologies that suit your needs. We have experience starting from building simple presentation websites and ending up with realtime online games or custom platforms used by thousands of users. We also love to create the best experience for your users so they can enjoy the product at its best.</p>
                            <a class="offer" data-slide-to="contact" href="#">Contact us</a>
                        </div>
                    </div>
                    <div class="col-sm-6 picture-wrapper">
                        <div class="picture not-animate-hide right"></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="mobile-services-wrapper" class="section mobile-services">
            <div class="inner">
                <div class="row">
                    <div class="col-sm-6 picture-wrapper">
                        <div class="picture not-animate-hide left"></div>
                    </div>
                    <div class="col-sm-6">
                        <h2 class="not-animate-hide">Mobile Development</h2>
                        <div class="content not-animate-hide">
                            <p>We provide development services for both hybrid and native mobile aplications for iOS and Android smartphones. We are helping you to choose the right development strategy so you can optimise costs and development time and maximise the impact of your application.</p>
                            <a class="offer" data-slide-to="contact" href="#">Request an offer</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="iot-services-wrapper" class="section iot-services">
            <div class="inner">
                <div class="row">
                    <div class="col-sm-6">
                        <h2 class="not-animate-hide">Internet of Things</h2>
                        <div class="content not-animate-hide">
                            <p>We believe in the future of the connected devices that improve our lifestyle and we love to be a part of it. We have experience in building software for embed devices that allows them to collect and exchange data through the network.</p>
                            <a class="offer" data-slide-to="contact" href="#">Contact us</a>
                        </div>
                    </div>
                    <div class="col-sm-6 picture-wrapper">
                        <div class="picture not-animate-hide right"></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="team-wrapper" class="section team">
            <div class="inner">
                <h2 class="not-animate-hide">Team</h2>
                <h3 class="not-animate-hide">We are a team of passionate creators, makers and thinkers with a straightforward atitude and serious about delivering great outcomes.</h3>
                <div class="content not-animate-hide">
                    <div class="row">

                        <div class="member col-sm-4">
                            <img src="{{ url('images/iulia.png') }}" alt="Iulia Paraicu">
                            <div class="name">Iulia Paraicu</div>
                            <div class="role">Co-Founder / Software Developer</div>
                            <div class="contact">
                                <a href="https://ro.linkedin.com/in/iulia-paraicu-38373784/ro" class="item ln ion-social-linkedin" target="_blank"></a>
                                <a href="mailto:iulia.paraicu@gmail.com" class="item email ion-email"  target="_blank"></a>
                            </div>
                        </div>

                        <div class="member col-sm-4">
                            <img src="{{ url('images/mihai.jpg') }}" alt="Mihai Cracan">
                            <span class="name">Mihai Cracan</span>
                            <span class="role">Co-Founder / Software Developer</span>
                            <div class="contact">
                                <a href="https://www.linkedin.com/in/mihai-george-cracan-4b805258" class="item ln ion-social-linkedin" target="_blank"></a>
                                <a href="http://mihaicracan.com/" class="item site ion-earth" target="_blank"></a>
                                <a href="mailto:mihaigeorge.c@gmail.com" class="item email ion-email" target="_blank"></a>
                            </div>
                        </div>

                        <div class="member col-sm-4">
                            <img src="{{ url('images/andreea.png') }}" alt="Andreea Longo">
                            <div class="name">Andreea Longo</div>
                            <div class="role">Business Developer</div>
                            <div class="contact">
                                <a href="https://ro.linkedin.com/in/andreea-longo-3b503484/ro" class="item ln ion-social-linkedin" target="_blank"></a>
                                <a href="mailto:andreealongo@gmail.com" class="item email ion-email" target="_blank"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="offer-wrapper" class="section offer">
            <div class="bg-color">
                <div class="inner">
                    <h2 class="not-animate-hide">Ask for an offer</h2>
                    <h3 class="not-animate-hide">Let us analyse your project, build the right development strategy and make you an offer for free.</h3>
                    <div class="content not-animate-hide">
                        <a class="btn btn-primary" data-slide-to="contact" href="#">Contact us</a>
                    </div>
                </div>
            </div>
        </div>

        <div id="contact-wrapper" class="section contact">
            <div class="inner">
                <h2 class="not-animate-hide">Contact</h2>
                <h3 class="not-animate-hide">If you have a cool project in mind feel free to contact us.</h3>
                <!-- <div class="social">
                    <a href="https://www.facebook.com/mihai.george.cr" target="_blank" class="item fb ion-social-facebook"></a>
                    <a href="https://ro.linkedin.com/in/mihai-george-cracan-4b805258" target="_blank" class="item ln ion-social-linkedin"></a>
                    <a href="https://twitter.com/MihaiGeorgeC" target="_blank" class="item tw ion-social-twitter"></a>
                </div> -->
                <div class="content not-animate-hide">
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" id="inputName" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                    </form>
                    <form>
                        <div class="form-group">
                            <textarea class="form-control" id="inputMessage" placeholder="Message..."></textarea>
                        </div>
                        <div id="contactBtn" class="btn btn-primary btn-block btn-lg">Send</div>
                    </form>   
                </div>
            </div>
        </div>

        <div id="footer-wrapper">2016 &copy; DevU Technologies SRL</div>

        <!-- <script src="https://maps.googleapis.com/maps/api/js"></script> -->
        <script type="text/javascript" src="{{ url('js/lib.js?v=1.1.0') }}"></script>
        <script type="text/javascript" src="{{ url(elixir('js/app.js')) }}"></script>

        <!-- <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-78896263-1', 'auto');
          ga('send', 'pageview');
        </script> -->
    </body>
</html>
