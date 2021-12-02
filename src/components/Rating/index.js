import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StarIcon as FilledStar } from "@heroicons/react/solid";
import { StarIcon as EmptyStar } from "@heroicons/react/outline"

const Rating = props => {
    const [rating, setRating] = useState(
        () => props.rating
    );

    const handleClick = index => {
        setRating(index + 1);
    };

    const { onChange } = props;

    useEffect(() => {
        if (onChange) {
            onChange(rating)
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating])

    return (
        <div className="flex">
            {
                [...Array(5)].map((_element, index) => (
                    (index + 1) <= rating ?
                        <FilledStar
                            className={`h-${props.height}  text-yellow-300 cursor-pointer`}
                            key={index}
                            onClick={props.isEditable ?
                                () => handleClick(index) :
                                null}
                        /> :
                        <EmptyStar
                            className={`h-${props.height}  text-yellow-300 cursor-pointer`}
                            key={index}
                            onClick={props.isEditable ?
                                () => handleClick(index) :
                                null}
                        />
                ))
            }
        </div>
    )
}

Rating.defaultProps = {
    isEditable: false,
    rating: 1,
    height: 8,
}

Rating.propTypes = {
    isEditable: PropTypes.bool,
    rating: PropTypes.number,
}

export default Rating
