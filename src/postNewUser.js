const axios = require('axios');
const { CustomError } = require('./utils/Errors');
const { responseWithPromptWrapper } = require('./utils/responseWithPromptWrapper');

const postNewUser = async (event) => {
    if (!event.body) {
        throw new CustomError('Invalid input: name and lecture are required.', 400, 'INVALID_INPUT');
    }

    const { name, lecture } = JSON.parse(event.body);

    if (!name || !lecture) {
        throw new CustomError('Invalid input: name and lecture are required.', 400, 'INVALID_INPUT');
    }

    try {
        const response = await axios.post('https://reqres.in/api/users', { name, lecture });

        return {
            statusCode: 201,
            body: {
                message: 'User created successfully',
                data: response.data
            },
            infoType: 'NEW_USER_SIGNUP'
        };
    } catch (error) {
        throw new CustomError('Error while creating user', 500, 'DEFAULT_ERROR');
    }
};

module.exports = {
    postNewUser: responseWithPromptWrapper(postNewUser)
};
