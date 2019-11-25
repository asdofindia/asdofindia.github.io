(function(){
    'use strict';
    var currPageNum = 1;
    var moreExists = true;
    var currPost = 1;
    var postsPerPage = 7;
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
        context.addClass('postBeingLoaded');
        context.load(context.find('.readMore').attr('href') + ' article', function(){
            context.removeClass('postBeingLoaded');
            highlightPost(context);
            context.off('click', postClickListener);
            context.removeClass('stalePost');
            var thisPostUrl = context.find('.permalink').attr('href');
            var thisPostTitle = context.find('.permalink').text();
            context.find('article').append(getCommentButton());
            context.find('article').append(generateShare(thisPostUrl, thisPostTitle));
        });
    }

    function getCommentButton() {
        return $('<p>').html('<em>Have a <a href="/comments/">comment</a>? I urge you to <a href="/blogs-to-chat/">make a blog post</a> and <a href="/about/#contact">send me</a> the link</em>');
    }

    function generateShare(href, title) {
        return generateShareElement(getShareButtons(href, title));
    }

    function getShareButtons(href, title) {
        if (stringStartsWith(href, '/')) {
            href = 'https://asd.learnlearn.in' + href;
        }
        return {
            permalink: href,
            diaspora: 'https://sharetodiaspora.github.io/?url=' + href + '&title=' + title,
            mastodon: 'web+mastodon://share?text=' + title + '%0A%0A' + href,
            twitter: 'https://twitter.com/intent/tweet?url=' + href + '&via=asdofindia' + '&text=' + encodeURIComponent(title),
            facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + href,
            google: 'https://plus.google.com/share?url=' + href,
            email: 'mailto:?subject=' + title + '&body=' + href,
            telegram: 'https://telegram.me/share/url?url=' + href + '&text=' + title,
            whatsapp: 'whatsapp://send?text=' + title + ' ' + href
        };
    }

    function generateShareElement(shareButtons){
        var shareElement = $('<div class="shareButtons">').text('Share: ');
        for (var button in shareButtons) {
            if (shareButtons.hasOwnProperty(button)) {
                shareElement.append($('<a target="_blank">').text(button).attr('href', shareButtons[button]));
                if (button !== 'whatsapp') {
                    shareElement.append(' | ');
                }
            }
        }
        return shareElement;
    }

    function stringStartsWith (string, prefix) {
        return string.slice(0, prefix.length) == prefix;
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
                if ($('.highlightedPost').hasClass('stalePost')){
                    fetchPost($('.highlightedPost'));
                } else {
                    var postUrl = $('.highlightedPost').find('.permalink').attr('href');
                    window.location = postUrl;
                }

            }
        });

    }

    function moveToPost(direction){
        var moveToLink = $(direction).attr('href');
        if (moveToLink) {
            window.location = moveToLink;
        }
    }

    function addShareButtonsToPost(){
        var thisPostUrl = $('a.permalink').attr('href');
        var thisPostTitle = $('a.permalink').text();
        $('.postFooter').prepend(generateShare(thisPostUrl, thisPostTitle));
    }

    function postInit(){
        Mousetrap.bind('j', function() { moveToPost('.olderPostLink'); });
        Mousetrap.bind('k', function() { moveToPost('.newerPostLink'); });
        Mousetrap.bind('h', function() {
            if (document.referrer === 'https://asd.learnlearn.in' || document.referrer === 'http://localhost:4000/'){
                window.history.back();
            } else {
                window.location = '/';
            }
        });
        addShareButtonsToPost();
        $('.postFooter').prepend(getCommentButton());
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
