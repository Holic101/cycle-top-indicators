import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMAG7Data, getBTCData } from '../../services/api';
import type { MAG7Data, BTCData } from '../../types';

interface MarketDataState {
  mag7: MAG7Data | null;
  btc: BTCData | null;
  loading: boolean;
  error: string | null;
}

const initialState: MarketDataState = {
  mag7: null,
  btc: null,
  loading: false,
  error: null,
};

export const fetchMarketData = createAsyncThunk(
  'marketData/fetchAll',
  async () => {
    const [mag7Data, btcData] = await Promise.all([
      getMAG7Data(),
      getBTCData(),
    ]);
    return { mag7Data, btcData };
  }
);

const marketDataSlice = createSlice({
  name: 'marketData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketData.fulfilled, (state, action) => {
        state.loading = false;
        state.mag7 = action.payload.mag7Data;
        state.btc = action.payload.btcData;
      })
      .addCase(fetchMarketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch market data';
      });
  },
});

export default marketDataSlice.reducer;