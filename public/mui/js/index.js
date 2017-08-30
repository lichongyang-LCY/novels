/**
 * Created by lenovo on 2017/8/25.
 */
$(document).ready(function() {
    $("#searchButton").click(function(){
        var search =$("#search").val();
        var novelsList=$("#novelsList").val();
        var newList = novelsList.substring(-1,(novelsList-1))
        console.log("search:---------"+search);
        console.log("novelsList:---------"+JSON.stringify(newList));
        for (var i=0;i< novelsList.length;i++){
            console.log("name:------"+novelsList[i].name);
            // console.log("novelsList aa:---------"+JSON.stringify(novelsList[i]));
            if (novelsList[i].name==search){
                console.log("success!");
            }else {
                console.log("fail");
            }
        }
    });
});
