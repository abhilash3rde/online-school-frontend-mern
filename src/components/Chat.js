import React, { Component } from "react";
import Icon from "react-icons-kit";
import validator from "validator";
import classNames from "classnames";
import {
  search,
  chevronUp,
  chevronRight,
  chevronDown,
  sendO,
  chevronLeft
} from "react-icons-kit/fa/";
import moment from "moment";
import io from "socket.io-client";
import { Collapse } from "reactstrap";
import {
  getAllAdminsApi,
  getAllParentsApi,
  getAllTeachersApi
} from "../services/api";
import { baseUrl } from "../services/Constants";
import chatIcon from "../assets/icons/chat.svg";
import userIcon from "../assets/icons/user-blue.svg";

export class Chat extends Component {
  constructor() {
    super();
    this.chatHeader = this.chatHeader.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
    this.handleUnselectUser = this.handleUnselectUser.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handelMsgTypeChange = this.handelMsgTypeChange.bind(this);
    this.recieveMessage = this.recieveMessage.bind(this);
    this.sortListByTime = this.sortListByTime.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getAdmin = this.getAdmin.bind(this);
    this.getTeachers = this.getTeachers.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.getParent = this.getParent.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
    this.filterList = this.filterList.bind(this);

    // this.socket = io(baseUrl);

    this.socket.on("RECEIVE_MESSAGE", data => {
      this.addMessage(data);
    });
    this.state = {
      users: [],
      filteredUsers: [],
      selectUser: null,
      isSelectUser: false,
      chatOpen: false,
      chatSearch: "",
      username: "",
      msg: [],
      chatRooms: [],
      chatMsg: "",
      selectedRoom: null,
      messages: [],
      newMsgInRoom: {},
      messagesByRoom: {},
      currentTime: new Date()
    };
  }

  componentDidMount() {
    this.getUsers();
    this.socket.on("new_message", data => {
      // The oncoming message should be rendered here
      console.log(data);
      this.recieveMessage(data);
    });
  }
  socket = io(baseUrl);
  recieveMessage(data) {
    // newMsgInRoom
    this.sortListByTime();
    const { room, room2 } = data;
    const { selectedRoom } = this.state;
    let messagesByRoom = this.state.messagesByRoom;
    let newMsgInRoom = this.state.newMsgInRoom;
    if (messagesByRoom[room])
      messagesByRoom[room] = [...messagesByRoom[room], data];
    else messagesByRoom[room] = [data];
    if (messagesByRoom[room2])
      messagesByRoom[room2] = [...messagesByRoom[room2], data];
    else messagesByRoom[room2] = [data];

    if (!selectedRoom) {
      newMsgInRoom[room] = newMsgInRoom[room]++;
      newMsgInRoom[room2] = newMsgInRoom[room2]++;
    } else if (
      selectedRoom.room1 !== room &&
      selectedRoom.room1 !== room2 &&
      selectedRoom.room2 !== room &&
      selectedRoom.room2 !== room2
    ) {
      // alert("hii");
      newMsgInRoom[room] = newMsgInRoom[room]++;
      newMsgInRoom[room2] = newMsgInRoom[room2]++;
    }

    this.setState({ messagesByRoom, newMsgInRoom }, () => {
      console.log({ msg: newMsgInRoom });
    });
  }
  getAdmin() {
    if (true) {
      getAllAdminsApi()
        .then(res => res.json())
        .then(resJson => {
          const { status, Unverified, verified } = resJson;
          if (status) {
            console.log(resJson);
            if (Unverified.constructor === Array) {
              this.setState({
                users: [...this.state.users, ...Unverified]
              });
            }
            if (verified.constructor === Array) {
              this.setState(
                {
                  users: [...this.state.users, ...verified]
                },
                () => {
                  // this.getParent();
                  // console.log(this.state);
                }
              );
            }
          }
        });

      this.getParent();
    }
  }
  getParent() {
    if (true) {
      getAllParentsApi()
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          const { status, Unverified, verified } = resJson;

          if (status) {
            console.log(resJson);
            if (Unverified.constructor === Array) {
              this.setState(
                {
                  users: [...this.state.users, ...Unverified]
                },
                () => {
                  // this.getTeachers();
                }
              );
            }
            if (verified.constructor === Array) {
              this.setState(
                {
                  users: [...this.state.users, ...verified]
                },
                () => {
                  // this.getTeachers();
                }
              );
            }
          }
        });
      this.getTeachers();
    }
  }
  getTeachers() {
    if (true) {
      getAllTeachersApi()
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          const { status, verified } = resJson;

          if (status) {
            console.log(resJson);
            if (verified.constructor === Array) {
              this.setState(
                {
                  users: [...this.state.users, ...verified]
                },
                () => {
                  this.createAllRooms();
                }
              );
            }
          }
        });
    }
  }
  getStudents() {
    if (true) {
      // getAllTeachersApi()
      //   .then(res => res.json())
      //   .then(resJson => {
      //     console.log(resJson);
      //     const { status, verified } = resJson;
      //     if (status) {
      //       console.log(resJson);
      //       if (verified.constructor === Array) {
      //         this.setState(
      //           {
      //             users: [...this.state.users, ...verified]
      //           },
      //           () => {
      //             this.createAllRooms();
      //           }
      //         );
      //       }
      //     }
      //   });
    }
  }
  getUsers() {
    this.getAdmin();
  }
  sortListByTime() {
    console.log("run sort list ");
    const { users, filteredUsers, newMsgInRoom, messagesByRoom } = this.state;
    let newRoom = [];
    let tempUsers = users;
    Object.keys(messagesByRoom).map(el => {
      if (messagesByRoom[el]) newRoom = [...newRoom, ...messagesByRoom[el]];
    });
    // console.log({newRoom, messagesByRoom})
    newRoom.sort((a, b) => {
      // console.log(moment(a.createdAt).format("X"))
      let fDate = moment(a.createdAt).format("X");
      let sDate = moment(b.createdAt).format("X");
      // console.log({fDate, sDate})
      // conso
      if (fDate < sDate) return 1;
      if (fDate > sDate) return -1;

      return 0;
    });
    tempUsers.sort((a, b) => {
      var first =
        newRoom.find(el => el.sender === a.email || el.receiver === a.email) ||
        {};
      var sec =
        newRoom.find(el => el.sender === b.email || el.receiver === b.email) ||
        {};

      console.log({ first, sec, newRoom });

      if (first.createdAt && sec.createdAt) {
        let fDate = moment(first.createdAt).format("X");
        let sDate = moment(sec.createdAt).format("X");
        if (fDate > sDate) {
          return 1;
        } else if (fDate < sDate) {
          return -1;
        }
      } else if (first.createdAt) return 1;
      else if (sec.createdAt) return -1;

      return 0;
    });
    this.setState({ users: tempUsers }, () => {
      console.log(this.state.users, tempUsers);
      this.filterList();
    });
    // console.log({users, filteredUsers, newMsgInRoom, messagesByRoom})
  }
  filterList() {
    const { users: filterList, chatSearch: query } = this.state;
    let userArr = []; //= adminList
    filterList.map(el => {
      let item = el;
      item.fullName = `${el.firstName} ${el.lastName} ${el.email} ${el.role}`;
      userArr.push(item);
      return null;
    });
    userArr = userArr.filter(function(user) {
      return user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1; // returns true or false
    });
    this.setState({ filteredUsers: userArr });
  }
  createAllRooms() {
    console.log({ usersList: this.state.users });
    this.state.users.map(el => {
      const { user } = this.props;
      const { email } = el;
      let newMsgInRoom = this.state.newMsgInRoom;
      console.log(1);
      if (email === user.email) return;

      let anotherUser = email.split("@")[0];
      let thisUser = user.email.split("@")[0];
      var params = {
        room1: `${thisUser}!${anotherUser}`,
        room2: `${anotherUser}!${thisUser}`
      };

      newMsgInRoom[`${thisUser}!${anotherUser}`] = 0;
      newMsgInRoom[`${anotherUser}!${thisUser}`] = 0;
      // console.log(el.email, this.props.user.email);
      this.socket.emit("join_PM", params);
      this.setState(prevState => ({
        newMsgInRoom,
        chatRooms: [...prevState.chatRooms, `${thisUser}!${anotherUser}`]
      }));
    });
    this.filterList();
  }
  getUserImage(arr = [], email = "") {
    let image = userIcon;
    arr.map(el => {
      if (email === el.email) {
        if (el.image) image = el.image;
      }
    });
    return image;
  }
  getTimeText(time = new Date(), currentTime = new Date()) {
    let seconds = (new Date().getTime() - time.getTime()) / 1000;
    let timeString = `${seconds} secound ago.`;
    return timeString;
  }
  toggleChatBox() {
    this.setState(prevState => ({
      chatOpen: !prevState.chatOpen
    }));
    // $(this.refs.chatBody).slideToggle();
  }
  handleTextChange(e) {
    this.setState(
      {
        chatSearch: e.target.value
      },
      () => {
        this.filterList();
      }
    );
  }
  addMessage = data => {
    console.log(data);
    this.setState({ messages: [...this.state.messages, data] });
    console.log(this.state.messages);
  };
  handelMsgTypeChange(e) {
    this.setState({
      chatMsg: e.target.value
    });
  }
  chatHeader() {
    const { chatOpen } = this.state;
    return (
      <div
        className={classNames("chat-header", {
          open: chatOpen
        })}
        onClick={() => {
          this.toggleChatBox();
        }}
      >
        <div className="chat-header-left">
          <div className="chat-icon">
            <img src={chatIcon} alt="user" />
          </div>
          <div className="chat">
            <p>Chat</p>
          </div>
        </div>
        <div className="chat-dwn-arrow">
          <Icon icon={chatOpen ? chevronDown : chevronUp} />
        </div>
      </div>
    );
  }
  chatSearch() {
    const { chatSearch } = this.state;
    return (
      <div className="chat-search">
        <div className={classNames("inputs")}>
          <label className="label" htmlFor="phone_tf">
            Search conversation
          </label>
          <input
            type="text"
            id="phone_tf"
            className={classNames("input")}
            placeholder="Enter name..."
            value={chatSearch}
            onChange={this.handleTextChange}
          />
          <span className="search-icon">
            <Icon icon={search} />
          </span>
        </div>
      </div>
    );
  }
  handleSelectUser(selectUser) {
    const thisUser = this.props.user.email.split("@")[0];
    const anotherUser = selectUser.email.split("@")[0];
    const room1 = `${thisUser}!${anotherUser}`;
    const room2 = `${anotherUser}!${thisUser}`;
    const { newMsgInRoom } = this.state;
    if (selectUser) {
      this.setState({
        selectUser,
        username: selectUser.email,
        selectedRoom: { room1, room2 },
        [newMsgInRoom[room1]]: 0,
        [newMsgInRoom[room2]]: 0
      });
    } else
      this.setState({ selectUser: null, username: "", selectedRoom: null });
  }
  handleUnselectUser() {
    this.setState({ selectUser: null, username: "" });
  }
  sendMessage = ev => {
    if (ev) ev.preventDefault();
    const { username, chatMsg, selectedRoom } = this.state;
    const { user } = this.props;
    //Logic for creating the name of the room goes here
    // var sen = user.email;
    // var splitsen = sen.split("@");
    // var param2 = splitsen[0];
    // // console.log({ "sender ": param2 });

    // var rec = username;
    // var splitrec = rec.split("@");
    // var param1 = splitrec[0];
    // // console.log({ "reciever ": param1 });

    // var room1 = param1 + "!" + param2;
    // // console.log({ room1: room1 });
    // var newParam = room1.split("!");
    // this.swap(newParam, 0, 1);
    // var paramTwo = newParam[0] + "!" + newParam[1];
    // // console.log({ room2: paramTwo });

    // var params = {
    //   room1: room1,
    //   room2: paramTwo
    // };

    // this.socket.on("connect", function(socket) {

    // });

    // Emitting the join Room event
    // this.socket.emit("join_PM", params);
    // console.log({

    //   sender: user.email,
    //   receiver: username,
    // })
    //Emitting the private message event
    if (this.state.chatMsg.trim().length > 0) {
      // alert("msg length exceed 0");
      let data = {
        sender: user.email,
        receiver: username,
        message: chatMsg,
        text: chatMsg,
        createdAt: Date(),
        isRead: false,
        room: selectedRoom.room1,
        room2: selectedRoom.room2
      };
      this.socket.emit("private_message", data, () => {
        // this.setState(prevState=>({
        //   messages: [...prevState.messages, data]
        // }), ()=>{
        //   console.log({msg: this.state.messages})
        // })
        console.log("Message sent");
      });
    }

    this.setState({ chatMsg: "" });
  };

  userList(list) {
    const { user } = this.props;
    return list.map((el, index) => {
      if (el.email === user.email) return null;

      return (
        <div
          key={index}
          onClick={() => {
            this.handleSelectUser(el);
          }}
          className={classNames("chat-user", {
            "new-msg": el.newMsg > 0
          })}
        >
          <div className="user-left">
            <div className="user-left-icon-one">
              <img src={el.image ? el.image : userIcon} alt="user" />
            </div>
            {validator.isAlpha(el.firstName) ||
            validator.isAlpha(el.lastName) ? (
              <p>{`${el.firstName} ${el.lastName} (${el.role})`}</p>
            ) : (
              <p>{`${el.email} (${el.role})`}</p>
            )}
          </div>
          <div className="user-right-icon">
            {el.newMsg > 0 ? <p>+{el.newMsg}</p> : <Icon icon={chevronRight} />}
          </div>
        </div>
      );
    });
  }
  renderMsgBox() {
    const { messagesByRoom, selectedRoom, users, username } = this.state;
    const {
      user: { email }
    } = this.props;
    return (
      <div className="chat-message-wrapper">
        <div
          className={classNames("chat-message-wrapper-inner", {
            // "no-msg": !messagesByRoom[selectedRoom.room1],
            "no-msg": !(
              messagesByRoom[selectedRoom.room1] &&
              messagesByRoom[selectedRoom.room1].length
            )
          })}
        >
          {!messagesByRoom[selectedRoom.room1] && (
            <div className="">
              <p>You haven't any messages =(</p>
            </div>
          )}
          {messagesByRoom[selectedRoom.room1] &&
            messagesByRoom[selectedRoom.room1].length < 1 && (
              <div className="no-msg">
                <p>You haven't any messages =(</p>
              </div>
            )}
          {messagesByRoom[selectedRoom.room1] &&
            messagesByRoom[selectedRoom.room1].map((el, index) => {
              // console.log(el.sender)
              // console.log(this.getUserImage(users, el.sender));
              return (
                <div
                  className={classNames("chat-message", {
                    sended: el.sender === email,
                    recieved: el.sender !== email
                  })}
                  key={index}
                >
                  <div className="chat-message-text">
                    <p>{el.text}</p>
                    <span>
                      {/* {moment("20190222", "YYYYMMDD").fromNow()} */}
                      {moment(el.createdAt).fromNow()}
                      {/* {this.getTimeText(new Date(el.createdAt), this.state.currentTime)} */}
                    </span>
                  </div>
                  <div className="chat-message-user-div">
                    <img
                      className="chat-message-user-icon"
                      src={this.getUserImage(users, el.sender)}
                      alt={el.sender}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  renderTypeBox() {
    const { chatMsg } = this.state;
    return (
      <div className="chat-type-box">
        <div className="chat-type-inner">
          <div className={classNames("inputs")}>
            <input
              type="text"
              id="phone_tf"
              className={classNames("input")}
              placeholder="Enter your message..."
              value={chatMsg}
              onKeyDown={this.pressEnter}
              onChange={this.handelMsgTypeChange}
            />
            <span className="search-icon" onClick={this.sendMessage}>
              <Icon icon={sendO} />
            </span>
          </div>
        </div>
      </div>
    );
  }
  pressEnter(e) {
    // console.log(e.shiftKey, e.keyCode)
    if (e.shiftKey) return;
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  }
  renderSelectedList(el) {
    return (
      <div
        onClick={() => {
          this.handleUnselectUser();
        }}
        className={classNames("chat-user selected-header", {
          // "new-msg": el.newMsg > 0
        })}
      >
        <div className="user-left">
          <div className="user-left-icon-one">
            <img src={el.image ? el.image : userIcon} alt="user" />
          </div>
          {el.firstName === "" && el.lastName === "" ? (
            <p>{`${el.email} (${el.role})`}</p>
          ) : (
            <p>{`${el.firstName} ${el.lastName} (${el.role})`}</p>
          )}
        </div>
        <div className="user-right-icon">
          {el.newMsg > 0 ? <p>+{el.newMsg}</p> : <Icon icon={chevronLeft} />}
        </div>
      </div>
    );
  }
  render() {
    const { selectUser, chatOpen, filteredUsers } = this.state;
    return (
      <div className="chat-box">
        {this.chatHeader()}

        <Collapse className="chat-box-body" isOpen={chatOpen}>
          {/* <div ref="chatBody" > */}
          <div className="chat-box-body-inner">
            {!selectUser && this.chatSearch()}
            {!selectUser && (
              <div className="chat-user-list">
                {this.userList(filteredUsers)}
              </div>
            )}
            {selectUser && (
              <div className="selected-chat-box">
                {selectUser && this.renderSelectedList(selectUser)}
                {this.renderMsgBox()}
                {this.renderTypeBox()}
              </div>
            )}
          </div>
          {/* </div> */}
        </Collapse>
      </div>
    );
  }
  swap(input, value_1, value_2) {
    var temp = input[value_1];
    input[value_1] = input[value_2];
    input[value_2] = temp;
  }
}
