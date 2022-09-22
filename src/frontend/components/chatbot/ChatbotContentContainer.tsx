import React, { useEffect, useRef } from 'react';
import { AuthorType } from '../../../bff/types';
import {
  ChatMessage,
  ChatbotValueOption,
  ChatbotMessage,
  ConversationTraceEntry,
} from '../../types/types';
import ChatbotMessageContainer from './Messages/ChatbotMessageContainer';
import ChatbotUserOptionsContainer from './ChatbotUserOptionsContainer';
import MessageContainer from './Messages/MessageContainer';

type Props = {
  isDone: boolean;
  chatMessages: ChatMessage[];
  chatbotLoadingMessage: boolean;
  currentChatbotMessage: ChatbotMessage | undefined;
  handleOptionClick: (
    option: ChatbotValueOption,
    conversationTraceEntry: ConversationTraceEntry,
  ) => () => void;
};
const isRenderRobot = (chatMessages: ChatMessage[], index: number) => {
  return (
    chatMessages.slice(index + 1).find((cm) => cm.author === AuthorType.AI) ===
    undefined
  );
};

const ChatbotContentContainer = ({
  isDone,
  chatMessages,
  chatbotLoadingMessage,
  currentChatbotMessage,
  handleOptionClick,
}: Props): JSX.Element => {
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = lastElementRef;
    if (current && current.scrollIntoView) {
      current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [chatMessages]);

  return (
    <>
      {chatMessages.map((chatMessage, index) => {
        return (
          <MessageContainer
            key={`chat_message_index_${index}`}
            renderRobot={
              !chatbotLoadingMessage && isRenderRobot(chatMessages, index)
            }
            chatMessage={chatMessage}
          />
        );
      })}
      {chatbotLoadingMessage && (
        <ChatbotMessageContainer
          renderRobot
          renderLoadingIndicator
          text=""
          timestamp={undefined}
        />
      )}
      {currentChatbotMessage && !chatbotLoadingMessage && (
        <ChatbotUserOptionsContainer
          isDone={isDone}
          chatbotMessage={currentChatbotMessage}
          handleOnOptionClick={handleOptionClick}
        />
      )}
      <div ref={lastElementRef} />
    </>
  );
};

export default React.memo(ChatbotContentContainer);
