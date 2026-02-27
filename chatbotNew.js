import {useState, useRef, useEffect, useCallback} from 'react';
import {useChat} from 'ai/react';
import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';useAuth;
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { use } from 'react';       

export default function ChatbotNew() {
    const { t  } = useTranslation();
    const { theme } = useTheme();
    const { language } = useLanguage();
    const { user } = useAuth();
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        body: {
            userId: user ? user.id : null,
            language,
            theme,   }
    });
    const isLoading = messages.length === 0 || (messages[messages.length -1 ] .role === 'assistant' && !messages[messages.length -1 ].content);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const error = useRouteError();
}

// Handle route errors

   function handleRouteError(error  ) {
    if (error) {
        console.error('Route error:', error);
        navigate('/error');
    }
}

function useEffect() {
    useEffect(() => {
        handleRouteError();
    }, [error]);
}

// Focus input on mount
function useFocusInput() {
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();

    
        }
    }, []);
}

//next step is to render the chat interface and handle user interactions, such as sending messages and displaying responses from the assistant.






