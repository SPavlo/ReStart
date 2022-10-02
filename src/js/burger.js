alert('jefofo')
$(document).ready(function (){
    $('.burger').click(function (event){

        $('.burger-mod').toggleClass('active')
        $('body').toggleClass('lock')
    })
})

