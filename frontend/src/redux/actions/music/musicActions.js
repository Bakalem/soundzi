import {
	CHANGE_THEME_COLOR,
	CHANGE_CURRENT_PLAYLIST,
} from "../../types/types";

export const changeThemeColor = theme => ({
	type: CHANGE_THEME_COLOR,
	theme
})


export const changeCurrentPlaylist = index => ({
	type: CHANGE_CURRENT_PLAYLIST,
	index
})
