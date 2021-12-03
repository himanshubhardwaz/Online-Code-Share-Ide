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

const interviews = [
    {
        interviewee: 'himanshu76200@gmail.com',
        role: 'frontend-intern',
        cardData: {
            total: {
                number: 2,
                liked: 1
            },
            recommended: {
                number: 1,
                score: 27
            },
            rejected: {
                number: 1,
                score: 12
            }
        },
        interviews: [
            {
                name: 'Akash Mohan',
                title: 'Frontend intern',
                department: 'Optimization',
                role: 'Admin',
                email: 'akash@gmail.com',
                result: 'selected',
                score: '27',
                strengths: ['React', 'Node', 'Redux'],
                weaknesses: ['CSS', 'JavaScript Basics']
            },
            {
                name: 'Virat Kohli',
                title: 'Frontend intern',
                department: 'Optimization',
                role: 'Admin',
                email: 'virat@gmail.com',
                score: '12',
                result: 'rejected',
                strengths: ['Problem solving', 'JavaScript'],
                weaknesses: ['unsureness']
            },
        ]
    }
]

const scheduledInterviews = [];

const projects = []

function getUser() {
    return users;
}

function getProjects() {
    return projects;
}

function getInterviews() {
    return interviews;
}

function getScheduledInterviews() {
    return scheduledInterviews;
}

module.exports.getUser = getUser;
module.exports.getProjects = getProjects;
module.exports.getInterviews = getInterviews;
module.exports.getScheduledInterviews = getScheduledInterviews;