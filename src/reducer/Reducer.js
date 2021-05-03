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
        case "SET_PLAYLIST_NAME":
            return {
                ...state,
                playListName: action.payload,
            };
        case "CREATE_PLAYLIST":
            return {
                ...state,
                playList: [
                    ...state.playList,
                    {
                        id: state.playListName,
                        name: state.playListName,
                        createdBy: "You",
                        videos: [],
                    },
                ],
            };
        case "DELETE_PLAYLIST":
            return {
                ...state,
                playList: state.playList.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case "ADD_TO_PLAYLIST":
            return {
                ...state,
                playList: [
                    ...state.playList.filter(
                        (playList) =>
                            playList.id !== action.payload.currPlayList.id
                    ),
                    {
                        ...action.payload.currPlayList,
                        videos: [
                            ...action.payload.currPlayList.videos,
                            action.payload.currVideo,
                        ],
                    },
                ],
            };
        case "REMOVE_FROM_PLAYLIST":
            return {
                ...state,
                playList: [
                    ...state.playList.filter(
                        (playList) =>
                            playList.id !== action.payload.currPlayList.id
                    ),
                    {
                        ...action.payload.currPlayList,
                        videos: action.payload.currPlayList.videos.filter(
                            (video) => video.id !== action.payload.currVideo.id
                        ),
                    },
                ],
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
