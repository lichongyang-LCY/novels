/**
 * Created by lenovo on 2017/8/25.
 */
$(document).ready(function() {
    $("#searchButton").click(function(){
        var search =$("#search").val();

        var novelsList=JSON.parse($("#novelsList").val());
        console.log("search:---------"+search);
        console.log(" novelsList.length:---------"+ novelsList.length);
        console.log("k:------"+$("#ul").val());
        for (var i=0;i< novelsList.length;i++){
            if(novelsList[i].name==search){
                console.log("name:------"+novelsList[i].name);
                console.log("novelsList[i].index:------"+novelsList[i].index);
                console.log("novels[i].index:------"+$(novelsList[i].index.toString).val());
            }else{
                $("ul>li").filter(function(index){
                    return index=novelsList[i].index;
                }).remove();
            }
        }
        // novelsList.forEach(function (novel) {
        //
        // });
    });
});
