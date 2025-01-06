import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    IconButton,
    Button,
} from "@mui/material";
// import { getNewsAndBlogs } from "../../../services/services"; // Replace with actual API call
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteNewsRecord, getAllNewsAndBlogs } from "../../../services/services";
import { useNavigate } from "react-router-dom";

const NewsAndBlogsTable: React.FC = () => {
    const [newsAndBlogs, setNewsAndBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNewsAndBlogs();
    }, []);

    const fetchNewsAndBlogs = async () => {
        try {
            const payLoad = {
                data: { filter: "" },
                page: 0,
                pageSize: 50,
                order: [["createdAt", "ASC"]],
            };
            getAllNewsAndBlogs(payLoad).then((res) => {
                setNewsAndBlogs(res?.data?.data?.rows);
            }).catch((err) => {
                console.log(err);
            })

        } catch (error) {
            toast.error("Failed to fetch news and blogs");
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteNewsRecord(id);
            toast(res?.data?.msg);

            fetchNewsAndBlogs();
        } catch (error) {
            toast.error("Failed to delete the news record");
            console.error(error);
        }

    };

    const handleEdit = (id: string) => {
        // Navigate to edit page
        toast.info(`Editing entry with ID: ${id}`);
        navigate(`/edit-news-and-blogs/${id}`);
    };

    return (
        <Box sx={{ padding: "32px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
                News and Blogs
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Thumbnail</TableCell>

                            <TableCell>Author</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>News Type</TableCell>

                            <TableCell>Description</TableCell>

                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newsAndBlogs.map((news: any) => (
                            <TableRow key={news.id}>
                                <TableCell>
                                    <img
                                        src={news.thumbnail}
                                        alt="Thumbnail"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                </TableCell>
                                <TableCell>{news.author}</TableCell>
                                <TableCell>{news.title}</TableCell>
                                <TableCell>{news.type}</TableCell>
                                <TableCell>{news.newsType}</TableCell>
                                <TableCell>{news.description}</TableCell>

                                <TableCell>
                                    <IconButton onClick={() => handleEdit(news.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(news.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default NewsAndBlogsTable;
