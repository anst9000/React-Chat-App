import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  TextField,
} from "@material-ui/core";

import { CTX } from "./Store";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px auto 25px auto",
    textAlign: "center",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "250px",
    borderRight: "1px solid grey",
  },
  chatWindow: {
    width: "70%",
    height: "250px",
    padding: "20px",
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "85%",
  },
  chip: {
    background: "pink",
    marginBottom: "3px",
    marginRight: "3px",
    fontWeight: "bold",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  // CTX store
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  const topics = Object.keys(allChats);

  // Local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat App
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map((topic) => {
                return (
                  <ListItem
                    onClick={(e) => changeActiveTopic(e.target.innerText)}
                    key={topic}
                    button
                  >
                    <ListItemText primary={topic} />
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, index) => {
              return (
                <div className={classes.flex} key={index}>
                  <Chip label={chat.sender} className={classes.chip} />
                  <Typography variant="body1" gutterBottom>
                    {chat.msg}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a chat"
            className={classes.chatBox}
            value={textValue}
            onChange={(e) => changeTextValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              sendChatAction({
                sender: user,
                msg: textValue,
                topic: activeTopic,
              });
              changeTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}
