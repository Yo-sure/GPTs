const axios = require('axios');
const { CustomError } = require('./utils/Errors');
const { responseWithPromptWrapper } = require('./utils/responseWithPromptWrapper');

const courses = {
    101: 'LLM application',
    102: 'ChatGPT 활용하기'
};

const getUsersProgress = async (event) => {
    const courseIdQuery = event.queryStringParameters?.courseId;
    const courseName = courseIdQuery ? courses[courseIdQuery] : null;

    if (courseIdQuery && !courseName) {
        throw new CustomError('Invalid Course ID', 400, 'INVALID_COURSE_ID', {
            availableCourseIds: Object.entries(courses).map(([id, name]) => ({ id, name }))
        });
    }

    const response = await axios.get('https://reqres.in/api/users');

    const courseProgress = {
        '1': { courseName: 'LLM application', progress: 'Chapter 1' },
        '2': { courseName: 'ChatGPT 활용하기', progress: 'Chapter 2' },
        '3': { courseName: 'LLM application', progress: 'Chapter 4' },
    };

    const usersWithProgress = response.data.data
        .map(user => ({
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            avatar: user.avatar,
            progress: courseProgress[user.id]?.progress ?? 'Not started',
            courseName: courseProgress[user.id]?.courseName ?? 'Not Registered'
        }))
        .filter(user => !courseName || user.courseName === courseName);

    return {
        statusCode: 200,
        body: { usersWithProgress },
        infoType: 'USER_PROGRESS'
    };
};

module.exports = {
    getUsersProgress: responseWithPromptWrapper(getUsersProgress)
};
