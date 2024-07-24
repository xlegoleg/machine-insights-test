import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index.ts'

export interface Insight {
  id: string;
  created_at: string;
  type: 'bearing' | 'gear' | 'motor';
  severity: 'healthy' | 'alarm' | 'critical';
}

interface InsightState {
  insights: Insight[];
  updateFlag: boolean;
}

const initialState: InsightState = {
  insights: [],
  updateFlag: false,
};

const insightSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setInsights(state, action: PayloadAction<Insight[]>) {
      state.insights = action.payload;
    },
    addInsight(state, action: PayloadAction<Insight>) {
      state.insights.push(action.payload);
    },
    updateDataFlag(state, action: PayloadAction<boolean>) {
      state.updateFlag = action.payload
    }
  },
});

export const { setInsights, addInsight, updateDataFlag } = insightSlice.actions;
export const selectInsights = (state: RootState) => state.insights.insights;

export const selectUpdateFlag = (state: RootState) => state.insights.updateFlag;

export const insightsReducer = insightSlice.reducer
