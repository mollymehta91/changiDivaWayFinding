/**
 * Enum constants for the entire application
 * 
 * @remarks
 * This file contains all the enum constants used in the application. It is
 * important to have a single source of truth for all the constants in the
 * application. This makes it easier to maintain and update the application.
 * 
 * @packageDocumentation
 */

/**
 * Recording constants
 * 
 * @remarks
 * This enum contains constants related to recording audio. It is used to
 * determine the status of the recording.
 */
export const RECORDING = {
    /**
     * The user has granted permission to record audio
     */
    GRANTED: 'granted'
};

/**
 * Form data constants
 * 
 * @remarks
 * This enum contains constants related to the form data sent to the server.
 * It is used to construct the form data object.
 */
export const FORM_DATA = {
    /**
     * The key for the file in the form data
     */
    FORM_DATA_FILE: 'file',
    /**
     * The name of the file in the form data
     */
    FORM_DATA_NAME: 'recording.m4a',
    /**
     * The type of the file in the form data
     */
    FORM_DATA_TYPE: 'audio/m4a',
    /**
     * The model to use for transcription in the form data
     */
    FORM_DATA_MODEL: 'whisper-1',
    /**
     * The language to use for transcription in the form data
     */
    FORM_DATA_LANGUAGE: 'en' 
};

/**
 * Direction constants
 * 
 * @remarks
 * This enum contains constants related to the direction API. It is used to
 * construct the request to the direction API.
 */
export const DIRECTION = {
    /**
     * The URL of the direction API
     */
    URL: process.env.EXPO_PUBLIC_CHANGI_BACKEND_URL,
    /**
     * The authorization header for the direction API
     */
    AUTHORIZATION: `${process.env.EXPO_PUBLIC_CHANGI_BACKEND_API_KEY}`,
    /**
     * The content type of the request to the direction API
     */
    CONTENT_TYPE: 'application/json',
    /**
     * The language to use for the direction API
     */
    LANGUAGE: 'English'
};

/**
 * OpenAI constants
 * 
 * @remarks
 * This enum contains constants related to the OpenAI API. It is used to
 * construct the request to the OpenAI API.
 */
export const OPENAI = {
    /**
     * The URL of the OpenAI API
     */
    URL: process.env.EXPO_PUBLIC_OPENAI_API_URL,
    /**
     * The authorization header for the OpenAI API
     */
    AUTHORIZATION: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
    /**
     * The content type of the request to the OpenAI API
     */
    CONTENT_TYPE: 'multipart/form-data',
};

/**
 * Map constants
 * 
 * @remarks
 * This enum contains constants related to the map. It is used to construct the
 * URL of the map.
 */
export const MAP = {
    /**
     * The URL of the map
     */
    URL: 'https://www.changiairport.com/en/maps.html#t1.l2/103.99034656584263/1.3623674000421175'
};
