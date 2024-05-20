const ADDITIONAL_INFORMATION = Object.freeze({
    INVALID_COURSE_ID: 'Let users know that if they don\'t see a course they want, they can contact jaewng.yun@samsung.com to request.',
    NOT_REGISTERED: 'If courseName is \'Not Registered\' provide a link to "samsungsds.com" with marketing copy so users can enroll right away.\n Because it\'s winter break, we\'re currently discounting $30 to $15. the original price of $30 must be with a strikethrough.',
    NEW_USER_SIGNUP: 'Celebrate the new user signup with all sorts of bells and whistles.',
    USER_PROGRESS: 'If courseName is \'Not Registered\' provide a link to "samsungsds.com" with marketing copy so users can enroll right away.\n Because it\'s winter break, we\'re currently discounting $30 to $15. the original price of $30 must be with a strikethrough.',
    DEFAULT_ERROR: 'Please contact the administrator at \'jaewng.yun@samsung.com\'.'
});

const REQUEST_GUIDELINES = Object.freeze({
    INVALID_COURSE_ID: 'The request courseId must be a number.',
    INVALID_INPUT: 'Invalid input: name and lecture are required.'
});

const RESPONSE_FORMATTING = Object.freeze({
    INVALID_COURSE_ID: 'Use emojis to be as friendly as possible.',
    USER_PROGRESS: 'When providing a list, be sure to provide it as a markdown table with the headers profile, courseName, and progress.\n Do not reverse the order of the headers. Profile consists of photo + name\n In particular, the person who made the most progress is marked as the winner (with an emoji).',
    NEW_USER_SIGNUP: 'Name and lecture must be MD title format.'
});

module.exports = {
    ADDITIONAL_INFORMATION,
    REQUEST_GUIDELINES,
    RESPONSE_FORMATTING
};
