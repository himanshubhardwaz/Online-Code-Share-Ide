import Avatar from "./../../components/Avatar"

// const people = [
//     {
//         name: 'Himanshu Bhardwaz',
//         title: 'Frontend intern',
//         department: 'Optimization',
//         role: 'Admin',
//         email: 'himanshu76200@gmail.com',
//         result: 'selected',
//         strengths: ['React', 'Node', 'Redux'],
//         weaknesses: ['CSS', 'JavaScript Basics']
//     },
//     {
//         name: 'Himanshu Bhardwaz',
//         title: 'Frontend intern',
//         department: 'Optimization',
//         role: 'Admin',
//         email: 'himanshu76200@gmail.com',
//         result: 'selected',
//         strengths: ['React', 'Node', 'Redux'],
//         weaknesses: ['CSS', 'JavaScript Basics']
//     },
//     {
//         name: 'Himanshu Bhardwaz',
//         title: 'Frontend intern',
//         department: 'Optimization',
//         role: 'Admin',
//         email: 'himanshu76200@gmail.com',
//         result: 'selected',
//         strengths: ['React', 'Node', 'Redux'],
//         weaknesses: ['CSS', 'JavaScript Basics']
//     },

//     // More people...
// ]

export default function Example({ data }) {

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Strength
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Weakness
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Score
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Results
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data?.interviews?.map((person) => (
                                    <tr key={person.email}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {/* <div className="flex-shrink-0 h-10 w-10"> */}
                                                {/* <img className="h-10 w-10 rounded-full" src={person.image} alt="" /> */}
                                                <Avatar text={person.name[0].toUpperCase()} size="10" />
                                                {/* </div> */}
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                    <div className="text-sm text-gray-500">{person.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {person.strengths.map(strength => (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mx-1">
                                                    {strength}
                                                </span>
                                            ))}
                                        </td>
                                        <td>
                                            {person.weaknesses.map(weakness => (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 mx-1">
                                                    {weakness}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{person.score} / 30</div>
                                            {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {
                                                person.result === 'selected' ?
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Selected
                                                    </span> :
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        Rejected
                                                    </span>
                                            }
                                        </td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </a>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}