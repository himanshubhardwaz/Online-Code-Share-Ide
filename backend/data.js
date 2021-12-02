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
                number: 3,
                liked: 2
            },
            recommended: {
                number: 1,
                score: 27
            },
            rejected: {
                number: 2,
                score: 16
            }
        },
        interviews: [
            {
                name: 'Himanshu Bhardwaz',
                title: 'Frontend intern',
                department: 'Optimization',
                role: 'Admin',
                email: 'himanshu76200@gmail.com',
                result: 'selected',
                score: '28',
                strengths: ['React', 'Node', 'Redux'],
                weaknesses: ['CSS', 'JavaScript Basics']
            },
            {
                name: 'Himanshu Bhardwaz',
                title: 'Frontend intern',
                department: 'Optimization',
                role: 'Admin',
                email: 'himanshu76200@gmail.com',
                result: 'rejected',
                score: '22',
                strengths: ['State management', 'Caching'],
                weaknesses: ['communication skill']
            },
            {
                name: 'Himanshu Bhardwaz',
                title: 'Frontend intern',
                department: 'Optimization',
                role: 'Admin',
                email: 'himanshu76200@gmail.com',
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