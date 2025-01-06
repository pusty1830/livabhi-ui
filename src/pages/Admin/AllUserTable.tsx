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
} from "@mui/material";

import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser, getAllUser } from "../../services/services";

const AllUsersTable: React.FC = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const payLoad = {
                data: { filter: "" },
                page: 0,
                pageSize: 50,
                order: [["createdAt", "ASC"]],
            };
            const res = await getAllUser(payLoad);
            setUsers(res?.data?.data?.rows);
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteUser(id);
            toast(res?.data?.msg);
            fetchUsers();

        } catch (error) {
            toast.error("Failed to delete user");
            console.error(error);
        }

    };

    return (
        <Box sx={{ padding: "32px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
                All Users
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.firstName}{" "}{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(user.id)}>
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

export default AllUsersTable;
