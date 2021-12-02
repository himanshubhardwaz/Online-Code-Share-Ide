import React from 'react'

const Avatar = ({ text, img, height = "12", textSize = "lg" }) => {
    return (
        <>
            {
                text ?
                    <div className={`m-1 mr-2 w-${height} h-${height} relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase`}>
                        <p className={`text-${textSize}`}>{text}</p>
                    </div> :
                    img ?
                        <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white">
                            <img src={img} className="rounded-full" alt="" />
                        </div> : null
            }
        </>
    )
}

export default Avatar
