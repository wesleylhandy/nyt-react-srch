const routes = require('express').Router();

const Article = require('./../models/Article');

routes.get("/api/articles", (req, res) => {
    Article.find({}, (err, articles) => {
        err ? res.status(400).send(err.message) : res.json(articles)
    });
});

routes.post("/api/article", (req, res) => {
    const reqObj = req.body.article;
    let article = new Article({
        title: reqObj.title,
        url: reqObj.url,
        pubdate: reqObj.pubdate,
        imgsrc: reqObj.imgsrc,
        snippet: reqObj.snippet
    });

    article.save({runValidators: true})
        .then((article,err) => {
            console.log(err);
            res.status(200).send(article)})
        .catch(err=> {
            if (err) {
                console.error(err.message);
                let statusCode = err.message.includes('Duplicate') ? 409 : 503;
                res.status(statusCode).send(err.message);
            }
    });
});

routes.delete("/api/article/:id", (req, res) => {
    let articleId = req.params.id;

    Article.findOneAndRemove({_id: articleId}, (err, doc) => {
       err ? res.status(404).send(err) : res.send({doc}) 
    });
});

routes.put('/api/article/:id/:count', (req, res) => {
    let count = parseInt(req.params.count);
    let articleId = req.params.id;

    Article.findOneAndUpdate({_id: articleId}, {$inc: {likes: count}}, {new: true}, (err, doc)=> {
        err ? res.status(404).send(err) : res.send({doc})
    });

})

module.exports = routes;