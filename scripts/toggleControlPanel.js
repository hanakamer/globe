
$(function(){
    $('.toggle-button').on('click', function(){
        $(this).text(function(i, v){
            return v === 'CONTROL PANEL >' ? 'HIDE CONTROL PANEL' : 'CONTROL PANEL >'
         })
        $('.control-panel').toggle('slide', { direction: 'left' }, 1000);
        $('#').animate({
            'margin-left' : $('main-content').css('margin-left') == '0px' ? '210px' : '0px'
        }, 1000);
    });
});
