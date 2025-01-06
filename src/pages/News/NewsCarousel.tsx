import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import color from "../../components/utils/Colors";
import { useNavigate } from "react-router-dom";

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
interface TrendingNews {
  trendingNews: any[]
}


const CustomLeftArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: 4,
      top: "40%",
      transform: "translateY(-)",
      // boxShadow: "-5px -5px 10px rgba(0, 0, 0, 0.97) inset",
      color: "black",
      borderRadius: "0px 4px 4px 0px",
      background: "white",
      height: '60px',

      transition: "color 0.3s ease,background 0.3s ease",
      "&:hover": {
        // color: "red",
        background: 'rgb(246, 246, 246)',
        // boxShadow: "-5px -5px 10px rgba(0, 0, 0, 0.37) inset",
      },
    }}
  >
    <ArrowBackIosIcon sx={{ translate: "8px 0px", borderRadius: '0px' }} />
  </IconButton>
);

const CustomRightArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: 4,
      top: "40%",
      transform: "translateY(-)",
      // boxShadow: "-5px -5px 10px rgba(0, 0, 0, 0.97) inset",
      color: "black",
      borderRadius: "4px 0px 0px 4px",
      background: "white",
      height: '60px',

      transition: "color 0.3s ease,background 0.3s ease",
      "&:hover": {
        // color: "red",
        background: 'rgb(246, 246, 246)',
        // boxShadow: "-5px -5px 10px rgba(0, 0, 0, 0.37) inset",
      },
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

const NewsCarousel = ({ trendingNews }: TrendingNews) => {

  const navigate = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        height: "auto",
        borderColor: "black",
        flexWrap: "wrap",
        // background: "black",
        overflow: "hidden",
        color: "white",
      })}
    >
      {/* {title && <Typography className="heading">{title}</Typography>} */}
      <Box sx={{ m: 2, position: "relative" }}>
        <Typography
          className="heading"
          sx={{
            background: color.firstColor,
            my: 4,
            //  mb:4
            // mb:4,
            // textDecoration:'underline'
          }}
        >
          Trending News
        </Typography>
        <Carousel
          responsive={responsive}
          infinite
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          draggable={false}
        //   autoPlay={true}
        >
          {trendingNews.map((news, index) => (

            <div
              key={news.id}
              style={{
                display: "flex",
                flexDirection: "column",
                // width: "300px",
                margin: "5px",
                border: "solid 1px white",
                borderRadius: "6px",
                overflow: "hidden",
                padding: "10px",
                background: "white",
                // height: "300px",
                //   justifyContent: "space-between",
                // gap: "10px",
                //   marginBottom: "15px",
              }}
            >

              <Box
                sx={{
                  backgroundImage: `url(${news.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center-top",
                  backgroundRepeat: "no-repeat",
                  minWidth: "85px",
                  height: "250px",
                }}
              ></Box>

              <div
                style={{
                  padding: "5px",
                  paddingTop: "0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    marginTop: "10px",
                  }}
                >
                  <Typography id="r-news-date">
                    <FontAwesomeIcon icon={faCalendar} />{new Date(news.createdAt).toISOString().split("T")[0]}
                  </Typography>
                  <Typography id="r-news-date">
                    <FontAwesomeIcon icon={faUser} /> By {news.author}
                  </Typography>
                </div>
                <Typography
                  onClick={() => {
                    navigate(`/news-details/${news.id}`);
                  }}
                  id="r-news-head-horz"
                >
                  {news.title}
                </Typography>
              </div>
            </div>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default NewsCarousel;
