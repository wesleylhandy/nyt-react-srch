const axios = require('axios');

function saveArticle(article) {
	
	return new Promise((resolve, reject) => {
		axios.post("/api/article", {article}).then(response=>{
			if (response) {
				resolve(response)
			}
		}).catch(err => {
      if (err) {
        reject(err.response.data);
      }
    });
	})
}

function getSavedArticles() {

	return new Promise((resolve, reject)=> {
		axios.get('/api/articles').then(response=>{
			if (response) {
				resolve(response.data)
			}
		}).catch(err=> {
			if(err) {
				reject(err.response.data);
			}
		});
	});
}

function removeArticle(_id) {
	return new Promise((resolve, reject) => {
		axios.delete(`/api/article/${_id}`).then(response=>{
			if (response) {
				resolve(response.data)
			}
		}).catch(err=> {
			if(err) {
				reject(err.response.data);
			}
		});
	})
}

function incrementVotes(_id, count) {
	return new Promise((resolve, reject) => {
		axios.put(`/api/article/${_id}/${count}`).then(response=>{
			if (response) {
				console.log(response);
				resolve(response.data)
			}
		}).catch(err=> {
			if(err) {
				reject(err.response.data);
			}
		});
	})

}

module.exports = {
	saveArticle,
	getSavedArticles,
	removeArticle,
	incrementVotes
};