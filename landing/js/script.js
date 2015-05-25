/* - alphabetic
*  - вынести переменные в начало ф-ций
*  - переменные хранящие jQ объекты наградить $
*  -
*  */
"use strict";
$(function() {
    var blocksId = ['home', 'portfolio', 'services', 'blog', 'about-me', 'contact'],
        leftMenuElems = $('#left-menu ul li'),
        rightMenuElems = $('#nav-menu ul li'),
        leftMenuEl = $('#left-menu'),
        menuBtnEl = $('#menu-btn'),
        homeEl = $('#home'),
        isMenuOpened = false,
        isPortfolioLoaded = false, /* change to false */
        screenWidth,
        screenHeight,
        isNextActive = true,
        galleryPost = {isExists : false, isOpened: false};

    onResize();

    $(window).on('mousewheel', onScroll);

    $('#menu-btn, #left-menu .close').on('click', slideLeftMenu);

    $(window).on('resize', onResize);

//    attaching menu event handlers
    $(rightMenuElems).each(onMenuItem);
    $(leftMenuElems).each(onMenuItem);

    initializePortfolio();
    initializeContact();


    $('.portfolio-link').each(function () {
        $(this).on('click', function () {
            (!isPortfolioLoaded) ? loading(navigateToBlock, 1) : navigateToBlock(1);
        })
    });
    $('.contacts-link').each(function () {
        $(this).on('click', function () {
            navigateToBlock(5)
        });
    });

    function initializeContact () {
        $('#contact form button').on('click', function (event) {
            event.preventDefault();
        });
    }
    function animateGraphics() {
        $('#about-me .graphic').each(function () {
            $(this).find('.fill-lavel').animate({'width': $(this).find('.fill-percent').html() + '%'}, 1000);
        });
    }

    function initializePortfolioPostExample (src) {
        var $previews = $('.post-img>div'),
            $galleryPostExample = $('#gallery-post-example');

        $galleryPostExample.css({
            'background' : 'url('+ src + ') no-repeat center',
            'background-size' : 'cover'
        });

        $('.right-side .close').on('click', function () {
            $galleryPostExample.fadeOut(500);
            galleryPost.isExists = false;
            galleryPost.isOpened = false;
            navigateToBlock(1);
        });

        $previews.each(function () {
            if($(this).data('img')) {
                $(this).css({'background': 'url("img/portfolio/'+ $(this).data('img') +'") no-repeat center',
                    'background-size': 'cover'});
            }
        });

        $previews.on('click', function (event) {
            event.stopPropagation();
            $galleryPostExample.css({'background' : 'url("img/portfolio/'+ $(this).data('img') +'") no-repeat center',
                'background-size': 'cover'});
//            console.log(this);
        });
    }

    function initializePortfolio () {
        var $plateDivs = $('#plate>div, #prt-second>div'),
            $prtFilterButtons = $('.prt-filter>button'),
            $backNext = $('.prt-back-next>button');

        $plateDivs.hover(function (event) {
            event.stopPropagation();
            $(this).find('.tooltip').fadeIn(300);
        }, function (event) {
            event.stopPropagation();
            $(this).find('.tooltip').fadeOut(300);
        });

        $plateDivs.each(function () {
            if($(this).data('img')) {
                $(this).css({'background': 'url("img/portfolio/'+ $(this).data('img') +'") no-repeat center',
                            'background-size': 'cover'});
            }
        });

        $plateDivs.not('.prt-on-top').on('click', openGalleryPost);

        $prtFilterButtons.on('click', portfolioFilter);
        $backNext.on('click', slidePortfolio);


        function openGalleryPost (event) {
            var src = 'img/portfolio/' + $(this).data('img');

            event.stopPropagation();
            galleryPost.isExists = true;
            galleryPost.isOpened = true;
            $('#gallery-post-example').slideDown(500);

            navigateToId('gallery-post-example');
            initializePortfolioPostExample(src);
        }

        function portfolioFilter () {
            $prtFilterButtons.removeClass('prt-menu-btn-active');
            $(this).addClass('prt-menu-btn-active');
        }

        function slidePortfolio () {
            if ( $(this).hasClass('prt-next') ) {
                if (isNextActive) {
                    $backNext.toggleClass('prt-menu-btn-active');
                    isNextActive = !isNextActive;

                    $backNext.last().html('>').end().first().html('< BACK');
                    movePage(false);
                }
            } else {
                if (!isNextActive) {
                    $backNext.toggleClass('prt-menu-btn-active');
                    isNextActive = !isNextActive;

                    $backNext.last().html('NEXT >').end().first().html('<');
                    movePage(true);
                }
            }
        }

        function movePage (flag) {
            var $secondPage = $('#prt-second');

            if (flag) {
                $secondPage.animate({'left' : screenWidth}, 1000);
            } else {
                $secondPage.animate({'left' : 0}, 1000);
            }
        }
    }



    /* porfolio loding func */
    function loading (callback, arg) {
        var $shadow = $('#shadow'),
            $progBar = $shadow.find('.pogress-bar'),
            $percents = $shadow.find('.percents');

        $shadow.fadeToggle(500, endFade);

        function endFade () {
            var duration = 3000;

            $percents.fadeToggle(200);
            centering();
            $progBar.animate({width: "100%"}, duration);
            percentCounter(3000);
        }

        function percentCounter (duration) {
            var i = 0,
                timer;

            timer = setInterval(function(){
                $percents.html(i + '%');
                i++;
                if(i === 101) {
                    clearInterval(timer);
                    startFadeOut();
                    callback(arg);
                }
            }, Math.ceil(duration/100));
        }

        function startFadeOut () {
            $percents.fadeToggle(200);
            $shadow.fadeToggle(500);
            $progBar.css('width', '0%');
            isPortfolioLoaded = true;
        }
    }

    function onScroll (event) {
        event.preventDefault();
            var $currentScrollTop = $("body").scrollTop(),
                blockNumber = getScreenPosition();

            if (event.deltaY < 0) {
                if (blockNumber + 1 === 1 && !isPortfolioLoaded) {
                    loading(navigateToBlock, 1);
                } else if (galleryPost.isExists && blockNumber + 1 === 2 && !galleryPost.isOpened) {
                    galleryPost.isOpened = true;
                    navigateToId('gallery-post-example');
                } else {
                    navigateToBlock(++blockNumber);
                }
            }
            else if (event.deltaY > 0 && $currentScrollTop === $('#' + blocksId[blockNumber]).offset().top) {
                if (blockNumber - 1 === 1 && !isPortfolioLoaded) {
                    loading(navigateToBlock, 1);
                } else if (galleryPost.isExists && blockNumber === 2) {
                    navigateToId('gallery-post-example');
                } else {
                    navigateToBlock(--blockNumber);
                }
            } else {
                navigateToBlock(blockNumber);
            }
    }

    function onResize () {
        /* попробовать избавиться от нижней строки */
        var $blocksEl = $('#home, #portfolio, #services, #blog, #about-me, #contact, #gallery-post-example');

        if (isMenuOpened) {
            $blocksEl.css('height', $(window).height())
                .css('width', $(window).width() - 260)
                .css('margin-left', 260);
        } else {
            $blocksEl.css('height', $(window).height())
                .css('width', $(window).width())
                .css('margin-left', 0);
        }

        resizeSecondPortfolioPage();
        resizePostTriangel();
        centering();
    }

    function resizePostTriangel () {
        $('.post-triangel').css('border-width', '0 0 ' + screenHeight + 'px 45px');
    }

    function resizeSecondPortfolioPage () {
        var $portfolio = $('#portfolio'),
            $secondPage = $('#prt-second');

        screenWidth = $portfolio.width();
        screenHeight = $portfolio.height();

        $secondPage.css({
            'height' : screenHeight,
            'width': screenWidth
        });

        if (isNextActive) {
            $secondPage.css('left', screenWidth);
        }
    }

    function centering () {
        var $percents = $('.percents');

        $percents.css({
            left: ($(window).width() - $percents.outerWidth())/2,
            top: ($(window).height() - $percents.outerHeight())/2
        });
    }

    function onMenuItem (index, el) {
        $(el).on('click', {index : index}, checkMenuItem);
    }
    function slideLeftMenu () {
        menuBtnEl.toggleClass('menu-btn-active');
        leftMenuEl.toggleClass('closed');
        homeEl.toggleClass('closed');

        isMenuOpened = !isMenuOpened;
        onResize();
    }

    function checkMenuItem (event) {
        var blockId = event.data.index;

        if (blockId === 1 && !isPortfolioLoaded) {
            loading(navigateToBlock, 1);
        } else {
            navigateToBlock(blockId);
            if(screenWidth <= 770) slideLeftMenu();
        }
    }

    function refrashTitle(blockId) {
        var blockTitles = ['home', 'portfolio', 'services',
                'blog', 'about me', 'contact'],
            titleBody = $('.title div:first'),
            titleArrow = $('.title div:last');

        titleBody.html(blockTitles[blockId]);
        titleBody.css('top', (blockId * 18 - 9) + 'px');
        titleArrow.css('top', (blockId * 18) + 'px');
    }

    function navigateToId (id) {
        var destination = $('#' + id).offset().top;
        $('body').animate({ scrollTop: destination }, 500);
    }

    function navigateToBlock (index) {
        var destination;

        if (index >= 0 && index < blocksId.length) {
            rightMenuElems.each(function () {
                $(this).removeClass('nav-active');
            });
            leftMenuElems.each(function () {
                $(this).removeClass('left-active');
            });

            $(rightMenuElems.get(index)).addClass('nav-active');
            refrashTitle(index);
            $(leftMenuElems.get(index)).addClass('left-active');

            destination = $('#' + blocksId[index]).offset().top;
            $('body').animate({ scrollTop: destination }, 500);

            galleryPost.isOpened = false;
            if(index === 4) animateGraphics();
        }
    }

    function getScreenPosition () {
        var blockCoordinats = [],
            maxBlocksCount = blocksId.length,
            screenCoord,
            i = 0;

        for (i; i < maxBlocksCount; i++) {
            blockCoordinats.push($('#' + blocksId[i]).offset().top);
        }
        screenCoord = $('#left-menu').offset().top;

        i = maxBlocksCount;
        while (i--) {
            if (screenCoord >= blockCoordinats[i]) {
//                console.log(i);
                return i;
            }
        }
    }
});