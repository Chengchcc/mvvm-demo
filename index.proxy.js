    import MVVM from './js/proxy/mvvm'
    var app = new MVVM({
        el: '#app',
        data: {
            title: 'hello world',
            name: 'canfoo',
            arr: [1,2,3]
        },
        methods: {
            clickMe: function () {
                console.log(this)
                this.title = 'hello world2';
            },
            addArr: function(){
                console.log('add Arr')
                this.arr.push(1)
            }
        },
        computed: {
            sum() {
                return this.arr.join(',')
            }
        },
        mounted: function () {
            window.setTimeout(() => {
                this.title = '你好';
            }, 1000);
        }
    });