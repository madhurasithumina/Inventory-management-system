import React, { useState, useEffect } from 'react';

const HomePage = () => {
    // Define state variables
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate fetching data from an API using useEffect hook
    useEffect(() => {
        // Simulated API call to fetch student data
        fetch('https://api.example.com/students')
            .then(response => response.json())
            .then(data => {
                setStudents(data);
            })
            .catch(error => console.error('Error fetching student data:', error));

        // Simulated API call to fetch course data
        fetch('https://api.example.com/courses')
            .then(response => response.json())
            .then(data => {
                setCourses(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error fetching course data:', error));
    }, []);

    return (
        <div>
            <h1>Student Management System</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Dashboard</h2>
                    <p>Total number of students: {students.length}</p>
                    <p>Total number of courses: {courses.length}</p>

                    <h2>Quick Access</h2>
                    <ul>
                        <li>Add a new student</li>
                        <li>View course schedules</li>
                        <li>Generate reports</li>
                    </ul>

                    <h2>Student List</h2>
                    <ul>
                        {students.map(student => (
                            <li key={student.id}>{student.name} - {student.email}</li>
                        ))}
                    </ul>

                    <h2>Course Schedule</h2>
                    <ul>
                        {courses.map(course => (
                            <li key={course.id}>{course.name} - {course.instructor} - {course.time}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HomePage;
