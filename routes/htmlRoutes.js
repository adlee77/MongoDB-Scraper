const db = require("../models")

module.exports = function (app) {
    // Load index page
    app.get('/', function (req, res) {
        db.Article.find({ saved: false }).then((data) => {
            const nprNews =
                data.map(data => {
                    return {
                        title: data.title,
                        summary: data.summary,
                        link: data.link,
                        image: data.image,
                        id: data._id
                    }
                })
            res.render('index', { npr: nprNews })
        })
    })
    app.get("/saved-articles", function (req, res) {
        db.Article.find({ saved: true }).then((data) => {
            const nprSaved = data.map(data => {
                return {
                    title: data.title,
                    summary: data.summary,
                    link: data.link,
                    image: data.image,
                    id: data._id
                }
            })
            if (data) {
                res.render('saved', { npr: nprSaved })
            }
            else {
                res.render('saved', { noSaved: "No Saved Articles" })
            }
        })
    })
}