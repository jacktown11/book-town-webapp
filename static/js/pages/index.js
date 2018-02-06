$.get('/ajax/index', function(data){
    var screenWidth = $(window).width(),
        header_bottom_decoration_width;
    screenWidth = screenWidth < 300 ? 300 : screenWidth;
    header_bottom_decoration_width = $($('.Swipe-tab a')[0]).offset().width;
    var app = new Vue({
        el: '#root',
        data: {
            screenWidth: screenWidth,
            header_bottom_decoration_width: header_bottom_decoration_width,
            transPos: 0,
            headerTransPos: 0,
            top: data.items[0].data.data,
            hot: data.items[1].data.data,
            recommend: data.items[2].data.data,
            male: data.items[3].data.data,
            female: data.items[4].data.data,
            free: data.items[5].data.data,            
            topic: data.items[6].data.data            
        },
        methods: {
            toggleMainSection: function(swipeTo){
                // toggle between booktown and bookshelf
                if(swipeTo === 'bookshelf'){
                    this.transPos = -screenWidth;
                    this.headerTransPos = header_bottom_decoration_width;
                }else{
                    this.transPos = 0;
                    this.headerTransPos = 0;
                }
            }
        }
    });
}, 'json');