import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { SetStateAction, useEffect, useRef, useState } from "react";
import color from "../../components/utils/Colors";
import { getAllPostJob } from "../../services/services";
import "../Home.css";
import JobBoard from "./JobBoard";

const slideInAnimation = keyframes`
  from {
    transform: translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Career: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.disconnect();
    };
  }, []);

  const [job, setJob] = useState([]);
  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllPostJob(payLoad).then(
      (res: { data: { data: { rows: SetStateAction<never[]> } } }) => {
        setJob(res?.data?.data?.rows);
      }
    );
  }, []);

  return (
    <>
      <div>
        <Box
          sx={{
            backgroundImage: "url(/assets/Career.jpg)",
            // background: '#fff',
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: "space-around",
            mt: { xs: "-54px", md: "-94px" },
            alignItems: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.6))",
              //   backdropFilter: "blur(2px)",
              zIndex: 1,
            },
          }}
        >
          <Box
            ref={ref}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              zIndex: 2,
              marginLeft: "2%",

              animation: isVisible
                ? `${slideInAnimation} 1s ease forwards`
                : "none",
              // alignItems:'center'
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "48px",
                textAlign: "left",
                lineHeight: 1.1,
              }}
            >
              Looking for career?
            </Typography>

            <Typography
              style={{ marginTop: "15px", color: "white" }}
              //   id="custom-button"
            >
              We're looking for passionate people to join us on our mission. We
              value flat hierarchies, clear communication, and full ownership
              and responsibility.
            </Typography>
          </Box>

          <Box
            sx={{
              marginTop: "20px",
              zIndex: 2,
              color: "white",
              marginRight: { xs: "0px", sm: "40px" },

              backgroundImage: "url(/assets/Acting.jpg)",
              border: "solid 1px white",
              backgroundPosition: "center-left",
              position: "relative",
            }}
            className="card"
          >
            <Typography
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                p: 0,
                pb: 1,
                pt: 0.2,
                pl: 1,
                borderBottomLeftRadius: "6px",
                borderTopRightRadius: "6px",
                width: "80px",
                height: "20px",
                background: color.textColor1,
                zIndex: 101,
                fontSize: "12px",
                color: "white",
              }}
            >
              #Trending
            </Typography>
            <div style={{ position: "relative" }} className="card-content">
              <Typography className="card-title">Film Audition</Typography>
              <p className="card-body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
                culpa.
              </p>
              <Button
                id="custom-button"
                style={{ marginLeft: "0px", fontSize: "16px" }}
              >
                Learn More
              </Button>
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            // background: color.firstColor,
            background: "#fff",
            py: 6,
          }}
        >
          <JobBoard jobs={job}></JobBoard>
        </Box>
      </div>
    </>
  );
};
