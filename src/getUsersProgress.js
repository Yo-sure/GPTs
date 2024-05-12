

// src/getUsersProgress.js
const axios = require('axios');

// 코스 매핑 정보
const courses = {
    101: 'LLM application',
    102: 'ChatGPT 활용하기'
};

// AWS Lambda에서 event 객체를 사용하여 HTTP 요청을 처리
module.exports.getUsersProgress = async (event) => {
    try {
        // API Gateway를 통해 전달된 쿼리스트링 파라미터에서 courseId를 가져옴
        const courseIdQuery = event.queryStringParameters?.courseId;
        const courseName = courseIdQuery ? courses[courseIdQuery] : null;

        // 존재하지 않는 강의 ID인 경우 사용 가능한 강의 ID 목록을 반환
        if (courseIdQuery && !courseName) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    error: "Invalid Course ID",
                    availableCourseIds: Object.entries(courses).map(([id, name]) => ({ id, name }))
                })
            };
        }

        // reqres.in에서 사용자 목록을 가져옴
        const response = await axios.get('https://reqres.in/api/users');

        // 강의 진행 상황을 시뮬레이션하기 위한 임시 데이터
        const courseProgress = {
            '1': { courseName: 'LLM application', progress: 'Chapter 1' },
            '2': { courseName: 'ChatGPT 활용하기', progress: 'Chapter 2' },
            '3': { courseName: 'LLM application', progress: 'Chapter 4' },
            // 나머지 사용자에 대한 진행 상황
        };

        // 사용자 정보와 함께 강의 진행 상황을 매핑
        const usersWithProgress = response.data.data
            .map(user => {
                return {
                    id: user.id,
                    name: user.first_name + ' ' + user.last_name,
                    avatar: user.avatar,
                    progress: courseProgress[user.id]?.progress ?? 'Not started',
                    courseName: courseProgress[user.id]?.courseName ?? 'Not Registered'
                };
            })
            .filter(user => !courseName || user.courseName === courseName);

        // 결과를 JSON 형태로 반환
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usersWithProgress)
        };
    } catch (error) {
        console.error('Error fetching user list:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
};
