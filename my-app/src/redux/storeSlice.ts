import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type Stores = {
  meta: {};
  data: [];
  included: Array<{
    type: string;
    id: string;
    attributes: {
      code: string;
      name: string;
      fullName: string;
      copiesSold: number;
    };
    relationships: { author: { data: { id: string; type: string } } };
  }>;
};
type InitialState = {
  loading: boolean;
  stores: Stores;
  error: string;
};
const initialState: InitialState = {
  loading: false,
  stores: {
    meta: {},
    data: [],
    included: [],
  },
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchStores = createAsyncThunk('user/fetchStores', () => {
  return axios
    .get('http://localhost:4000/stores')
    .then((response) => response.data);
});

export const updateRating = createAsyncThunk(
  'user/updateRating',
  (req: { rate: number; id: string }, response) => {
    axios.post(
      `http://localhost:4000/stores/${req.id}`,
      {
        data: {
          attributes: {
            rating: req.rate,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
      }
    );
  }
);

const storeSLice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStores.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchStores.fulfilled,
      (state, action: PayloadAction<Stores>) => {
        state.loading = false;
        state.stores.data = action.payload.data;
        state.stores.included = action.payload.included;
        state.stores.meta = action.payload.meta;
        state.error = '';
      }
    );
    builder.addCase(fetchStores.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(updateRating.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default storeSLice.reducer;
