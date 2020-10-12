import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initState = {
  general: [
    { sender: "aaron", msg: "hello" },
    { sender: "bob", msg: "hi there" },
    { sender: "david", msg: "see you all" },
  ],
  topic2: [
    { sender: "nisse", msg: "Tjena allihopa" },
    { sender: "knutte", msg: "hallå grabbar" },
    { sender: "mange", msg: "roligt att se er" },
  ],
};

function reducer(state, action) {
  const { sender, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { sender, msg }],
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", (msg) => {
      console.log("payload", msg);
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "andy" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
