import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, makeStyles } from '@material-ui/core';
import { FaUserGraduate } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    aboutSection: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        backgroundColor: '#f9f9f9',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: 200,
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
    },
}));

const AboutUsPage = () => {
    const classes = useStyles();

    const teamMembers = [
        { name: 'John Doe', role: 'CEO', imageUrl: 'https://via.placeholder.com/150', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut maximus libero quis pulvinar.' },
        { name: 'Jane Smith', role: 'CTO', imageUrl: 'https://via.placeholder.com/150', description: 'Nulla ut quam nec orci hendrerit euismod. Cras ac semper sapien.' },
        { name: 'Alice Johnson', role: 'Lead Developer', imageUrl: 'https://via.placeholder.com/150', description: 'Fusce scelerisque libero vel orci eleifend bibendum. Morbi quis nunc luctus.' },
    ];

    return (
        <div className={classes.aboutSection}>
            <Container maxWidth="lg">
                <Typography variant="h2" align="center" gutterBottom>
                    About Us
                </Typography>
                <Grid container spacing={3} justify="center">
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card className={classes.card}>
                                <Avatar className={classes.avatar} alt={member.name} src={member.imageUrl}>
                                    <FaUserGraduate />
                                </Avatar>
                                <CardContent>
                                    <Typography variant="h6" component="h3">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                        {member.role}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {member.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default AboutUsPage;
