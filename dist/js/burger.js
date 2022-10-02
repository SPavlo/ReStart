$(document).ready(function (){
    $('.burger').click(function (event){
        $('.burger-mod').toggleClass('active')
        $('.body').toggleClass('lock')
    })
    $('.close').click(function (event){
        $('.burger-mod').toggleClass('active')
        $('.body').toggleClass('lock')
    })
})

