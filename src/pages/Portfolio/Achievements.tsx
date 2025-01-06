import { Box, Typography } from "@mui/material";
import TestimonyCarousel from "./TestimonyCarousel";
interface PortfolioProps {

  portfolioAchivement: {
    portfolioAchivements: { achievements: any[], testimonies: any[] }[];

  }[];

}
const Achievements = ({ portfolioAchivement }: PortfolioProps) => {
  const testimonies = portfolioAchivement
    ?.flatMap((achivementGroup) =>
      achivementGroup.portfolioAchivements.flatMap((item) => item.testimonies)
    )
    .filter(Boolean);
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          //   fontSize: "22px",
          mb: 2,
        }}
      >
        Award & Honors
      </Typography>



      <Typography
        component="ul"
        sx={{
          fontFamily: "custom-regular",
          fontSize: "14px",
          textAlign: "center",
          marginTop: "5px",
          lineHeight: 1.8,
          listStyleType: "none", // Remove default bullets
          paddingLeft: 0, // Remove padding for list alignment
        }}
      >
        {portfolioAchivement?.map((achivementGroup, groupIndex) =>
          achivementGroup?.portfolioAchivements?.map(
            (achievement, achievementIndex) =>
              achievement?.achievements?.map((award, awardIndex) => (
                <li
                  key={`${groupIndex}-${achievementIndex}-${awardIndex}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{ marginRight: "8px", fontSize: "1.2em" }}
                  >
                    .
                  </span>
                  {award}
                </li>
              ))
          )
        )}
      </Typography>

      <Box>
        <TestimonyCarousel title="Testimonies" testimonials={testimonies} />
      </Box>
    </Box>
  );
};

export default Achievements;
