function Footer() {
    const year = new Date().getFullYear();
    
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© {year} Course Content System. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300">Terms</a>
              <a href="#" className="hover:text-blue-300">Privacy</a>
              <a href="#" className="hover:text-blue-300">Help</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;