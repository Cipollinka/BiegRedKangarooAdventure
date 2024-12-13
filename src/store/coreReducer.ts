import {createSlice} from '@reduxjs/toolkit';

export interface CoreState {
  userInfo: {
    name: string;
    avatarIndex: number;
  } | null;
  globalScore: number;
  activeLevel: number;
  activeTooltipIndex: number;
  showOnboardingScreen: boolean;
  availableAvatars: number[];
  currentRouteName?: string;
}

const initialState: CoreState = {
  userInfo: null,
  globalScore: 0,
  showOnboardingScreen: false,
  activeTooltipIndex: 0,
  availableAvatars: [0],
  currentRouteName: 'Home',
  activeLevel: 1,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    reset(state) {
      state.userInfo = null;
      state.globalScore = 0;
      state.availableAvatars = [0];
      state.activeTooltipIndex = 0;
      state.currentRouteName = 'Home';
      state.showOnboardingScreen = false;
    },
    setCurrentRouteName(state, action) {
      state.currentRouteName = action.payload;
    },
    setActiveLevel(state, action) {
      state.activeLevel = action.payload;
    },
    setShowOnboardingScreen: (state, action) => {
      state.showOnboardingScreen = action.payload;
    },
    incrementActiveTooltipIndex: state => {
      state.activeTooltipIndex = (state.activeTooltipIndex || 0) + 1;
    },
    setAvailableAvatars: (state, action) => {
      state.availableAvatars = action.payload;
    },
    saveGlobalScore: (state, action) => {
      state.globalScore = action.payload;
    },
    changeUserInfo: (state, action) => {
      state.userInfo = {
        ...(state.userInfo || {}),
        ...action.payload,
      };
    },
  },
});

export const {
  reset,
  changeUserInfo,
  setCurrentRouteName,
  setAvailableAvatars,
  saveGlobalScore,
  setActiveLevel,
  setShowOnboardingScreen,
  incrementActiveTooltipIndex,
} = coreSlice.actions;
