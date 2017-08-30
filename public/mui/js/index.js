/**
 * Created by lenovo on 2017/8/25.
 */
$(document).ready(function() {
    $("#searchButton").click(function(){
        var search =$("#search").val();

        var novelsList=JSON.parse($("#novelsList").val());
        console.log("search:---------"+search);
        console.log(" novelsList.length:---------"+ novelsList.length);
        for (var i=0;i< novelsList.length;i++){
            console.log("name:------"+novelsList[i].name);
            if (novelsList[i].name==search){
                alert(novelsList[i].name);
                console.log("success!");
            }else {
                console.log("fail");
            }
        }
    });
});
