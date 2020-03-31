import React from 'react'

const Footer = () => (
  <footer className="container mx-auto px-3 pt-4 pb-4 text-gray-800 border-t-2 border-gray-300 lg:absolute bottom-0">
    <div className="flex -mx-2">
      <div className="flex-1 px-3">
        <p className="mt-5">
          Made by&nbsp;
          <a
            href="https://linkedin.com/in/cmbirk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chris Birk
          </a>
        </p>
      </div>
      <div className="flex-1 px-3 text-right pr-10">
        <h2 className="text-md font-semibold">Other Links</h2>
        <ul className="mt-4 leading-loose">
          <li>

            <a
              href="https://github.com/cmbirk/video-sync"
              className="text-gray-700 hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github mr-4" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
)

export default Footer
