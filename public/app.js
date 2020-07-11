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
$('body').on('click', '#deleteNote', function(e) {
    let dataId = $('#deleteNote').attr("data-id")
    console.log(dataId)
    $.ajax({
        url: "/note/delete/" + dataId,
        method: "DELETE"
    }).then(()=>{
        modal
    })
});
$(".view").on("click", function(){
    $('.modal-body-saved').empty()
    const dataId = $(this).attr("data-id")
    const newsTitle = $(this).attr("news-title")
    $(".modal-title-id").html(dataId)
    $(".modal-title").html(newsTitle)
    $.ajax({
        method: "GET",
        url: "/note/saved/" + $(".modal-title-id").html(),
    }).then((data)=>{
        for (let i = 0; i < data.length; i++) {
            $('.modal-body-saved').append(
            `<div class="card noteCard">
                <div class="row">
                    <div class="col-6" data-id="${data[i].id}">
                        <h4 class="noteSubject">${data[i].subject}:</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p>${data[i].body}</p>
                    </div>
                    <div class="col-2">
                        <button id="edit" class="btn btn-secondary">Edit</button>
                    </div>
                    <div class="col-2">
                        <button data-id="${data[i].id}" onclick="deleteNote(${data[i].id})" id="deleteNote" class="btn btn-secondary">Delete</button>
                    </div>
                </div>
            </div>`
)
        }
    })
})



// $("#deleteNote").on("click", function(){
//     console.log('clicked')
// })