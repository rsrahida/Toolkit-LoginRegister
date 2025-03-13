import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((user) => user.email === userData.email);
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        age: userData.age,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
      };

      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      const { password, ...userWithoutPassword } = newUser;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const users = localStorage.getItem("users" || []);
      const user = users.find(
        (user) =>
          user.email === loginData.email && user.password === loginData.password
      );
      if (!user) {
        throw new error("Invalid loginData");
      }
      const { password, ...userWithoutPassword } = user;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

const initialState = {
  user: loadUserFromStorage,
  isAuthenticated: !!loadUserFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
