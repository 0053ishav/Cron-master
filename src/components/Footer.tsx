const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Side */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm">
            Made with <span className="text-blue-400">💙</span> by{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
              Cron Master
            </span>
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Cron Master. All rights reserved.
          </p>
        </div>

        {/* Right Side Links */}
        <div className="flex gap-4 text-sm">
          <a href="https://ishav.space" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
            Strnge Universe
          </a>
          <a href="https://linkedin-bio-optimizer.ishav.space" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
            LinkedIn Bio Optimizer
          </a>
          {/* <a href="https://projects.ishav.space" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
            Projects
          </a>
          <a href="https://cronmaster.ishav.space/privacy" className="hover:text-white underline">
            Privacy
          </a>
          <a href="https://cronmaster.ishav.space/terms" className="hover:text-white underline">
            T&C
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
