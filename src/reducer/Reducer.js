const reducer = (state, action) => {
    switch (action.type) {
        case "SET_VIDEOS":
            return {
                ...state,
                videos: action.payload,
            };
        case "SET_PODCASTS":
            return {
                ...state,
                podcasts: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.payload,
            };
        case "UPDATE_PLAYLISTS":
            return {
                ...state,
                playlists: [...state.playlists, action.payload],
            };
        case "SET_SUBSCRIPTIONS":
            return {
                ...state,
                subscriptions: action.payload,
            };
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    ...action.payload,
                },
            };
        case "SET_IS_ERROR":
            return {
                ...state,
                isError: {
                    ...state.isError,
                    ...action.payload,
                },
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export default reducer;
