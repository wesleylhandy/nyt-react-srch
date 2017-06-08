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

module.exports = {saveArticle};