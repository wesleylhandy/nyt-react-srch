const routes = require('express').Router();

const { ObjectID } = require('mongodb');
const Article = require('./../models/Article');

routes.get("/api/articles", (req, res) => {
    Article.find({}, (err, articles) => {
        err ? res.status(400).send() : res.json(articles)
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