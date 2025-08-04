import Message from "@components/Message";
import MessageInput from "@components/MessageInput";
import { useState, useRef, useEffect } from "react";
import { type IMessage } from "@app-types/message";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

function getRandomId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2).toString()
  );
}

export default function MessagePage() {
  const [secondUsername, setSecondUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const location = useLocation();

  const wsRef = useRef<WebSocket | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const username = localStorage.getItem("nickName");

  useEffect(() => {
    const isChatPage = location.pathname === "/chat";

    if (isChatPage) {
      const socket = new WebSocket("ws://localhost:3001");
      socket.onopen = () => {
        console.log("Connected to ws");

        socket.send(
          JSON.stringify({ type: "init", username, id: getRandomId() })
        );

        sendSystemMessage("USER_JOINED");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        console.log("MESSAGE FROM SERVER: ", data);

        // if (data.type === "init" && data.username !== username) {
        //     setSecondUser(data.username);
        // }

        if (data.type === "msg") {
          if (
            !secondUsername &&
            data.username !== localStorage.getItem("nickName")
          ) {
            setSecondUsername(data.username);

            console.log("SECOND USERNAME CHANGED: ", data.username);
          }
          const newMessage: IMessage = {
            id: Date.now().toString(),
            text: data.text,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isMine: data.username === localStorage.getItem("nickName"),
            sender: data.username,
          };
          if (localStorage.getItem("nickName") !== data.username) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      };

      wsRef.current = socket;

      return () => {
        if (socket.readyState === WebSocket.OPEN) {
          sendSystemMessage("USER_LEFT");
        }
      };
    }
  }, [location.pathname]);

  const handleSendMessage = (text: string) => {
    const newMessage: IMessage = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMine: true,
    };

    setMessages([...messages, newMessage]);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ type: "msg", text, sender: username })
      );
    }
  };

  const sendSystemMessage = (type: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type,
          userId: getRandomId(),
          username: username,
          timestamp: new Date().toISOString(),
        })
      );
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page">
      <header className="chat-header">
        <Link to="/" className="chat-back-button secondary-text">
          ← Chats
        </Link>
        <div className="second-user-name-title primary-text">
          {secondUsername ? secondUsername : "now you're alone"}
        </div>
        <img src="src/assets/images/user-icon.png" className="user-icon" />
      </header>

      <div className="messages-container secondary-text">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
