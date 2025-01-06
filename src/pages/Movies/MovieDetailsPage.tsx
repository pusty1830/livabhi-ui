import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import YouTube from "react-youtube";
import color from "../../components/utils/Colors";
import PosterCarousel from "../../components/utils/PosterCarousel";

const PosterData = [
  {
    title: "Liviyon",
    genre: ["Post-Apocalyptic", "Sci-Fi"],
    image: "/assets/poster-11.jpg",
  },
  {
    title: "The Curse of Malgudi's Mango Mansion",
    genre: ["Supernatural", "Horror", "Adventure"],
    image: "/assets/poster-12.jpg",
  },
  {
    title: "John Wick",
    genre: ["Action", "Thriller"],
    image: "/assets/poster-3.jpg",
  },
  {
    title: "Zane's Last Journey",
    genre: ["Sci-Fi", "Drama"],
    image: "/assets/poster-13.jpg",
  },
  {
    title: "Mystery of the Enchanted Woods",
    genre: ["Fantasy", "Mystery", "Adventure"],
    image: "/assets/poster-5.jpg",
  },
  {
    title: "Shadows of the Forgotten",
    genre: ["Psychological Thriller", "Mystery"],
    image: "/assets/poster-6.jpg",
  },
  {
    title: "The Phantom's Call",
    genre: ["Horror", "Supernatural"],
    image: "/assets/poster-7.jpg",
  },
  {
    title: "Beyond the Horizon",
    genre: ["Adventure", "Drama"],
    image: "/assets/poster-8.jpg",
  },
  {
    title: "Into the Abyss",
    genre: ["Action", "Sci-Fi", "Thriller"],
    image: "/assets/poster-9.jpg",
  },
  {
    title: "The Unseen World",
    genre: ["Fantasy", "Adventure"],
    image: "/assets/poster-10.jpg",
  },
];

const movieData = {
    poster:'',
  title: "Avengers: Infinity War",
  year: 2018,
  duration: "2h 23min",
  rating: "9.0",
  age: "16+",
  overview:
    "The Avengers and their Super Hero allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
  plot: "The Avengers and their Super Hero allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
  starring: ["Scarlett Johansson", "Tessa Thompson", "Robert Downey Jr"],
  creators: ["Anthony Russo", "Joe Russo"],
  directors: ["Anthony Russo", "Joe Russo"],
  writers: ["Christopher Markus", "Stephen McFeely"],
  producers: ["Kevin Feige"],
  dop: ["Trent Opaloch"],
  music: ["Alan Silvestri"],
  genre: ["Action", "Adventure", "Fantasy"],
  trailer: "dQw4w9WgXcQ",
  images: ["/path/to/image1.jpg", "/path/to/image2.jpg", "/path/to/image3.jpg"],
};

const tabsData = {
  overview: (
    <>
      <Typography>{movieData.overview}</Typography>
      <Box mt={2}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Starring:
        </Typography>
        <Typography>{movieData.starring.join(", ")}</Typography>
      </Box>
      <Box mt={2}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Creators:
        </Typography>
        <Typography>{movieData.creators.join(", ")}</Typography>
      </Box>
      <Box mt={2}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Genre:
        </Typography>
        <Typography>{movieData.genre.join(", ")}</Typography>
      </Box>
    </>
  ),
  trailers: (
    <>
      <Box mt={0}>
        <Typography fontWeight="bold" variant="h6">
          Trailer:
        </Typography>
        <YouTube
          videoId={movieData.trailer}
          opts={{ width: "100%", height: "360" }}
        />
      </Box>
      <Box mt={4}>
        <Typography fontWeight="bold" variant="h6">
          Images:
        </Typography>
        <Box display="flex" gap={2} mt={2}>
          {movieData.images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Movie Scene ${index + 1}`}
              style={{
                width: "30%",
                height: "auto",
                borderRadius: 8,
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  ),
  cast: (
    <>
      <Box mt={0}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Starring:
        </Typography>
        <Typography>{movieData.starring.join(", ")}</Typography>
      </Box>
      <Box mt={2}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Directed by:
        </Typography>
        <Typography>{movieData.directors.join(", ")}</Typography>
      </Box>
      <Box mt={2}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Written by:
        </Typography>
        <Typography>{movieData.writers.join(", ")}</Typography>
      </Box>
      <Box mt={2}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Produced by:
        </Typography>
        <Typography>{movieData.producers.join(", ")}</Typography>
      </Box>
      <Box mt={2}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Director of Photography:
        </Typography>
        <Typography>{movieData.dop.join(", ")}</Typography>
      </Box>
      <Box mt={2}>
        <Typography style={{ fontFamily: "custom-regular" }} fontWeight="bold">
          Music:
        </Typography>
        <Typography>{movieData.music.join(", ")}</Typography>
      </Box>
    </>
  ),
  details: movieData.plot,
};

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

const MovieDetailsPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        background: color.thirdColor,
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        mt={4}
        py={4}
      >
        <Box flex={1}>
          <img
            src={movieData.poster}
            alt={movieData.title}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Box>
        <Box flex={2} ml={{ md: 4 }} mt={{ xs: 2, md: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <Typography variant="h4" fontWeight="bold">
                {movieData.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" mt={1}>
                {movieData.year} | {movieData.duration} | {movieData.age}
              </Typography>
            </div>

            <Typography variant="h5">{movieData.rating} ⭐</Typography>
          </div>

          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mt: 2,
              "& .MuiTab-root": {
                color: "gray",
                "&.Mui-selected": {
                  color: color.textColor1,
                },
              },
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#1fd8d1",
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Trailers & More" />
            <Tab label="Cast & Crew" />
            <Tab label="Plot" />
          </Tabs>
          <Box mt={2}>
            {Object.values(tabsData).map((content, index) => (
              <TabPanel value={tabIndex} index={index} key={index}>
                {content}
              </TabPanel>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Related Movies */}
      <Typography variant="h5" fontWeight="bold" mt={4}>
        Related Movies
      </Typography>
      <PosterCarousel
        // title="Latest Projects"
        productions={PosterData}
      ></PosterCarousel>
    </Container>
  );
};

export default MovieDetailsPage;
