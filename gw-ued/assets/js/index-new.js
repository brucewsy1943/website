
$(function(){
	//getTzgg();
	//getRczp();
	
    jQuery(".banner").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:false,vis:1});
    jQuery(".notice").slide({mainCell:".bd ul",effect:"top",autoPlay:true,vis:1});
    // $('.toggle li').on('click', function () {
    //     $(this).addClass('active');
    //     $(this).siblings().removeClass('active');
    // })
    $(window).resize(function () {
        jQuery(".banner").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:false,vis:1});
        jQuery(".notice").slide({mainCell:".bd ul",effect:"top",autoPlay:true,vis:1});
    });
});







	
