import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { SetStateAction, useEffect, useRef, useState } from "react";
import EntityCategory from "../../components/utils/Category";
import color from "../../components/utils/Colors";
import "../Home.css";
import ArtistTestimony from "./ArtistTestimony";
import TopArtists from "./TopArtists";
import { getAllArtist } from "../../services/services";
import {
  artCategories,
  artistCategoryTypes,
} from "../../components/utils/data";

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

export const Artists: React.FC = () => {
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

  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllArtist(payLoad)
      .then((res: { data: { data: { rows: SetStateAction<never[]> } } }) => {
        // console.log(res.data)
        setArtist(res?.data?.data?.rows);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <Box
          sx={{
            backgroundImage: "url(/assets/artist-banner.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: { xs: "column-reverse",md:'row'},
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
                "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))",
              backdropFilter: "blur(2px)",
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
                marginLeft: "10%",
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
                // pl: 6,
              }}
            >
              You've came to <br /> right place!
            </Typography>

            <Typography
              style={{ marginTop: "15px",   marginLeft: "0px"
               }}
              id="custom-button"
            >
              Become an Artist{" "}
              <FontAwesomeIcon
                id="custom-button-icon"
                icon={faArrowRight}
              ></FontAwesomeIcon>
            </Typography>
          </Box>

          <Box
            sx={{
              // display:{xs:'none', sm:'block'},
              zIndex: 2,
              color: "white",
              marginRight: {xs:'0px', sm:"40px"},
              backgroundImage: "url(/assets/artist-5.png)",
              border: "solid 1px white",
            }}
            className="card"
          >
            <div className="card-content">
              <Typography className="card-title">Beyonce</Typography>
              <p className="card-body">
                Beyoncé, a Grammy-winning icon, excels in music, film, and
                activism, empowering women and inspiring global audiences
                through her artistry.
              </p>
              {/* <Button
                id="custom-button"
                style={{ marginLeft: "0px", fontSize: "16px" }}
              >
                Learn More
              </Button> */}
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
          }}
        >
          <TopArtists variant="heading1" artist={artist}></TopArtists>

          <Typography
            className="heading"
            style={{ background: "black" }}
            sx={{
              background: color.firstColor,
              padding: "10px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Artists Categories
          </Typography>

          <EntityCategory categories={artistCategoryTypes} />

          <ArtistTestimony></ArtistTestimony>
        </Box>
      </div>
    </>
  );
};
