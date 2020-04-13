import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

const Modal = ({
  children,
  isOpen = false,
  label = 'Modal Label',
}) => {
  ReactModal.setAppElement('#__next')

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={label}
    >
      <div>
        {children}
      </div>
    </ReactModal>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
}

export default Modal
