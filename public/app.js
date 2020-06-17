$("#generate").on("click", ()=>{
    $.ajax({
        url: "/api/scrape",
        method: "GET"
    }).then(() => {
        location.reload()
    }
    )
})
$(".save").on("click", function() {
    const dataId = $(this).attr("data-id")
    $.ajax({
        url: "/api/article/" + dataId,
        method: "PUT"
    }).then(()=>{
        location.reload()
    }
    )
})
$(".delete").on("click", function() {
    const dataId = $(this).attr("data-id")
    $.ajax({
        url: "/api/article/" + dataId,
        method: "DELETE"
    }).then(()=>{
        location.reload()
    }
    )
})
$(".comment").on("click", function() {
    const dataId = $(this).attr("data-id")
    const newsTitle = $(this).attr("news-title")
    $(".modal-title-id").html(dataId)
    $(".modal-title").html(newsTitle)
})
$(".saveNote").on("click", function() {
    const note = {
       subject: $(".noteSubject").val(),
       body: $(".noteBody").val()
    }
    $.ajax({
        method: "POST",
        url: "/api/note/" + $(".modal-title-id").html(),
        data: note
    }).then(()=>{
        $("textarea").val("")
        $("input").val("")
    })
})
$(".view").on("click", function(){
    const dataId = $(this).attr("data-id")
    const newsTitle = $(this).attr("news-title")
    $(".modal-title-id").html(dataId)
    $(".modal-title").html(newsTitle)
    $.ajax({
        method: "GET",
        url: "/note/saved/" + $(".modal-title-id").html(),
    }).then((data)=>{
        console.log(data[0].subject)
    })
})