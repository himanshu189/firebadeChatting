import { useEffect, useState } from "react";

import firebase from "./helpers/firebase";
const Test = () => {
  const [change, setChange] = useState("true");
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
const[edit,setEdit]=useState(false)
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("chatting")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        var xyz = [];
        querySnapshot.docs.map((doc, i) => {
          let newObj = {
            data: doc.data(),
            id: doc.id,
          };
          xyz.push(newObj);
          return true;
        });
        setChat(xyz);
      });
  }, [db]);

  const sendMsg2 = async () => {
    document.getElementById("tex").value = "";
    const done = await db.collection("chatting").add({
      name: msg,
      createdAt: Date.now(),
      type: "himanshu",
    });
    console.log(done);

    setMsg("");
    setEdit(false)
  };

  const deleteChat = async (chatId) => {
    const res = await db.collection("chatting").doc(chatId).delete();
  };

  const editMsg=async(chat)=>{
    console.log("Edit")
    document.getElementById('tex').value=chat.data.name;
    setMsg(chat.data.name)
    document.getElementById('tex').focus()
    setEdit(chat.id)
  }

const finalEdit=()=>{


  document.getElementById("tex").value = "";



  db.collection("chatting").doc(edit).update({ name: msg });
  setMsg("");
  setEdit(false)
}

  return (
    <div
      style={{
        marginLeft: "400px",
        marginRight: "400px",
        backgroundColor: "#000000",
        border: "2px solid black",
        borderRadius: "50px",
      }}
      className=" mt-3 "
    >
      {chat &&
        chat.map((chat, i) => (
          <div className="mr-5 ml-5 mt-3">
            {chat?.data.type !== "himanshu" ? (
              <div key={i} className="text-left ">
                <span
                  className="text-left bg-primary text-light p-1"
                  style={{
                    width: "auto",
                    border: "2px solid ",
                    borderRadius: "0px 5px 5px 5px",
                  }}
                >
                  {chat.data.name}

                  <sub
                    style={{
                      color: "white",
                      fontSize: "12px",
                      paddingLeft: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    {new Date(chat.data.createdAt).toLocaleTimeString([], {
                      timeStyle: "short",
                    })}
                  </sub>
                </span>
              </div>
            ) : (
              <div key={i} className="text-right">
                <span
                  className="text-right bg-dark text-light p-1 "
                  style={{
                    width: "auto",
                    border: "2px solid ",
                    borderRadius: "5px 0px 5px 5px",
                  }}
                >
                  {chat?.data.name}

                  <sub
                    style={{
                      color: "white",
                      fontSize: "12px",
                      paddingLeft: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    {new Date(chat.data.createdAt).toLocaleTimeString([], {
                      timeStyle: "short",
                    })}
                  </sub>
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                  onClick={() => deleteChat(chat.id)}
                  style={{cursor: "pointer"}}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                  style={{cursor: "pointer"}}
                  onClick={()=>editMsg(chat)}
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </div>
            )}
            <br />
          </div>
        ))}

      <div className="text-center mt-3  mb-4">
        <input
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          id="tex"
          style={{
            width: "80%",
            border: "2px solid",
            borderRadius: "5px",
            height: "40px",
          }}
          placeholder="Type a message..."
          onKeyDown={(event) => event.key === "Enter" && ( !edit ? sendMsg2() : finalEdit() )}
        ></input>
      </div>
    </div>
  );
};

export default Test;
