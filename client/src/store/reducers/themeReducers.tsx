export const THEME = 'THEME';

interface SetThemeAction {
    type: typeof THEME
    payload: boolean
}

// redux
const initialState: boolean = false;

const themeReducer = (state = initialState, action: SetThemeAction) => {
    switch(action.type) {
        case THEME:
            return action.payload;
        default:
            return state;
    }
}

export default themeReducer;