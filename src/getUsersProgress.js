
// src/getUsersProgress.js
const axios = require('axios');

module.exports.getUsersProgress = async (event) => {
  try {
    const response = await axios.get('https://reqres.in/api/users');

    const courseProgress = {
      '1': 'Chapter 1',
      '2': 'Chapter 2',
      '3': 'Chapter 4',
      // 나머지 사용자에 대한 진행 상황
    };

    const usersWithProgress = response.data.data.map(user => {
      return {
        id: user.id,
        name: user.first_name + ' ' + user.last_name,
        progress: courseProgress[user.id] || 'Not started'
      };
    });

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