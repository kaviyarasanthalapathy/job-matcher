import { useState, useEffect } from "react";
import PdfUpload from "./components/PdfUpload";
import AIJobMatcher from "./components/AIJobMatcher";
import { FaFileUpload } from "react-icons/fa";
import Logo from "./assets/my-logo.png";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [showJobs, setShowJobs] = useState(false);
  const [userId, setUserId] = useState("");
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    const id = "res" + Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    setUserId(id);
  }, []);

  const handleReset = () => {
    setResumeText("");
    setShowJobs(false);
    setUploadCount(0);
  };

  const showReset = showJobs && resumeText;

  return (
    <div>
      <header className="navbar">
        <div className="navbar-left">
          <img
            className="navbar-logo"
            src={Logo}
            alt="Logo"
          />
          <span className="navbar-title">AI Resume Analyzer</span>
        </div>
        <div className="navbar-right">
          My Profile: {userId} 
         <span className="resume-count">
  <FaFileUpload className="mega-upload-icon" /> {uploadCount} Resume{uploadCount !== 1 ? 's' : ''}
</span>


        </div>
      </header>

      <div className="main-content">
        <PdfUpload 
          setResumeText={setResumeText} 
          incrementCount={() => setUploadCount(prev => prev + 1)}
        />
        {!resumeText && (
        <h3 className="note">Note: Please Upload a Resume in Image Type Only (JPG,PNG)</h3>
        )}
        <div className="buttons-wrapper">
          <button onClick={() => setShowJobs(true)}>
            Check Matching Jobs
          </button>

          {showReset && (
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>

        {showJobs && resumeText && <AIJobMatcher resumeText={resumeText} />}
      </div>

      {showJobs && resumeText && (
        <footer>
          <p>© 2026 - AI Resume Analyzer. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

export default App;
