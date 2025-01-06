import {
  faCalendar,
  faChevronCircleRight,
  faFileAlt,
  faMusic,
  faQuoteLeft,
  faQuoteRight,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Avatar, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import color from "./Colors";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface CustomArrowProps {
  onClick?: () => void;
}

const CustomLeftArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: 10,
      top: "45%",
      transform: "translateY(-50%)",
      background: color.thirdColor,
      color: "black",
      transition: "all 0.3s ease",
      boxShadow: "-5px -5px 10px rgba(0, 0, 0, 0.13) inset",

      "&:hover": {
        background: "rgba(0, 0, 0, 0.47)",
        color: "white",
      },
    }}
  >
    <ArrowBackIosIcon sx={{ translate: "5px 0px", fontSize: "24px" }} />
  </IconButton>
);

const CustomRightArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: 10,
      top: "45%",
      transform: "translateY(-50%)",
      background: color.thirdColor,
      color: "black",
      transition: "all 0.3s ease",
      boxShadow: "-5px -5px 10px rgba(0, 0, 0, 0.13) inset",

      "&:hover": {
        background: "rgba(0, 0, 0, 0.47)",
        color: "white",
      },
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

interface CoursesCarouselProps {
  textused: boolean;
}

const CoursesCarousel: React.FC<CoursesCarouselProps> = ({ textused }) => {
  const newsData = [
    {
      id: 1,
      imageUrl: "/assets/news-2.jpeg",
      title:
        "Amin is another niche-specific news website template. This template is designed for gaming news sites. Stylish fonts and bright colors give this template a typical gaming website look. Elements are made sharper to give a sturdy look to the template.",
      date: "Aug 10, 2019",
      author: "Ramael Rogers",
      theme: "red",
      type: "video",
    },
    {
      id: 2,
      imageUrl: "/assets/news-3.jpeg",
      title: "This is a sample title for ",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
      theme: "#C70039",
      type: "video",
    },
    {
      id: 3,
      imageUrl: "/assets/news-1.jpeg",
      title:
        "This is a sample title for the second news item. It contains different content to test the layout and dynamic rendering.",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
      theme: "#a5b702",
      type: "document",
    },
    {
      id: 4,
      imageUrl: "/assets/news-5.jpeg",
      title:
        "This is a sample title for the second news item. It contains different content to test the layout and dynamic rendering.",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
      theme: "#e5752d",
      type: "audio",
    },
    {
      id: 5,
      imageUrl: "/assets/news-6.jpeg",
      title:
        "This is a sample title for the second news item. It contains different content to test the layout and dynamic rendering.",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
      theme: "#51c1e7",
      type: "document",
    },
  ];

  return (
    <div
      style={
        {
          // background: color.firstColor,
          // background:'white',
          // padding: "20px",
        }
      }
    >
      {textused && (
        <>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Rosttel",
              fontSize: "60px",
              marginBottom: "-54px",
              color: "white",
            }}
          >
            Artist's
          </Typography>

          <Box
            style={{ textAlign: "center" }}
            sx={{
              px: 2,
              borderRadius: "12px",
              fontSize: "12px",
              color: "white",
              width: "fit-content",
              margin: "auto",
              mb: 4,
              py: 2,
            }}
          >
            <Typography
              style={{ background: color.headingBg }}
              className="heading"
            >
              Top Courses
            </Typography>
            <FontAwesomeIcon
              style={{
                color: color.textColor,

                marginBottom: "6px",
                marginRight: "5px",
                fontSize: "14px",
              }}
              icon={faQuoteLeft}
            />

            <span style={{ marginTop: "44px" }}>
              Artists' courses provide essential skills and creative insights,
              offering structured guidance for all levels—from beginners to
              advanced creators. These courses cover a wide range of
              disciplines, such as painting, digital art, music production, and
              multimedia storytelling. Taught by industry experts, they delve
              into techniques, tools, and trends, encouraging artists to explore
              their style and push creative boundaries. By learning from
              experienced mentors, participants gain practical knowledge and
              inspiration, refining their craft and expanding their professional
              networks. These courses empower artists to bring their visions to
              life and excel in today’s competitive creative industries.
            </span>

            <FontAwesomeIcon
              style={{
                color: color.textColor,
                marginLeft: "5px",
                marginBottom: "4px",
                fontSize: "12px",
              }}
              icon={faQuoteRight}
            />
          </Box>
        </>
      )}
      {/* <Typography
        style={{ textAlign: "center" }}
        sx={{
          px: 16,
          borderRadius: "12px",
          fontSize: "24px",
          // fontFamily: "Custom-regular",
          color: "white",
          width: "fit-content",
          margin: "auto",
          mx: 8,
          mb: 4,
          boxShadow: "-5px -5px 15px #fdb50090 inset",
        }}
      >
        <FontAwesomeIcon
          style={{
            color: "black",
            marginBottom: "12px",
            marginRight: "5px",
            fontSize: "18px",
          }}
          icon={faQuoteLeft}
        />
        Spotlighting Featured Artists: Celebrating Innovative Creators Shaping
        Music, Visual Arts, and Media
        <FontAwesomeIcon
          style={{
            color: "black",

            marginLeft: "5px",
            marginBottom: "12px",
            fontSize: "18px",
          }}
          icon={faQuoteRight}
        />
      </Typography> */}

      <Box
        sx={{
          m: 2,
          // p: 2,
          borderRadius: "12px",
          position: "relative",
          // background: "black",
        }}
      >
        <Carousel
          responsive={responsive}
          infinite
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          draggable={false}
          //   autoPlay={true}
        >
          {newsData.map((news, index) => (
            <Box
              key={news.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                background: color.thirdColor,
                color: "black",
                borderRadius: "12px",
                minWidth: "95%",
                overflow: "hidden",
                margin: "5px",
                padding: "2px",
                paddingBottom: "5px",
                transition: "all 0.4s ease",

                "&:hover": {
                  boxShadow: "-2px -2px 20px rgba(0, 0, 0, 0.56) inset",
                },
                "&:hover .imageBox": {
                  transform: "translateY(-20px)",
                  // boxShadow: "-2px -2px 20px rgba(0, 0, 0, 0.56) inset",
                },
              }}
            >
              <Box
                className="imageBox"
                sx={{
                  backgroundImage: `url(${news.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center-top",
                  backgroundRepeat: "no-repeat",
                  minWidth: "85px",
                  height: "150px",
                  borderRadius: "10px",
                  transition: "all 0.4s ease",
                }}
              ></Box>

              <div
                className="imageBox"
                style={{
                  padding: "5px",
                  paddingTop: "0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.4s ease",
                }}
              >
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "black",
                    marginTop: "10px",
                    WebkitLineClamp: 2,
                    // minHeight:'28px'
                  }}
                  id="r-news-head-horz"
                >
                  {news.title}
                </Typography>

                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    id="r-news-date"
                    style={{ background: "black", color: "white" }}
                  >
                    <FontAwesomeIcon icon={faCalendar} /> {news.date}
                  </Typography>
                  <Typography
                    id="r-news-date"
                    style={{ background: "black", color: "white" }}
                  >
                    {news.type === "Audio" && (
                      <FontAwesomeIcon icon={faMusic} />
                    )}
                    {news.type === "Video" && (
                      <FontAwesomeIcon icon={faVideo} />
                    )}
                    {news.type === "Document" && (
                      <FontAwesomeIcon icon={faFileAlt} />
                    )}
                    {news.type}
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    // padding:'0px 10px',
                    paddingRight: "5px",
                    marginTop: "10px",
                    marginBottom: "5px",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      color: "black",
                    }}
                  >
                    <Avatar
                      style={{
                        height: "24px",
                        width: "24px",
                        background: "black",
                      }}
                    ></Avatar>
                    <Typography>{news.author}</Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // gap: "5px",
                      // // margin: "10px 0px",
                      // marginBottom:'5px',
                      // background: "white",
                      // color: news.theme,
                      // borderRadius: "12px",
                      // padding: "0px 15px",
                    }}
                  >
                    {/* <Typography style={{fontSize:'12px'}}>Enter</Typography> */}
                    <FontAwesomeIcon
                      style={{
                        // fontSize:'12px',
                        color: "white",
                        background: "black",
                        borderRadius: "50%",
                        border: "solid 1px",
                        borderColor: "black",
                      }}
                      icon={faChevronCircleRight}
                    />
                  </div>
                </div>
              </div>
            </Box>
          ))}
        </Carousel>
      </Box>
    </div>
  );
};

export default CoursesCarousel;
