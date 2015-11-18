(function(){
    'use strict';
    var currPageNum = 1;
    var moreExists = true;
    var currPost = 1;
    var postsPerPage = 5;
    var fetchingMore = false;
    var pageType = 'home';

    function fetchMore(pageNum) {
        if (!fetchingMore) {
            fetchingMore = true;
            showFetchingAnimation();
            $.get( 'archive/' + pageNum + '/index.html', function(data){
                var morePosts = $('<div>').append($.parseHTML(data));
                $('.posts').append(morePosts.find('.posts li'));
                var moreInfo = $(morePosts.find('noscript').text());
                pageNum = moreInfo.find('.pageNum').html();
                currPageNum = +pageNum;
                var nextExists = moreInfo.find('.next').length;
                if (!nextExists){
                    moreExists = false;
                    $('.loadMore').toggle();
                }
                loadPostLoaders();
                currPost = (currPageNum-1)*postsPerPage+1;
                highlightPost($('.post:nth-child(' + currPost + ')'));
                fetchingMore = false;
                hideFetchingAnimation();
            });
        }
    }

    function showFetchingAnimation(){
        $('.loadMore').text('Loading...');
    }

    function hideFetchingAnimation(){
        $('.loadMore').text('Load more posts');
    }

    function fetchPost(context) {
        context.load(context.find('.readMore').attr('href') + ' article', function(){
            highlightPost(context);
            context.off('click', postClickListener);
            context.removeClass('stalePost');
        });
    }

    function highlightPost(context) {
        $( '.post.highlightedPost').removeClass('highlightedPost');
        if (context.length){
            context.addClass('highlightedPost');
            var scrollHeight = context.offset().top;
            $(document).scrollTop(scrollHeight);
        }
    }

    function highlightNext(){
        if (!$('.post.highlightedPost').length){
            highlightPost($('.post:first'));
        } else if (currPost < $('.post').length) {
            highlightPost($( '.post.highlightedPost' ).next());
            currPost = currPost + 1;
        } else {
            if (moreExists){
                fetchMore(currPageNum + 1);
            } else {
                currPost = 1;
                highlightPost($('.post:first'));
            }
        }
    }

    function highlightPrev() {
        if (!$('.post.highlightedPost').length){
            highlightPost($('.post:last'));
            currPost = $('.post').length;
        } else {

            highlightPost($( '.post.highlightedPost' ).prev());
            currPost = currPost - 1;
        }
    }

    function postClickListener(e){
        e.preventDefault();
        fetchPost($(this));
    }

    function loadPostLoaders(){
        $('.post:not(.stalePost) .readMore').on('click', function(e){
            e.preventDefault();
            fetchPost($(this).parent('.post'));
        });
        $('.post:not(.stalePost)').on('click', postClickListener);
        $('.post:not(.stalePost)').each(function(){
            var postDate = $(this).find('.postDate').data('date');
            var dateDiff = new Date().getTime() / 1000 - postDate;
            var postDateText = $(this).find('.postDate').text();
            if (dateDiff < 60) {
                postDateText = Math.floor(dateDiff) + ' second(s) back';
            } else if (dateDiff < 3600) {
                postDateText = Math.floor(dateDiff / 60) + ' minute(s) back';
            } else if (dateDiff < 86400) {
                postDateText = Math.floor(dateDiff / 3600) + ' hour(s) back';
            } else if (dateDiff < 345600) {
                postDateText = Math.floor(dateDiff / 86400) + ' day(s) back';
            } else if (dateDiff < 518400) {
                postDateText = 'almost a week back';
            } else if (dateDiff < 864000) {
                postDateText = 'one week back';
            } else if (dateDiff < 1209600) {
                postDateText = 'two weeks back';
            } else if (dateDiff < 2592000) {
                postDateText = 'a month back';
            } else if (dateDiff < 31536000) {
                postDateText = Math.floor(dateDiff / 2592000) + ' month(s) back';
            }
            $(this).find('.postDate').text(postDateText);
        });
        $('.post:not(.stalePost)').addClass('stalePost');
    }

    function setPageType(){
        if ($('.olderPostLink').length || $('.newerPostLink').length) {
            pageType = 'post';
        }
    }

    function homeInit(){
        loadPostLoaders();
        $('.loadMore').on('click', function(e){
            e.preventDefault();
            fetchMore(currPageNum + 1);
        });

        /* global Mousetrap:false */

        Mousetrap.bind('j', function() { highlightNext(); });
        Mousetrap.bind('k', function() { highlightPrev(); });
        Mousetrap.bind('o', function() {
            if($('.highlightedPost').length){
                fetchPost($('.highlightedPost'));
            }
        });

    }

    function moveToPost(direction){
        var moveToLink = $(direction).attr('href');
        if (moveToLink) {
            window.location = moveToLink;
        }
    }

    function postInit(){
        Mousetrap.bind('j', function() { moveToPost('.olderPostLink'); });
        Mousetrap.bind('k', function() { moveToPost('.newerPostLink'); });
    }

    function init(){
        setPageType();
        if (pageType === 'home'){
            homeInit();
        } else if (pageType === 'post') {
            postInit();
        }
    }

    init();
})();
