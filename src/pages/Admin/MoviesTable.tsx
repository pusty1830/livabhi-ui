import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllMovies } from "../../services/services";

const MoviesTable = () => {
    const [movies, setMovies] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const payLoad = {
                    data: { filter: "" },
                    page: 0,
                    pageSize: 50,
                    order: [["createdAt", "ASC"]],
                };
                const res = await getAllMovies(payLoad);
                setMovies(res?.data?.data?.rows || []);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
                toast.error("Failed to load movies.");
            }
        };

        fetchMovies();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            // Replace with your delete API call
            setMovies((prev: any) => prev.filter((movie: any) => movie.id !== id));
            toast.success("Movie deleted successfully.");
        } catch (error) {
            console.error("Failed to delete movie:", error);
            toast.error("Failed to delete movie.");
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/edit-movie/${id}`);
    };

    return (
        <Box sx={{ padding: "1rem", backgroundColor: "#ffffff", minHeight: "100vh" }}>
            <Box
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    mt: 5,
                    p: 3,
                    boxShadow: 3,
                    backgroundColor: "#ffffff",
                }}
            >
                <Typography variant="h4" gutterBottom align="center">
                    Manage Movies
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movies.map((movie: any) => (
                                <TableRow key={movie.id}>
                                    <TableCell>{movie.id}</TableCell>
                                    <TableCell>{movie.title}</TableCell>
                                    <TableCell>{movie.year}</TableCell>
                                    <TableCell>{movie.rating}</TableCell>
                                    <TableCell>{movie.genre}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleEdit(movie.id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(movie.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/add-movie")}
                        style={{ backgroundColor: "#007bff", color: "#fff" }}
                    >
                        Add New Movie
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MoviesTable;
