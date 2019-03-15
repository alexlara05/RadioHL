$(function () {
    'use strict';

    var $swipeTabsContainer = $('.swipe-tabs'),
        $swipeTabs = $('.swipe-tab'),
        $swipeTabsContentContainer = $('.swipe-tabs-container'),
        currentIndex = 0,
        activeTabClassName = 'active-tab';

    $swipeTabsContainer.on('init', function(event, slick) {
        $swipeTabsContentContainer.removeClass('invisible');
        $swipeTabsContainer.removeClass('invisible');

        currentIndex = slick.getCurrent();
        $swipeTabs.removeClass(activeTabClassName);
           $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);

           fixContent(currentIndex)
    });

    // Tabs Header
    $swipeTabsContainer.slick({ 
        //slidesToShow: 3.25,
        initialSlide: 0,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        swipeToSlide: true,
        touchThreshold: 10
    });

    // Tabs Content
    $swipeTabsContentContainer.slick({
        asNavFor: $swipeTabsContainer,
        initialSlide: 1, // Set the initial tab
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        swipeToSlide: true,
    draggable: false,
        touchThreshold: 10
    });


    $swipeTabs.on('click', function(event) {
        // gets index of clicked tab
        currentIndex = $(this).data('slick-index');
        $swipeTabs.removeClass(activeTabClassName);
        $('.swipe-tab[data-slick-index=' + currentIndex +']').addClass(activeTabClassName);
        $swipeTabsContainer.slick('slickGoTo', currentIndex);
        $swipeTabsContentContainer.slick('slickGoTo', currentIndex);

        fixContent(currentIndex)
    });

    //initializes slick navigation tabs swipe handler
    $swipeTabsContentContainer.on('swipe', function(event, slick, direction) {
        currentIndex = $(this).slick('slickCurrentSlide');
        $swipeTabs.removeClass(activeTabClassName);
        $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);

        fixContent(currentIndex)
    });
});

// Fix the content on tab change
function fixContent(currentIndex) {
    var chatInput = $('.chatContent');
        if(currentIndex == 0){ // Chat tab
            chatInput.show();
            //window.scrollTo(0, $(document).height()); // Scroll down slick-active
            window.scrollTo(0, $('.slick-active').height()+350); // pixeles extra para que los ultimos msg no los tape el chat input
        }else if(currentIndex == 1 || currentIndex == 2){ // Radio live streaming tab
            chatInput.hide();
            $(window).scrollTop(0); // Scroll top
        }
}