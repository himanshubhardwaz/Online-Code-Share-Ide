import React from 'react'
import Header from "./Header"
import Table from "./Table"
import axios from 'axios'

const Card = ({ header, body, footer }) => {
    return (
        <div className="bg-gray-100 shadow-lg px-3 py-3 rounded-2xl">
            <p className="text-center text-gray-500 text-xl mt-2">{header}</p>
            <p className="text-center text-5xl mt-2 font-semibold">{body}</p>
            <p className="text-center text-gray-500 text-base mt-2">{footer}</p>
        </div>
    )
}

const Dashboard = () => {
    const [data, setData] = React.useState();
    const [role, setRole] = React.useState("frontend-intern");

    React.useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data, error } = await axios.get(`/interviews/himanshu76200@gmail.com/${role}`, { email: 'himanshu76200@gmail.com', role: role }, config);
            setData(data);
            console.log(data, error, "Data error");
        }
        fetchData();
    }, [role])

    const handleChange = (event) => {
        setRole(event.target.value);
    }

    return (
        <>
            <Header />
            {
                data ?

                    <>
                        <div className="w-full">
                            <div className="grid grid-cols-1 justify-items-end my-2 mx-2">
                                <div className="flex items-center">
                                    <p className="text-xl text-gray-400 mr-3">Select role: </p>
                                    <select
                                        value={role}
                                        onChange={handleChange}
                                        className=""
                                    >
                                        <option value="frontend-intern">Frontend Intern</option>
                                        <option value="SDE-1">SDE 1</option>
                                    </select>
                                </div>
                            </div>

                            {
                                data?.message === "No data found" ?
                                    <p className="text-2xl font-semibold">
                                        Sorry no data available for this role
                                    </p> :
                                    <>
                                        <div className="grid grid-cols-3 w-4/5 gap-8 mt-2 mx-8">
                                            <Card
                                                header="Total Interviews taken"
                                                body={data?.cardData?.total.number}
                                                footer={`${data?.cardData?.total.liked} people rated their interview as nice experience`}
                                            />
                                            <Card
                                                header="Total Candidates Recommended"
                                                body={<p className="text-green-500 font-semibold">{data?.cardData?.recommended.number}</p>}
                                                footer={<>Average Score of recommended candidates was {" "}<span className="font-semibold text-lg">{data?.cardData?.recommended.score}</span></>}
                                            />
                                            <Card
                                                header="Total Candidates Rejected"
                                                body={<p className="text-red-500 font-semibold">{data?.cardData?.rejected.number}</p>}
                                                footer={<>Average Score of rejected candidates was {" "}<span className="font-semibold text-lg">13</span></>}
                                            />
                                        </div>

                                        <div className="mx-8 my-8">
                                            <p className="text-xl text-gray-500 my-2">All Interviews: </p>
                                            <Table data={data} />
                                        </div>
                                    </>
                            }
                        </div>
                    </> : null
            }
        </>
    )
}

export default Dashboard
