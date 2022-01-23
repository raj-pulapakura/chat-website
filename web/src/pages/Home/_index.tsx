import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { Flex } from "../../components/Flex";
import { Spacing } from "../../components/Spacing";
import { makeStyles } from "@mui/styles";
import { DeadCenter } from "../../components/DeadCenter";
import { useNavigate } from "react-router-dom";
import { routes } from "../../features/AppRouter/_index";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { MeButton } from "../../components/MeButton";
import { LogoutButton } from "../../components/LogoutButton";

const useStyles = makeStyles({
  stepSection: {
    height: "100%",
  },
});

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <>
      <PrimeWrapper>
        <MeButton />
        <Spacing height="1rem" />
        <LogoutButton />
      </PrimeWrapper>
      <DeadCenter style={{ width: "80%" }}>
        <Typography
          textAlign="center"
          variant="h5"
          fontWeight="bold"
          color="white"
        >
          Welcome to Chathub, a place to chat with your friends!
        </Typography>
        <Spacing height="1.5rem" />
        <Flex sx={{ gap: "1rem" }}>
          <ButtonGroup variant="contained" fullWidth>
            <Button
              color="secondary"
              size="large"
              onClick={() => navigate(routes.register.path)}
            >
              Sign up
            </Button>
            <Button
              color="primary"
              size="large"
              onClick={() => navigate(routes.login.path)}
            >
              Log in
            </Button>
          </ButtonGroup>
        </Flex>
      </DeadCenter>

      {/* <Grid container >
        <Grid item xs={12} sm={6}>
          <Box sx={{ height: "100%" }}>
            <PrimeWrapper className={classes.stepSection}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Step 1: Create a Room
              </Typography>
              <Typography>
                Log into your account and click the 'Create Room' button. A room
                is a private environment where you can invite others to chat
                with.
              </Typography>
            </PrimeWrapper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PrimeWrapper sx={{ maxWidth: "100%" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Step 2: Invite your friends
            </Typography>
            <Typography>
              Send invites to your friends using their name. Once they accept
              the request, your friend has joined the room!
            </Typography>
          </PrimeWrapper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PrimeWrapper>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Step 3: Chat, chat, chat!
            </Typography>
            <Typography>
              There are no limits to how much you can chat! So go on, express
              yourself!
            </Typography>
          </PrimeWrapper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PrimeWrapper>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Step 4: Join public rooms
            </Typography>
            <Typography>
              Some rooms are 'public', which means that anyone can join them!
            </Typography>
          </PrimeWrapper>
        </Grid>
      </Grid> */}
    </>
  );
};
