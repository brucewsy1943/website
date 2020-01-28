
$(function(){
    for(var i=1; i<$('#toggleNav li').length + 1;i++){
        (function(i){
            $('.deteil-nav li [data-id=toggle' + i + ']').on('click', function () {
                $('.deteil-nav li a').removeClass('active');
                $(this).addClass('active');
                $('#toggleCont .toggle-item').hide();
                $('#toggleCont [data-id=toggleCont' + i + ']').show();
            });
        })(i);
    };
   /* $('.toggle-icon').toggle(function(){
        // $(this).next('.toggle').toggle()
    })*/
});

