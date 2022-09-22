import React from 'react';
import { AuthorType, ChatMessage, ChatMessageType } from '../../../types/types';
import ChatbotMessageContainer from './ChatbotMessageContainer';
import HumanMessageContainer from './HumanMessageContainer';
import StatusMessageContainer from './StatusMessageContainer';

type Props = {
  chatMessage: ChatMessage;
  renderRobot: boolean;
};

const ChatMessageContainer = ({
  renderRobot,
  chatMessage,
}: Props): JSX.Element => {
  if (chatMessage.type === ChatMessageType.STATUS) {
    return <StatusMessageContainer text={chatMessage.text} />;
  }

  if (chatMessage.type === ChatMessageType.TEXT) {
    if (chatMessage.author === AuthorType.AI) {
      return (
        <ChatbotMessageContainer
          renderRobot={renderRobot}
          renderLoadingIndicator={false}
          text={chatMessage.text}
          timestamp={parseInt(chatMessage.timestamp, 10)}
        />
      );
    }
    if (chatMessage.author === AuthorType.USER) {
      return (
        <HumanMessageContainer
          text={chatMessage.text}
          timestamp={parseInt(chatMessage.timestamp, 10)}
        />
      );
    }
  }
  return <></>;
};

export default ChatMessageContainer;
