import React from 'react'

const Testimonial = ({testimonial}) => {
  return (
    <div className="flex items-center p-6 bg-white rounded-lg shadow-md mx-4 min-w-[300px]">
       
        <div>
          <p className="text-gray-600">
            {testimonial?.text}
          </p>
          <p className="mt-4 font-bold text-end text-gray-800">- {testimonial?.name}</p>
        </div>
      </div>
  )
}

export default Testimonial
