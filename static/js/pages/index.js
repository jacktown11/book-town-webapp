$.get('/ajax/index', function(data){
    var screenWidth = $(window).width();
    screenWidth = screenWidth < 300 ? 300 : screenWidth;
    var app = new Vue({
        el: '#root',
        data: {
            screenWidth: screenWidth,
            transPos: 0,
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
                }else{
                    this.transPos = 0;
                }
            }
        }
    });
}, 'json');