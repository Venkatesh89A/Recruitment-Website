import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import Education from "../components/profile/Education";
import Skills from "../components/profile/Skills";
import ResumeSection from "../components/profile/ResumeSection";
import SocialLinks from "../components/profile/SocialLinks";

const Profile = () => {
  return (
    <div className="space-y-6">
      <ProfileHeader />

      <PersonalInfo />

      <Education />

      <Skills />

      <ResumeSection />

      <SocialLinks />
    </div>
  );
};

export default Profile;