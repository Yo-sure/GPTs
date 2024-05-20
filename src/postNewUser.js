// src/postNewUser

const axios = require("axios");

module.exports.postNewUser = async (event) => {
    const { name, lecture } = JSON.parse(event.body);

    // name과 lecture가 모두 요청 본문에 포함되어 있는지 검증
    if (!name || !lecture) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                error: 'Invalid input: name and lecture are required.',
                REQUEST_GUIDELINES_FOR_ASSISTANT: 'Invalid input: name and lecture are required.'
            })
        };
    }

    try {
        // 외부 API로 POST 요청 보냄
        const response = await axios.post('https://reqres.in/api/users', {
            name,
            lecture
        });

        // 외부 API로부터 받은 응답을 클라이언트로 보냄
        return {
            statusCode: 201,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: 'User created successfully',
                data: response.data,
                ADDITIONAL_INFORMATION_FOR_ASSISTANT: 'Celebrate the new user signup with all sorts of bells and whistles.',  
                RESPONSE_FORMATTING_GUIDELINES_FOR_ASSISTANT: 'Name and lecture must be MD title format.',
            })
        };
    } catch (error) {
        // 에러 처리
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: 'Error while creating user',
                error: error.message,
                ADDITIONAL_INFORMATION_FOR_ASSISTANT: 'Please contact the administrator at \'jaewng.yun@samsung.com\'.'
            })
        };
    }
};
