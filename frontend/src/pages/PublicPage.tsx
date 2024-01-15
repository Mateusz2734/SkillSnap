import Carousel from "../components/Carousel";
import Stack from "@mui/joy/Stack";

const Public = () => {
  const slides = [
    {
      heading: '🚀 Unlock Your Potential with SkillSnap! 🌟',
      paragraph: 'Ready to level up your skills and unleash your true potential? Look no further than SkillSnap – your ultimate platform for learning and growing.'
    },
    {
      heading: '🌐 Connect and Collaborate',
      paragraph: 'Join a vibrant community of learners just like you! Network, collaborate, and share insights with fellow skill enthusiasts from around the globe.'
    },
    {
      heading: '💡 Your Skills, Your Way',
      paragraph: 'Whether you\'re a coding maestro, design virtuoso, or business guru, SkillSnap offers a diverse range of courses tailored to your unique passions and career goals.'
    },
    {
      heading: '🚀 Stay Ahead of the Curve',
      paragraph: 'In a rapidly evolving world, staying ahead is key. SkillSnap empowers you to adapt and thrive, offering the latest in-demand skills to keep you at the forefront of your industry.'
    },
    {
      heading: '🔥 Unlock a World of Opportunities',
      paragraph: 'Skills are the currency of the future. With SkillSnap, you\'re not just learning – you\'re investing in yourself and unlocking a world of exciting opportunities.'
    },
    {
      heading: '🌈 SkillSnap: Where Skills Meet Success! 🌟',
      paragraph: 'Ready to embark on your learning journey? Join SkillSnap today and start turning your dreams into skills that propel you forward!'
    }
  ];
  return (
    <Stack minHeight="80vh" justifyContent="center">
      <Carousel slides={slides} />
    </Stack>
  );
};

export default Public;
