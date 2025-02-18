import { useParams } from "react-router-dom";
import FinalResumeSkeleton from "@/components/FinalResumeSkeleton";
import { useCandidates } from "@/hooks/useCandidiates";
import {
  AdvancedEducation,
  CandidateCareer,
  CareerInterest,
  EducationHistory,
  JobExperience,
} from "@/types";
import { getCountryNameFromISO, getDemonymFromISO } from "@/lib/utils";
import "../index.css";

const ResumePdf = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return;
  }

  const {
    singleCandidate: formData,
    singleCandidateLoading,
    singleCandidateError,
  } = useCandidates(id);

  if (singleCandidateLoading) {
    return <FinalResumeSkeleton />;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }
  // const jobExperiences = formData?.job_experience as
  //   | JobExperience[]
  //   | undefined;

  // const jobTitles =
  //   jobExperiences &&
  //   jobExperiences
  //     .filter((experience: JobExperience) => experience.job_title)
  //     .map((experience: JobExperience) => experience.job_title);

  // const uniqueJobTitles = Array.from(new Set(jobTitles));

  // const renderedJobTitles: string = uniqueJobTitles[0];

  return (
    <div className="resume-class">
      <div className="resume-flex-container">
        <h1 className="resume-username">
          <span>{formData?.first_name}</span>
          <span>&nbsp;</span> {/* Explicit space */}
          <span>{formData?.middle_name}</span>
          <span>&nbsp;</span> {/* Explicit space */}
          <span>{formData?.last_name}</span>
        </h1>
        <div className="flex-items-center-gap-3 flex-wrap justify-center">
          <div className="flex items-center justify-center gap-1">
            ✉️
            <p className="text-sm text-blue">{formData?.email_address}</p>
          </div>
          <p className="font-semibold">|</p>
          <div className="flex items-center justify-center gap-1">
            📞
            <p className="text-sm">{formData?.phone_number}</p>
          </div>
          <p className="font-semibold">|</p>
          <div className="flex items-center justify-center gap-1">
            🌎
            <p className="text-sm">
              {formData?.city_of_birth}, {formData?.state_of_birth} State,{" "}
              {getCountryNameFromISO(formData?.country_of_birth)}
            </p>
          </div>
        </div>

        <div className="flex-items-center-gap-3">
          <p className="small-bold">{formData?.career[0].sector}</p>
          <p className="font-semibold">|</p>
          <p className="small-bold">Global Citizen</p>
          <p className="font-semibold">|</p>
          <p className="small-bold">{formData?.career[0].profession}</p>
        </div>
      </div>

      <div className="resume-inner-container">
        <h2 className="resume-title-text">CAREER STRATEGIC PURPOSE</h2>
        <p className="text-sm">
          {formData?.career_strategic_purpose || "Not Generated"}
        </p>
      </div>

      <div className="resume-inner-container">
        <h2 className="resume-title-text">PERSONAL BIODATA</h2>
        <div>
          <div className="flex">
            <p className="font-bold width-200-text-sm">Date of Birth:</p>
            <p className="width-200-text-sm">{formData?.birth_date}</p>
          </div>
          <div className="flex">
            <p className="font-bold width-200-text-sm">Gender:</p>
            <p className="width-200-text-sm">{formData?.gender}</p>
          </div>
          <div className="flex">
            <p className="font-bold width-200-text-sm">Nationality:</p>
            <p className="width-200-text-sm">
              {getDemonymFromISO(formData?.country_of_birth)}
            </p>
          </div>
          <div className="flex">
            <p className="font-bold width-200-text-sm">Interests:</p>
            <p className="text-sm">
              {formData?.career
                ?.flatMap((item: CandidateCareer) =>
                  item.career_interests
                    .slice(0, 3)
                    .map((interest: CareerInterest) => interest.name)
                )
                .join(", ") || "Not Provided"}
            </p>
          </div>

          <div className="flex">
            <p className="font-bold width-200-text-sm">Preferred Call Name:</p>
            <p className="width-200-text-sm capitalize">
              {formData?.preferred_call_name || "Not Provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="resume-inner-container">
        <h2 className="resume-title-text">WORK EXPERIENCE</h2>
        {formData?.job_experience
          .map((experience: JobExperience) =>
            experience.business_name ? (
              <div key={experience.id} className="mb-2">
                <div>
                  <p className="font-bold text-sm">
                    {experience.business_name}: {experience.job_title}
                  </p>
                  <div className="flex-items-center-gap-3">
                    <p className="font-medium text-sm">
                      📍 Location: {experience.state}, {experience.country}
                    </p>
                    <p className="font-semibold">|</p>
                    <p className="font-medium text-sm">
                      📅 Duration: {experience.year_started} -{" "}
                      {experience.year_ended === "1960-01-01"
                        ? "Till Date"
                        : experience.year_ended || "Till Date"}
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="text-red font-bold text-sm">
                    Job Description and Key Achievements
                  </p>
                  <p className="text-sm">{experience.job_summary}</p>
                </div>
              </div>
            ) : null
          )}
      </div>

      <div className="resume-inner-container">
        <h2 className="resume-title-text">EDUCATION AND TRAINING</h2>
        {formData?.education?.map((item: EducationHistory) => (
          <div key={item.id} className="my-1">
            <p className="capitalize small-bold">
              {item.degree_type} ({item.specific_course_of_study}){" "}
            </p>
            <div className="text-sm flex-items-center-gap-3">
              {item.school_name}, {getCountryNameFromISO(item.country)}{" "}
              <p className="font-semibold">|</p>
              <p className="font-semibold">Graduated {item.graduation_date}</p>
            </div>
          </div>
        ))}
        {formData?.advanced_education?.map((item: AdvancedEducation) =>
          item.admission_date === null || !item.advanced_degree_type ? null : (
            <div key={item.id}>
              <div className="font-semibold flex-items-center-gap-3 text-sm capitalize">
                {item.advanced_degree_type} ({item.graduate_type}){" "}
                <p className="font-semibold">|</p>
                Graduated {item.graduation_date}
              </div>
              <p className="text-sm">
                {item.school_name}, {getCountryNameFromISO(item.country)}
              </p>
            </div>
          )
        )}
      </div>

      <div className="resume-inner-container">
        <h2 className="resume-title-text">REFERENCES</h2>
        <p className="text-sm">Available on request</p>
      </div>
    </div>
  );
};

export default ResumePdf;
