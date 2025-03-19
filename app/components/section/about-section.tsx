import SectionContainer from "@/app/components/container/section-container";
import Image from "next/image";

const AboutSection = () => {
  return (
    <SectionContainer>
      <Image
        alt={"Personal Photo"}
        height={100}
        width={100}
        className="rounded-md"
        src={
          "https://media.istockphoto.com/id/1262277544/vector/head-of-bearded-man-in-profile.jpg?s=612x612&w=0&k=20&c=eHazvzWaOpwkzcI-_-nJwoS72xeaAKEj_F_czcDSMFQ="
        }
      />
    </SectionContainer>
  );
};

export default AboutSection;
