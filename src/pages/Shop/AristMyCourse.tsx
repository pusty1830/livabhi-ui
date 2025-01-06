import React, { useEffect, useState } from 'react';
import { getAllCourse } from '../../services/services';
import { getUserId } from '../../services/axiosClient';

const AristMyCourse = () => {
    const [allCourses, setAllCourses] = useState<any[]>([]);

    useEffect(() => {
        const payLoad = {
            data: { filter: '', userId: getUserId() },
            page: 0,
            pageSize: 50,
            order: [['createdAt', 'ASC']],
        };

        getAllCourse(payLoad)
            .then((res:any) => {
                setAllCourses(res?.data?.data?.rows || []);
            })
            .catch((err:any) => {
                console.error(err);
            });
    }, []);

    // const filteredCourses = allCourses.filter((course) => course.category === 'Tricks & Tips');

    return (
        <div style={containerStyle}>
            {allCourses.length > 0 ? (
                allCourses.map((course) => (
                    <div key={course.id} style={cardStyle}>
                        <img src={course.thumbnail} alt={course.title} style={imageStyle} />
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>
                            <strong>Price:</strong> ₹{course.price}
                        </p>
                        <p>
                            <strong>License:</strong> {course.licenseType}
                        </p>
                        <p>
                            <strong>Release Date:</strong> {new Date(course.releaseDate).toLocaleDateString()}
                        </p>
                    </div>
                ))
            ) : (
                <p>No courses found </p>
            )}
        </div>
    );
};

export default AristMyCourse;

// Inline styles
const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
};

const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
};
