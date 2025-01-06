import {
  faCalendar,
  faChevronCircleRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import color from "../../components/utils/Colors";
import { useNavigate } from "react-router-dom";

interface NewsBlogHero {
  newsAndBlogs: any[];
  recentPosts: any[];
  featuredPosts: any[];
}

export const NewsBlogHero = ({ newsAndBlogs, recentPosts, featuredPosts }: NewsBlogHero) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
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


  const newsData1 = [
    {
      id: 1,
      imageUrl: "/assets/news-2.jpeg",
      title:
        "Amin is another niche-specific news website template. This template is designed for gaming news sites. Stylish fonts and bright colors give this template a typical gaming website look. Elements are made sharper to give a sturdy look to the template.",
      date: "Aug 10, 2019",
      author: "Ramael Rog",
    }
  ];
  const newsData2 = [
    {
      id: 1,
      imageUrl: "/assets/news-2.jpeg",
      title:
        "Amin is another niche-specific news website template. This template is designed for gaming news sites. Stylish fonts and bright colors give this template a typical gaming website look. Elements are made sharper to give a sturdy look to the template.",
      date: "Aug 10, 2019",
      author: "Ramael Rog",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div style={{ paddingTop: "10px" }}>
        <Box
          style={{ textAlign: "left" }}
          sx={{
            px: 2,
            borderRadius: "12px",
            fontSize: "12px",
            color: "white",
            width: "fit-content",
            py: 2,
          }}
        >
          <Typography
            style={{ background: color.firstColor }}
            className="heading2"
          >
            News & Blogs
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: "650px",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: { sx: "100%", md: "65%" },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                padding: "16px",
                background: "white",
                borderRadius: "12px",
              }}
            >
              <Carousel
                responsive={responsive}
                infinite
                draggable={false}
                arrows={false}
              //   autoPlay={true}
              >
                <Box
                  className="smooth-scale"
                  sx={{
                    backgroundImage: "url(/assets/news-7.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                    backgroundRepeat: "no-repeat",
                    height: "370px",
                    width: "100%",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      opacity: "0.8",
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
                      zIndex: 1,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 2,
                      width: "100%",
                      color: "white",
                      p: 2,
                      zIndex: 2,
                    }}
                  >
                    <Typography sx={{ lineHeight: 1.2 }}>
                      This is a sample title for the second news item. It
                      contains different content to test the layout and dynamic
                      rendering. This is a sample title for the second news
                      item. It contains different content to test the layout and
                      dynamic rendering.
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <Typography id="r-news-date">
                        <FontAwesomeIcon icon={faCalendar} /> 26Nov, 2023
                      </Typography>
                      <Typography id="r-news-date">
                        <FontAwesomeIcon icon={faUser} /> By Nero
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Carousel>
            </div>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: "10px",
                py: 1,
                // background: ,
              }}
            >
              {newsAndBlogs.map((news) => (
                <div
                  key={news.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "230px",
                    border: "solid 1px white",
                    borderRadius: "6px",
                    overflow: "hidden",
                    padding: "10px",
                    background: "white",
                    // height: "300px",
                    //   justifyContent: "space-between",
                    gap: "10px",
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
                      height: "150px",
                    }}
                  ></Box>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        marginTop: "5px",
                      }}
                    >
                      <Typography id="r-news-date">
                        <FontAwesomeIcon icon={faCalendar} /> {new Date(news.createdAt).toISOString().split("T")[0]}
                      </Typography>
                      <Typography id="r-news-date">
                        <FontAwesomeIcon icon={faUser} /> By {news.author}
                      </Typography>
                    </div>
                    <Typography
                      style={{
                        color: "black",
                        fontFamily: "custom-bold",
                      }}
                      onClick={() => {
                        navigate("/news-details");
                      }}
                      id="r-news-head-horz"
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        color: "black",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Read More
                      <FontAwesomeIcon
                        style={{
                          marginLeft: "5px",
                          // background: news.theme,
                          borderRadius: "50%",
                        }}
                        icon={faChevronCircleRight}
                      />
                    </Typography>
                  </div>
                </div>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              // background: color.firstColor,
              // width: "35%",
              width: { sx: "100%", md: "35%" },
              gap: 2,
              p: 2,
              pt: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{ textAlign: "left" }}
              sx={{
                // px: 2,
                borderRadius: "12px",
                fontSize: "12px",
                color: "white",
                width: "fit-content",
                py: 2,
              }}
            >
              <Typography
                style={{ background: color.firstColor }}
                className="heading2"
              >
                Featured Post
              </Typography>
            </Box>

            {featuredPosts.map((news) => (
              <div
                key={news.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // width: "230px",
                  border: "solid 1px white",
                  borderRadius: "6px",
                  overflow: "hidden",
                  padding: "10px",
                  fontSize: "10px",
                  color: "black",
                  fontFamily: "custom-bold",
                  background: "white",
                  // height: "300px",
                  //   justifyContent: "space-between",
                  gap: "10px",
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
                    height: "150px",
                  }}
                ></Box>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      marginTop: "5px",
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
                    style={{
                      color: "black",
                      fontFamily: "custom-bold",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      navigate("/news-details");
                    }}
                    id="r-news-head-horz"
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "left",
                    }}
                  >
                    Read More
                    <FontAwesomeIcon
                      style={{
                        marginLeft: "5px",
                        // background: news.theme,
                        borderRadius: "50%",
                      }}
                      icon={faChevronCircleRight}
                    />
                  </Typography>
                </div>
              </div>
            ))}

            <Box
              style={{ textAlign: "left" }}
              sx={{
                borderRadius: "12px",
                fontSize: "12px",
                color: "white",
                width: "fit-content",
                py: 2,
              }}
            >
              <Typography
                style={{ background: color.firstColor }}
                className="heading2"
              >
                Recent Posts
              </Typography>
            </Box>

            {recentPosts.map((news) => (
              <div
                key={news.id}
                style={{
                  display: "flex",
                  width: "100%",
                  height: "85px",
                  justifyContent: "space-between",
                  gap: "10px",
                  background: "white",
                  borderRadius: "4px",
                  overflow: "hidden",
                  //   marginBottom: "15px",
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${news.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minWidth: "85px",
                    height: "85px",
                  }}
                ></Box>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    paddingRight: "10px",
                    color: color.textColor2,
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "10px",
                      color: "black",
                      fontFamily: "custom-bold",
                    }}
                    id="r-news-head"
                    onClick={() => {
                      navigate("/news-details");
                    }}
                  >
                    {news.title}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      color: "black",
                    }}
                  >
                    <Typography id="r-news-date">
                      <FontAwesomeIcon icon={faCalendar} /> {new Date(news.createdAt).toISOString().split("T")[0]}
                    </Typography>
                    <Typography id="r-news-date">
                      <FontAwesomeIcon icon={faUser} /> By {news.author}
                    </Typography>
                    <FontAwesomeIcon
                      style={{
                        // color: color.textColor,
                        marginLeft: "5px",
                        // background: news.theme,
                        borderRadius: "50%",
                      }}
                      icon={faChevronCircleRight}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Box>
        </Box>
      </div>
    </>
  );
};
