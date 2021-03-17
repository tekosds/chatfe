import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withNamespaces} from 'react-i18next';
import classnames from 'classnames';
import {addNewMessage, getAllMessages, disconnect} from "../actions";
import {submitMessage} from "../services";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient;
const ChatComponent = ({t}) => {
    const dispatch = useDispatch();
    const [inputMessage, setInputMessage] = useState('');
    const [chatVisible, setChatVisible] = useState(false);
    const {messagesData} = useSelector((state) => {
        return state.chatReducer
    });
    const {user, loggedOut} = useSelector((state) => state.authReducer)
    const contentRef = useRef();
    const connect = () => {
        const socket = new SockJS("http://localhost:8080/chatws");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function () {
            stompClient.subscribe("/web/messages", function (newMessage) {
                const nMessage = JSON.parse(newMessage.body);
                handleAddNewMessage(nMessage);
            });
        });
    };

    function handleAddNewMessage(nMessage) {
        dispatch(addNewMessage({
            messageText: nMessage.messageText,
            sendAt: new Date(nMessage.sendAt).toLocaleString(),
            user: {userName: nMessage.user.userName}
        }));
        setInputMessage('');
    }

    function handleDisconnect() {
        if (stompClient) {
            stompClient.disconnect();
        }
    }

    useEffect(() => {
        connect();
    }, []);


    useEffect(() => {
        if(loggedOut){
            handleDisconnect();
            dispatch(disconnect());
        }
    }, [loggedOut]);

    useEffect(() => {
        dispatch(getAllMessages());
    }, [dispatch]);

    function scrollToBottom() {
        try {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        } catch (error) {
        }
    }

    useEffect(() => {
        try {
            if (messagesData && messagesData.length > 0 && contentRef && contentRef.current) {
                scrollToBottom();
            }
        } catch (error) {
        }
    }, [messagesData, contentRef]);

    useEffect(() => {
        chatVisible && scrollToBottom();
    }, [chatVisible]);

    return (
        <>
            {chatVisible && (
                <div className="chat-component">
                    <div className="chat-component__header">{t('label.chat')}</div>
                    <div className="chat-component__content" ref={contentRef}>
                        <div>
                            {messagesData &&
                            messagesData.map((m, index) => {
                                const messageClassName = classnames(
                                    'chat-component__message',
                                    m.user.userName === user.userName && 'chat-component__message--you'
                                );
                                return (
                                    <div key={index} className={messageClassName}>
                                        <span>{m.user.userName}</span>
                                        <span className="chat-component__message-text">{m.messageText}</span>
                                        <span>{new Date(m.sendAt).toLocaleString()}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="chat-component__footer">
                        <input
                            onChange={(e) => {
                                setInputMessage(e.target.value);
                            }}
                            value={inputMessage}
                        />
                        <button onClick={(e) => {
                            submitMessage(user.userName, inputMessage);
                        }}>{t('label.send')}</button>
                    </div>
                </div>
            )}
            <div
                className="chat-component__button"
                onClick={() => {
                    setChatVisible(!chatVisible);
                }}>
                {t('label.chat')}
            </div>
        </>
    );
};

export default withNamespaces()(ChatComponent);
