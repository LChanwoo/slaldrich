export interface IUser {
  id: number;
  nickname: string;
  email: string;
  workspaces: IWorkspace[];
}

export interface IUserWithOnline extends IUser {
  online: boolean;
}

export interface IChannel {
  id: number;
  name: string;
  private: boolean; // 비공개 채널 여부, 강좌에서는 모두 false(공개)
  workspaceid: number;
}

export interface IChat {
  // 채널의 채팅
  id: number;
  userid: number;
  user: IUser; // 보낸 사람
  content: string;
  createdAt: Date;
  channelid: number;
  channel: IChannel;
}

export interface IDM {
  // DM 채팅
  id: number;
  senderId: number; // 보낸 사람 아이디
  sender: IUser;
  receiverId: number; // 받는 사람 아이디
  receiver: IUser;
  content: string;
  createdAt: Date;
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string; // 주소 창에 보이는 주소
  ownerId: number; // 워크스페이스 만든 사람 아이디
}
