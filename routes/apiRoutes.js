var db = require("../models")
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function(app){
    app.post("/api/articles", (req, res)=>{
        db.Article.create(req.body).then(
            (results)=>{
                res.json(results)
            }
        )
    })
    app.get("/api/scrape", (req, res)=>{
    axios.get("https://www.npr.org/sections/music-news/").then(function(response){
    let $ = cheerio.load(response.data)
    let results = []

    $("article.has-image").each(function(i, element) {
        var title = $(this).children("div.item-info-wrap").children("div.item-info").children("h2").children("a").text()
        var body = $(this).children("div.item-info-wrap").children("div.item-info").children("p").children("a").text()
        var link = $(this).children("div.item-info-wrap").children("div.item-info").children("h2").children("a").attr("href")
        var image = $(this).children("div.item-image").children("div.imagewrap").children("a").children("img").attr("src")
        if (i<10){
        results.push({
            title: title,
            summary: body,
            link: link,
            image: image
        })
    }
    })

    db.Article.remove({saved: false}).then(()=>{
        db.Article.create(results).then(
            (results)=>{
                res.json(results)
            }
        )
    })
    console.log(results)
})
    })
    app.get("/api/note", (req,res)=>{
        db.Note.find().then((data)=>{
            res.json(data)
        })
    })

    app.put("/api/article/:id", (req, res)=>{
        db.Article.update({_id: req.params.id}, {saved: true}).then((data)=>{
            res.json(data)
        }
        )
    })
    app.delete("/api/article/:id", (req, res)=>{
        db.Article.remove({_id: req.params.id}).then((data)=>{
            res.json(data)
        })
    })
    app.post("/api/note/:id", (req, res)=>{
        db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id }}, { new: true });
          })
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
    })
app.get("/note/saved/:id", (req,res)=>{
    db.Article.find({_id: req.params.id}).populate('note').then((data)=>{
        const noteSaved = data[0].note.map(data =>{
            return {
                id: data.id,
                subject: data.subject,
                body: data.body
            }
        })
        console.log(noteSaved)
        // let safeData = JSON.stringify(data[0].note)
        // var parsedData = JSON.parse(safeData)
        res.send(noteSaved)
    })
})
app.delete("/note/delete/:id", (req,res)=>{
    db.Note.remove({_id: req.params.id})
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err)
    })
})
}