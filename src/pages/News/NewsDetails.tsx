import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChevronCircleRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import color from "../../components/utils/Colors";
import { useEffect, useState } from "react";
import { getAllNewsAndBlogs, getOneNewsRecord } from "../../services/services";

const NewsDetailsPage = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [newdata, setNewData] = useState<any>(null);
  const [newsdata, setNewsData] = useState<any>([])

  useEffect(() => {
    getOneNewsRecord(id)
      .then((res) => {
        console.log(res);
        setNewData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    const payLoad = {
      data: { filter: "", newsType: newdata?.newsType },
      page: 0,
      pageSize: 10,
      order: [["createdAt", "ASC"]],
    }
    getAllNewsAndBlogs(payLoad).then((res) => {
      setNewsData(res.data.data?.rows);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  if (!newdata) {
    return <Typography>Loading...</Typography>; // Handle loading state
  }

  return (
    <Box
      sx={{
        padding: "1rem",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { md: 'row', xs: 'column' },
        gap: 2,
      }}
    >
      <Box sx={{ minWidth: "65vw" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
            background: "white",
            borderRadius: "4px",
            overflow: "hidden",
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
            {newdata.title}
          </Typography>

          <div
            style={{
              display: "flex",
              gap: "10px",
              color: "black",
            }}
          >
            <Typography id="r-news-date" style={{ fontSize: "10px" }}>
              <FontAwesomeIcon icon={faCalendar} /> {new Date(newdata.createdAt).toISOString().split("T")[0]}
            </Typography>
            <Typography style={{ fontSize: "10px" }} id="r-news-date">
              <FontAwesomeIcon icon={faUser} /> By {newdata.author}
            </Typography>
          </div>

          <Box
            sx={{
              backgroundImage: `url(${newdata.thumbnail})`,
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
                fontSize: "18px",
                color: "black",
                fontFamily: "custom-bold",
              }}
            >
              {newdata.description}
            </Typography>
          </div>
        </div>
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
          sx={{
            background: color.firstColor, fontSize: '18px',
            width: 'fit-content',
            p: 1, borderRadius: '54px', px: 2,
            boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.37) inset'
          }}
        >
          Related Posts
        </Typography>

        {newsdata.map((news: any) => (
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
              >
                {news.title}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: 'center',
                  gap: "10px",
                  color: "black",
                }}
              >
                <Typography id="r-news-date">
                  <FontAwesomeIcon icon={faCalendar} />{new Date(news.createdAt).toISOString().split("T")[0]}
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
