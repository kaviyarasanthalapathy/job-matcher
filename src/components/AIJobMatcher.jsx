import jobs from "./data/jobs"
import skills from "./data/skills";
import courses from "./data/courses";

function AIJobMatcher({ resumeText }) {
  // Safety check: ensure resumeText is a string
  if (!resumeText || typeof resumeText !== "string") return null;

  const text = resumeText.toLowerCase();

  // Candidate skills matched in the resume
  const candidateSkills = skills.filter(skill => text.includes(skill.toLowerCase()));

  // Job matching logic
  const jobMatches = jobs
    .map(job => {
      const matchedSkills = job.requiredSkills.filter(skill =>
        candidateSkills.includes(skill.toLowerCase())
      );

      const missingSkills = job.requiredSkills.filter(
        skill => !candidateSkills.includes(skill.toLowerCase())
      );

      const matchPercent = Math.round(
        (matchedSkills.length / job.requiredSkills.length) * 100
      );

      return { ...job, matchedSkills, missingSkills, matchPercent };
    })
    .filter(job => job.matchPercent > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent);

  if (jobMatches.length === 0) {
    return <p>No matching jobs found for your resume.</p>;
  }

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      {jobMatches.map(job => (
        <div className="job-card" key={job.title}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{job.title}</strong>
            <span className="match-percentage">
              {job.matchPercent}%
            </span>
          </div>

          <div>
            <strong>Matched Skills:</strong>{" "}
            {job.matchedSkills.length > 0 ? job.matchedSkills.join(", ") : "None"}
          </div>

          <div className="missing-skills">
            <strong>Missing Skills:</strong>{" "}
            {job.missingSkills.length > 0 ? job.missingSkills.join(", ") : "None"}
          </div>

          {/* Suggested Learning for missing skills */}
          {job.missingSkills.length > 0 && (
            <div>
              <strong>Suggested Learning:</strong>
              <ul>
                {job.missingSkills.map(skill =>
                  courses[skill.toLowerCase()] ? (
                    <li key={skill}>
                      <a
                        href={courses[skill.toLowerCase()].link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {courses[skill.toLowerCase()].name}
                      </a>
                    </li>
                  ) : (
                    <li key={skill}>{skill} (No course available)</li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AIJobMatcher;
