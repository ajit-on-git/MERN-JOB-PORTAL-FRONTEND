import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white text-black py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-lg font-bold">Job Hunt</p>
        <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Job Hunt. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
