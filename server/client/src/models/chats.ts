export interface IChat {
  _id: string;
  users: string[];
  chatName: string;
  messages: [
    {
      _id: string;
      userId: string;
      username: string;
      message: string;
      createdAt: string;
    }
  ];
  createdAt: string;
}

export interface ICreateChat {
  chatName: string;
  users: string[];
}
