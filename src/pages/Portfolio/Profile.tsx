import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

interface PortfolioContact {
  id: number;
  email: string;
  phoneNumber: string;
  portfolioId: number;
  createdAt: string;
  updatedAt: string;
}

interface PortfolioProject {
  id: number;
  title: string;
}

interface Portfolio {
  id: number;
  about: string;
  artistCategory: string;
  coverPhoto: string;
  createdAt: string;
  experienceOverview: string;
  tagline: string;
  updatedAt: string;
  userId: number;
  experience: any[];
  education: any[];
}

interface PortfolioProps {
  portfolio: Portfolio;
  portfolioProject: { portfolioProjects: PortfolioProject[] }[];
  portfolioContact: { portfolioContacts: PortfolioContact[] }[];
  user: { firstName: string; lastName: string; profileImage: string };
}


export default function profile({ portfolio,

  portfolioContact,
  portfolioProject, user }: PortfolioProps) {
  // console.log('portfolioContact', portfolioContact);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "80%",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
            width: "50%",
          }}
        >
          <Typography sx={{ fontSize: "32px" }}>
            Bring your colours to life
          </Typography>
          <Typography
            sx={{ fontSize: "16px", mt: 2, fontFamily: "custom-regular" }}
          >
            {portfolio?.tagline}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              mt: 2,
            }}
          >
            <IconButton
              color="inherit"
              component="a"
              href={"https://facebook.com/"}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component="a"
              href={"https://x.com/"}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component="a"
              href={"https://linkedin.com/"}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component="a"
              href={"https://instagram.com"}
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            width: "40%",
          }}
        >
          <Box
            sx={{
              // backgroundImage: "url(/assets/Photography.jpg)",
              backgroundImage: `url(${user?.profileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "350px",
              width: "300px",
              zIndex: 1,
              justifySelf: "center",
            }}
          ></Box>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: "80%",
          margin: "auto",
          minHeight: "400px",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
            width: "50%",
          }}
        >
          <Typography sx={{ fontSize: "22px" }}>
            Professional Experience(s)
          </Typography>

          {portfolio?.experience?.map((experience: any, index: any) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "25px",
                  marginBottom: "10px",
                }}
              >
                <Typography>{experience?.title}</Typography>
                <Typography>{experience?.dateFrom}-{experience?.dateTo}</Typography>
              </div>

              <div
                style={{
                  fontFamily: "custom-regular",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                {experience?.description}
              </div>
            </div>
          ))}


          <Typography sx={{ fontSize: "22px", mt: 4, mb: 2 }}>
            Educational Qualification
          </Typography>

          {portfolio?.education?.map((education: any, index: any) => (
            <div key={index}>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "14px",
                  mt: 2,
                }}
              >
                {education.degree}
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "custom-regular",
                  fontSize: "14px",
                }}
              >
                {education.instituteName} {education.year} {education.location}
              </Typography>
            </div>
          ))}

        </Box>

        <Box
          sx={{
            width: "40%",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: "300px",
            }}
          ></Box>
          <Typography sx={{ fontSize: "22px", textAlign: "center" }}>
            {user?.firstName} {" "}{user?.lastName}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              background: "black",
              color: "white",
              fontSize: "16px",
              borderRadius: "44px",
              margin: "auto",
              marginTop: "10px",
              padding: "2px 25px",
              width: "fit-content",
            }}
          >
            {portfolio?.artistCategory}
          </Typography>

          <Typography
            sx={{
              marginTop: "15px",
              fontSize: "12px",
              lineHeight: 1.2,
              fontFamily: "custom-regular",
            }}
          >
            {portfolio?.experienceOverview}
          </Typography>

          <Typography
            sx={{
              marginTop: "15px",
              textAlign: "left",
            }}
          >
            Awards{" "}
            <FontAwesomeIcon
              style={{ fontSize: "12px", marginLeft: "4px" }}
              icon={faArrowUpRightFromSquare}
            ></FontAwesomeIcon>
          </Typography>

          <Typography
            sx={{
              fontFamily: "custom-regular",
              fontSize: "12px",
              textAlign: "left",
              marginTop: "5px",
            }}
          >
            Best Model 2016 Zoom Youth Award <br />
            Youth Icon 2019 Sime Youth Award
          </Typography>
          <Typography
            sx={{
              marginTop: "15px",
              textAlign: "left",
            }}
          >
            Projects
            <FontAwesomeIcon
              style={{ fontSize: "12px", marginLeft: "4px" }}
              icon={faArrowUpRightFromSquare}
            ></FontAwesomeIcon>
          </Typography>

          {portfolioProject?.[0]?.portfolioProjects?.map((project: any, index: any) => (
            <Typography
              key={index}
              sx={{
                fontFamily: "custom-regular",
                fontSize: "12px",
                textAlign: "left",
                marginTop: "5px",
              }}
            >
              {project?.title} <br />

            </Typography>
          ))}

          <Typography
            sx={{
              marginTop: "15px",
              textAlign: "left",
            }}
          >
            Contact
            <FontAwesomeIcon
              style={{ fontSize: "12px", marginLeft: "4px" }}
              icon={faArrowUpRightFromSquare}
            ></FontAwesomeIcon>
          </Typography>


          {portfolioContact?.[0]?.portfolioContacts?.map((contact: any, index: any) => (
            <div key={index}>
              <Typography sx={{ fontFamily: "custom-regular", fontSize: "12px", textAlign: "left" }}>
                Phone: {contact.phoneNumber} <br />
                Email: {contact.email}
              </Typography>
            </div>))}
        </Box>
      </div>
    </>
  );
}
