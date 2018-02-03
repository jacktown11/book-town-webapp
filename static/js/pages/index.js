$.get('/ajax/index', function(data){
    var app = new Vue({
        el: '#app',
        data: {
            top: data.items[0].data.data,
            hot: data.items[1].data.data,
            recommend: data.items[2].data.data,
            male: data.items[3].data.data,
            female: data.items[4].data.data,
            free: data.items[5].data.data,            
            topic: data.items[6].data.data            
        }
    });
}, 'json');