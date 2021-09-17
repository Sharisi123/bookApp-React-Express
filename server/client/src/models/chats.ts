export interface IChat {
  _id: string;
  chatName: string;
  messages: [
    {
      _id: string;
      userId: string;
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
