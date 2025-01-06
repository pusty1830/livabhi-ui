import {
  faCalendar,
  faChevronCircleRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import color from "../../components/utils/Colors";

const NewsDetailsPage = () => {
  const navigate = useNavigate();

  const newsData = [
    {
      id: 1,
      imageUrl: "/assets/news-2.jpeg",
      title:
        "Amin is another niche-specific news website template. This template is designed for gaming news sites. Stylish fonts and bright colors give this template a typical gaming website look. Elements are made sharper to give a sturdy look to the template.",
      date: "Aug 10, 2019",
      author: "Ramael Rogers",
      description:
        "This template is the ultimate solution for gaming news websites, combining cutting-edge design with functionality tailored to captivate and retain a gaming-focused audience.Featuring a sleek and modern aesthetic, the layout is infused with high-energy visuals that resonate with the vibrant gaming culture. This template prioritizes user experience with an intuitive layout that seamlessly guides visitors through the site, whether they’re browsing the latest news, diving into detailed reviews, or exploring exclusive gaming content.   Additional features include responsive design for optimal performance on all devices, ensuring your site looks flawless whether accessed on a desktop, tablet, or smartphone. Interactive elements, such as hover effects and animations, create a polished, professional feel while enhancing the immersive experience. The template also comes optimized for SEO and fast loading times, so your site ranks high and performs flawlessly.   Perfect for blogs, news portals, or gaming community hubs, this template empowers creators to establish a strong online presence that reflects the energy and excitement of the gaming world. Whether you're showcasing esports highlights, game launches, or industry insights, this template provides everything needed to engage your audience and elevate your brand.",
    },
  ];

  const newsData1 = [
    {
      id: 1,
      imageUrl: "/assets/news-2.jpeg",
      title:
        "Amin is another niche-specific news website template. This template is designed for gaming news sites. Stylish fonts and bright colors give this template a typical gaming website look. Elements are made sharper to give a sturdy look to the template.",
      date: "Aug 10, 2019",
      author: "Ramael Rog",
    },
    {
      id: 2,
      imageUrl: "/assets/news-5.jpeg",
      title:
        "This is a sample title for the second news item. It contains different content to test the layout and dynamic rendering.",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
    },
    {
      id: 5,
      imageUrl: "/assets/news-6.jpeg",
      title:
        "This is a sample title for the second news item. It contains different content to test the layout and dynamic rendering.",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
    },
    {
      id: 6,
      imageUrl: "/assets/news-3.jpeg",
      title:
        "This is a sample title for the second news item. It contains different content to test the layout and dynamic rendering.",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
    },
    {
      id: 7,
      imageUrl: "/assets/news-4.jpeg",
      title:
        "This is a sample title for the second news item. It contains different content to test the layout and dynamic rendering.",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
    },
    {
      id: 8,
      imageUrl: "/assets/news-1.jpeg",
      title:
        "This is a sample title for the second news item. It contains different content to test the layout and dynamic rendering.",
      date: "Sep 5, 2021",
      author: "Alexis Johnson",
    },
  ];

  return (
    <Box
      sx={{
        padding: "1rem",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection:{md:'row', xs:'column'},
        gap: 2,
      }}
    >
      <Box sx={{ minWidth: "65vw" }}>
        {newsData.map((news) => (
          <div
            key={news.id}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              //   justifyContent: "space-between",
              gap: "10px",
              background: "white",
              borderRadius: "4px",
              overflow: "hidden",
              //   marginBottom: "15px",
            }}
          >
            <Typography
              style={{
                fontSize: "34px",
                color: "black",
                fontFamily: "custom-bold",
                textDecoration: "none",
              }}
              id="r-news-head"
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
              <Typography id="r-news-date" style={{ fontSize: "10px" }}>
                <FontAwesomeIcon icon={faCalendar} /> {news.date}
              </Typography>
              <Typography style={{ fontSize: "10px" }} id="r-news-date">
                <FontAwesomeIcon icon={faUser} /> By {news.author}
              </Typography>
            </div>
            <Box
              sx={{
                backgroundImage: `url(${news.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minWidth: "105px",
                height: "400px",
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
                  fontSize: "16px",
                  lineHeight:1.4,
                  color: "black",
                  fontFamily: "custom-regular",
                  textAlign:'justify'
                }}
              >
                {news.description} <p></p>
                {news.title}
              </Typography>
            </div>
          </div>
        ))}
      </Box>

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
          sx={{ background: color.firstColor, fontSize:'18px',
            width:'fit-content',
            p:1, borderRadius:'54px',px:2,
            boxShadow:'0px -5px 10px rgba(0, 0, 0, 0.37) inset'
           }}
        //   className="heading2"
        >
          Related Posts
        </Typography>

        {newsData1.map((news) => (
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
              marginTop: "20px",
              overflow: "hidden",
              //   marginBottom: "15px",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${news.imageUrl})`,
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
              >
                {news.title}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems:'center',
                  gap: "10px",
                  color: "black",
                }}
              >
                <Typography id="r-news-date">
                  <FontAwesomeIcon icon={faCalendar} /> {news.date}
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
  );
};

export default NewsDetailsPage;
