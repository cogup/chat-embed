import { configureStore } from "@reduxjs/toolkit";
import chatReducer, { ChatEntityState } from "../modules/chat/entities/chat";
import messageReducer, {
  MessageEntityState,
} from "../modules/message/entities/message";

export interface Reducer {
  chatEntity: ChatEntityState;
  messageEntity: MessageEntityState;
}

const store = configureStore({
  reducer: {
    chatEntity: chatReducer,
    messageEntity: messageReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
