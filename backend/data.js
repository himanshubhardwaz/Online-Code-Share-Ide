const users = [
    {
        name: 'Himanshu',
        password: 'password',
        email: 'himanshu76200@gmail.com',
        role: 'interviewer',
    },
    {
        name: 'Akash',
        password: 'password',
        email: 'user1@email.com',
        role: 'interviewee',
    }
]

function getUser() {
    return users;
}

module.exports.getUser = getUser;