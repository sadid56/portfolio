import Container from "@/components/global/Container";
import { Timeline } from "@/components/sections/TimeLine/TimeLIne";
import EXPERIENCE from "@/data/experience";

const Experience = () => {
  return (
    <Container id='experience' className='relative pt-20 md:pt-28 pb-10 md:pb-48'>
      <Timeline data={EXPERIENCE} />
    </Container>
  );
};

export default Experience;
