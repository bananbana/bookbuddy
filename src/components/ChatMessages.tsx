"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
        className
      )}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((msg) => (
        <div key={msg.id} className="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": msg.isUserMessage,
            })}
          >
            <div
              className={cn(
                "flex flex-col space-y-2 text-sm max-w-xs overflow-x-hidden",
                {
                  "order-1 text-right ml-4": msg.isUserMessage,
                  "order-2 text-left mr-4": !msg.isUserMessage,
                }
              )}
            >
              <p
                className={cn("px-4 py-2 break-words rounded-lg", {
                  "bg-blue-600 text-white": msg.isUserMessage,
                  "bg-gray-200 text-gray-900": !msg.isUserMessage,
                })}
              >
                <MarkdownLite text={msg.text} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
