import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container } from '@mui/material';
import ProfileForm from './ProfileForm';
import ProjectsForm from './ProjectsForm';
import PhotosForm from './PhotosForm';
import AchievementsTab from './AchievementsForm';
import ContactTab from './ContactForm';


const PortfolioFormTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [profileId, setProfileId] = useState<string>('');

  const handleNextTab = () => {
    setActiveTab((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileForm onSubmit={handleNextTab} setProfileId={setProfileId} />;
      case 1:
        return <ProjectsForm onSubmit={handleNextTab} profileId={profileId} />;
      case 2:
        return <PhotosForm onSubmit={handleNextTab} profileId={profileId} />;
      case 3:
        return <AchievementsTab onSubmit={handleNextTab} profileId={profileId} />;
      case 4:
        return <ContactTab onSubmit={handleNextTab} profileId={profileId} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{
      mt: 4,
      padding: "1rem", backgroundColor: "#ffffff", minHeight: "100vh"

    }}>
      <Box >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Profile" />
          <Tab label="Projects" />
          <Tab label="Photos" />
          <Tab label="Achievements" />
          <Tab label="Contact" />
        </Tabs>
        <Box sx={{ marginTop: 2 }}>
          <Typography component="div">{renderTabContent()}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PortfolioFormTabs;
