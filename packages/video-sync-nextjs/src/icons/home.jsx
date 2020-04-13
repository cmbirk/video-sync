import React from 'react'
import PropTypes from 'prop-types'

const HomeIcon = ({ className = '' }) =>
  (
  <svg
    className={`${className} h-6 w-6`}
    viewBox="0 0 90.81386160663541 60"
    fill="currentColor"
  >
    <g
      transform="matrix(0.9586195854565627,0,0,0.9586195854565627,-7.850134875281384,-6.599137058068173)"
      stroke="none"
    >
      <path d="M102.923 54.276l-6.311 6.407-41.002-41.05-41.026 41.05-6.395-6.407L55.584 6.887l.071.068.249-.071L75.281 26.08V12.474h8v22.35z"></path>
        <path d="M47.281 40.474h17v29h-17z"></path>
    </g>
  </svg>
  )

HomeIcon.propTypes = {
  className: PropTypes.string,
}

export default HomeIcon
