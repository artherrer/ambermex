import { CreateGroupChat, CreateIndividualChat } from '../models';
import { axiosPrivate } from './axios.service';

export default class ChatService {

  static createIndividualChat = (data: CreateIndividualChat) => axiosPrivate.post('/Conversations/Create1v1Channel', data);


  static createGroupChat = (data: CreateGroupChat) => axiosPrivate.post('/Conversations/CreateGroupXMPP', data);


}
