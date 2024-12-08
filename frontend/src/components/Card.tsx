import React from "react";
import {Course} from '../pages/Test';

interface CardProps {
    className?: string;
    course: Course;
  }

const Card: React.FC<CardProps> = ({className = "", course}) => {
    return (
            <div className={`card ${className}`}>
            <div>
          <div className="thumbnail h-44 rounded-md overflow-clip flex items-center">
          <img src={course.thumbnail} alt="" className="rounded-md" />
          </div>

          <div className="flex justify-between mt-2">
            <h3 className="title text-ellipsis line-clamp-2 h-min pr-2">
              {course.course_name}
            </h3>
            <div className="flex flex-col items-end">
            <div className="rating flex px-2 items-center rounded-md bg-amber-500 text-light text-[14px]">
                <p className="font-semibold pt-1 pr-1">4.9</p>
                <i className="material-icons text-[18px]">star</i>
              </div>
            <div className="duration flex text-sm my-2 text-gray-500 items-center">
                <p>{course.duration} Hrs</p>
              </div>
              </div>
          </div>
          <p className="description text-ellipsis line-clamp-3 my-1 text-sm leading-tight">
            {course.description}
          </p>
          </div>

          <div className="w-full">
         
          <div className="flex w-full justify-between">         
            <div className="views flex py-1 pr-2 items-center justify-between text-sm text-gray-500">
                <p className="pr-1">{course.views}</p>
                <i className="material-icons-outlined text-accent_light">visibility</i>
              </div>
              <p className="instructor text-sm my-1 text-gray-500">
              {course.instructor.name}
            </p>            
          </div>
          </div>
        </div>
    )
}

export default Card;