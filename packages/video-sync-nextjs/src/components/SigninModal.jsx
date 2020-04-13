import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '@utils/auth/initFirebase'

initFirebase()

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
}

const Modal = ({
  isOpen = false,
  label = 'Sign In',
}) => {
  const [renderAuth, setRenderAuth] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])

  ReactModal.setAppElement('#__next')

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={label}
    >
      <div>
        { renderAuth ? (
          <StyledFirebaseAuth
            uiConfig={firebaseAuthConfig}
            firebaseAuth={firebase.auth()}
          />
        ) : null }
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
