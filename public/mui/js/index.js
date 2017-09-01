/**
 * Created by lenovo on 2017/8/25.
 */
$(document).ready(function() {
    $("#content1").show();
    $("#content2").hide();

    $("#searchButton").click(function(){
        var search =$("#search").val();
        $("#search").attr("value","");
        var novelsList=JSON.parse($("#novelsList").val());
        for (var i=0;i< novelsList.length;i++){
            if (novelsList[i].name==search){
                console.log("success!");
                $("#content1").hide();
                $("#novelName").html(search);
                $("#novelName").attr('href',"novel/"+novelsList[i].index);
                $("#auth").html("作者："+novelsList[i].author+"  最新章节："+novelsList[i].lastSectionName);
                $("#content2").show();
            }else {
                let k=novelsList.length-1;
                // if(novelsList[k].name!==search){
                //     alert("对不起，没有您要找的小说");
                // }
            }
        }
    });
    $("#search").keypress(function(e) {
        if(e.keyCode != 13 /* Return */ ) return;
        var search =$("#search").val();
        $("#search").attr("value","");
        var novelsList=JSON.parse($("#novelsList").val());
        for (var i=0;i< novelsList.length;i++){
            if (novelsList[i].name==search){
                console.log("success!");
                $("#content1").hide();
                $("#novelName").html(search);
                $("#novelName").attr('href',"novel/"+novelsList[i].index);
                $("#auth").html("作者："+novelsList[i].author+"  最新章节："+novelsList[i].lastSectionName);
                $("#content2").show();
            }else {
                let k=novelsList.length-1;
                // if(novelsList[k].name!==search){
                //     alert("对不起，没有您要找的小说");
                // }
            }
        }
    });
});
