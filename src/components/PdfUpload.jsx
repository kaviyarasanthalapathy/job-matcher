import { useState } from "react";
import Tesseract from "tesseract.js";
import { FaFileUpload } from "react-icons/fa";

function PdfUpload({ setResumeText, incrementCount }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const { data } = await Tesseract.recognize(reader.result, "eng");
        setResumeText(data.text);
        incrementCount();
      } catch {
        alert("Failed to extract text");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="file-upload-wrapper">
      <label>
        <input type="file" accept=".pdf,.jpg,.png" onChange={handleFile} />
        <span className="upload-btn">
          <FaFileUpload className="mega-upload-icon" /> Upload Resume
        </span>
      </label>
      {uploading && <p>Processing resume...</p>}
    </div>
  );
}

export default PdfUpload;
