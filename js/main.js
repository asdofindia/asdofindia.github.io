(function(){
    var currPageNum = 1;
    var moreExists = true;
    var currPost = 1;
    var postsPerPage = 2;

    function fetchMore(pageNum) {
        $.get( "archive/" + pageNum + "/index.html", function(data){
            var morePosts = $("<div>").append($.parseHTML(data));
            $(".posts").append(morePosts.find(".posts li"));
            var moreInfo = $(morePosts.find("noscript").html());
            pageNum = moreInfo.find(".pageNum").html();
            currPageNum = +pageNum;
            var nextExists = moreInfo.find(".next").length;
            if (!nextExists){
                moreExists = false;
                $(".loadMore").toggle();
            }
            loadPostLoaders();
            currPost = (currPageNum-1)*postsPerPage+1;
            highlightPost($(".post:nth-child(" + currPost + ")"));
        });
    }

    $(".loadMore").on('click', function(e){
        e.preventDefault();
        fetchMore(currPageNum + 1);
    });

    function fetchPost(context) {
        context.load(context.find(".readMore").attr("href") + " article");
        highlightPost(context);
    }

    function highlightPost(context) {
        $( ".post.highlightedPost").removeClass("highlightedPost");
        if (context.length){
            console.log(context);
            context.addClass("highlightedPost");
            var scrollHeight = context.offset().top;
            $(document).scrollTop(scrollHeight);
        }
    }

    function highlightNext(){
        if (!$(".post.highlightedPost").length){
            highlightPost($(".post:first"));
        } else if (currPost < $(".post").length) {
            highlightPost($( ".post.highlightedPost" ).next());
            currPost = currPost + 1;
        } else {
            if (moreExists){
                fetchMore(currPageNum + 1);
            }
        }
    }

    function highlightPrev() {
        highlightPost($( ".post.highlightedPost").prev());
        currPost = currPost - 1;
    }

    Mousetrap.bind('j', function() { highlightNext(); });
    Mousetrap.bind('k', function() { highlightPrev(); });
    Mousetrap.bind('o', function() {
        if($(".highlightedPost").length){
            fetchPost($(".highlightedPost"));
        }
    });
    Mousetrap.bind('l', function(){

    });

    function loadPostLoaders(){
        $(".readMore").on('click', function(e){
            e.preventDefault();
            fetchPost($(this).parent(".post"));
        });
    }

    function init(){
        loadPostLoaders();
    }

    init();
})();
