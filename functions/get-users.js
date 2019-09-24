const axios = require('axios');

const getUsers = (event, context, callback) => {
	const { CLIENT_ID, CLIENT_SECRET } = process.env;
	const API_URL = 'https://api.github.com/users';
	const URL = `${API_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
	
	// send user response
	const send = body => {
			callback(null, {
				statusCode: 400,
				body: JSON.stringify(body)
			});
	}

	// perform API call
	const get = () => {
		axios.get(URL)
			.then(res => send(res.data))
			.catch(err => send(err));
	}

	// allow only GET requests
	if (event.httpMethod === 'GET') {
		get();
	}
};

exports.handler = getUsers;