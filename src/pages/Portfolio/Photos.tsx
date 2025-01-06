import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";



interface PortfolioProps {

  portfolioPhoto: { portfolioPhotos: any[] }[];

}

export default function Photos({ portfolioPhoto }: PortfolioProps) {
  return (
    <ImageList
      sx={{ width: "100%", height: "100%" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {portfolioPhoto?.[0]?.portfolioPhotos?.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              "&:hover .delete-icon": { opacity: 1 },
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              className="delete-icon"
              // onClick={() => handleDelete(item.img)}
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                opacity: 0,
                transition: "opacity 0.3s",
                "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.8)" },
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

