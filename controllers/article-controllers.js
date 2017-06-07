const routes = require('express').Router();

const { ObjectID } = require('mongodb');
const Article = require('./../models/Article');

routes.get("/api/articles", (req, res) => {
    Article.find({}, (err, articles) => {
        err ? res.status(400).send() : res.json(articles)
    });
});

routes.post("/api/article", (req, res) => {
    const body = JSON.parse(req.body);
    console.log (body);
    let article = new Article({
        title: body.title,
        url: body.url,
        pubdate: body.pubdate,
        imgsrc: body.imgsrc,
        snippet: body.snippet
    });

    article.save({runValidators: true},(article) => {
        res.send(article);
    }, (e) => {
        console.error(e.message);
        let statusCode = e.message.includes('notUnique') ? 404 : 503;
        res.status(statusCode).send(e.message);
    });
});

routes.delete("/api/articles/:id", (req, res) => {
    let articleId = req.params.id;

    if(!ObjectID.isValid(articleId)) {
        return res.status(404).send();
    };

    Article.findByIdAndRemove(articleId).then((article) => {
        if(!article) {
           return res.status(404).send();
        }
        res.send({article});
    }).catch((e) => {
       return res.status(400).send(e);
    })
});

routes.patch('/api/articles/:action/:id', (req, res) => {
    let action = req.params.action;
    let articleId = req.params.id;

    if(!ObjectID.isValid(articleId)) {
        return res.status(404).send();
    };

    if(action === "like") {
        Article.findByIdAndUpdate(articleId, {$inc: {likes: 1}}).then((article) => {
            !article ? res.status(404).send() : res.send({article})
        }).catch(e => {
            res.status(400).send(e);
        })
    } else if(action === "dislike") {
        Article.findByIdAndUpdate(articleId, {$inc: {likes: -1}}).then((article) => {
            !article ? res.status(404).send() : res.send({article})
        }).catch(e => {
            res.status(400).send(e);
        })
    }

})

module.exports = routes;