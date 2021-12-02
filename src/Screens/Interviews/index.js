import React from 'react'
import Header from './Header'
import axios from 'axios'

const Card = ({ candidateEmail, datetime }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-lg px-3 py-2 h-28 flex flex-col items-center justify-center">
            <p className="text-xl text-center text-gray-700 mt-4 mb-2">{candidateEmail}</p>
            <p className="text-base text-center text-gray-500 mb-2">at{" "}{datetime}</p>
        </div>
    )
}

const InterviewScreen = () => {
    const [interviews, setInterviews] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/scheduledInterviews/himanshu76200@gmail.com");
            console.log(data);
            setInterviews(data)
        }
        fetchData();
    }, [])

    return (
        <div>
            <Header />
            {interviews ? <>
                <div className="mx-8 my-8">
                    {typeof interviews === 'string' ? <p className="text-2xl">{interviews}</p> :
                        <div className="grid grid-cols-4 gap-8">
                            {interviews?.allInterviews.map(interview => (
                                <Card candidateEmail={interview.candidateEmail} datetime={interview.datetime} />
                            ))}
                        </div>
                    }
                </div>
            </> : null}

        </div>
    )
}

export default InterviewScreen
