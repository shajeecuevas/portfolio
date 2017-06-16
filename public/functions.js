$(document).ready(function() {
    //alert("Docu is ready");
    $( "#post" ).click(function() {
  alert("The post has been made to the blog");
});
 } );

$('.nav navbar-nav li a').click(function(e) {
  var $this = $(this);
  if (!$this.hasClass('active')) {
    $this.addClass('active');
  }
  e.preventDefault();
}); 

function submitBlog(id){
    console.log("Testing if function is working...")
    var title = document.getElementById("title");
    var text = document.getElementById("text");

    if(title.value && text.value){
        $.ajax({
            type:"POST",
            url:"/comment",
            processData:false,
            contentType:'application/json',
            data: JSON.stringify({"titleD":title.value,"textD":text.value})
        })

        // title.value = "";
        // text.value = "";
        // refreshB(id);
        // return
    
}
}