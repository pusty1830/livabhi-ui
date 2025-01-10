import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import color from "../../components/utils/Colors";
import { getAllNewsAndBlogs } from "../../services/services";
import "../Home.css";
import { NewsBlogHero } from "./NewsBlogHero";
import NewsCarousel from "./NewsCarousel";
import NewsVideoCarousel from "./NewsVideoCarousel";

export const NewsBlogs: React.FC = () => {
  const [heroNews, setHeroNews] = useState<any>([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [newsAndBlogs, setNewsAndBlogs] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [trendingNewsVideos, setTrendingNewsVideos] = useState([]);

  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllNewsAndBlogs(payLoad)
      .then((res) => {
        const allNews = res?.data?.data?.rows || [];
        // console.log(allNews)

        // Filter the data for each `newsType`
        setHeroNews(
          allNews.filter((news: any) => news.newsType === "Hero Section")
        );
        setTrendingNews(
          allNews.filter((news: any) => news.newsType === "Trending News")
        );
        setNewsAndBlogs(
          allNews.filter((news: any) => news.newsType === "News & Blogs")
        );
        setFeaturedPosts(
          allNews.filter((news: any) => news.newsType === "Featured Post")
        );
        setRecentPosts(
          allNews.filter((news: any) => news.newsType === "Recent Posts")
        );
        setTrendingNewsVideos(
          allNews.filter((news: any) => news.newsType === "Trending News Video")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(heroNews[0]?.createdAt);
  let formattedDate;

  // Check if it's a valid date
  if (isNaN(date.getTime())) {
    console.error("Invalid Date");
  } else {
    formattedDate = date.toISOString().split("T")[0];
    console.log(formattedDate);
  }
  const navigate = useNavigate();

  return (
    <>
      {/* <div> */}

      <div
        style={{
          background: color.thirdColor,
        }}
      >
        <Box
          onClick={() => navigate(`/news-details/${heroNews[0]?.id}`)}
          sx={{
            position: "relative",
            backgroundImage: `url(${heroNews[0]?.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: { xs: "50vh", md: "100vh" },
            display: "flex",
            mt: { xs: "-54px", md: "-94px" },
            alignItems: "center",
            mb: 2,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              opacity: "0.8",
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: { xs: "50vh", md: "100vh" },

              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "5%",
              // transform: "translateX(10%)",
              maxWidth: "100vw",
              color: "white",
              p: 2,
              zIndex: 2,
            }}
          >
            <Typography
              sx={{
                lineHeight: 1.2,
                whiteSpace: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 3,
                fontSize: "24px",
                maxHeight: "3.6em",
              }}
            >
              {heroNews[0]?.description}
            </Typography>
            <div
              style={{
                display: "flex",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                }}
                id="r-news-date"
              >
                <FontAwesomeIcon icon={faCalendar} />
                {formattedDate}
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                }}
                id="r-news-date"
              >
                <FontAwesomeIcon icon={faUser} />
                {heroNews[0]?.author}
              </Typography>
            </div>
          </Box>
        </Box>

        <NewsCarousel trendingNews={trendingNews}></NewsCarousel>

        <NewsBlogHero
          newsAndBlogs={newsAndBlogs}
          recentPosts={recentPosts}
          featuredPosts={featuredPosts}
        ></NewsBlogHero>

        <NewsVideoCarousel
          trendingNewsVideos={trendingNewsVideos}
        ></NewsVideoCarousel>
      </div>
    </>
  );
};
