"use client"
import Image from 'next/image'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';

export default function Home() {

  const [messages, setMessages] = useState([]);
  const [userText, setUsertext] = useState([]);

  const generateEndPoint = async () => {
    const newMessage = { user: true, text: userText }
    setMessages([...messages, newMessage, { user: false, text: "Estoy pensando ..." }]);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userText }),
    });

    const data = await response.json();
    const { output } = data;

    const botResponse = { user: false, text: output.text };
    setMessages([...mesagges, newMessage, botResponse]);
  }

  const onUserChangeText = (event) => {
    console.log(event.target.value);
    setUsertext(event.target.value);
  }

  return (
    <>
     <>
      <section >
        <div className="container mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-10 col-xl-10">
              <div className="cardd" id="chat2">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h4 className="mb-0">Chat</h4>
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-mdb-ripple-color="dark"
                    disabled
                  >
                    Comienza a chatear
                  </button>
                </div>
                <div
                  className="card-body scr"
                  data-mdb-perfect-scrollbar="true"
                >
                  <div className="card-footer d-flex justify-content-start align-items-center p-3 mb-3 enviador">
                    <img
                      className='imagen_enviador'
                      src="https://media3.giphy.com/media/l41lFj8afmWIo3yW4/giphy.gif?cid=ecf05e470x3vutfokg7dkpq3qb1bmfqzfynl16zr4ivunrt0&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                      alt="avatar 3"
                    />
                    <p className='text-black m-2'>Hola, pregunta lo que quieras 👁️</p>

                  </div>

                  {messages.map((message, index) => (
                    <div key={index} className="message-container">
                      {message.user ? (
                        <>
                          <div key={index} className="card-footer text-muted d-flex justify-content-end align-items-center p-3 bg-dark receptor mb-3">

                            <h6 className="text-light text-bold m-3">{message.text}</h6>

                            <img className="imagen_enviador2"
                              src="https://media1.giphy.com/media/Bpazs9pI5X4IXhClD5/giphy.gif?cid=ecf05e47gx499c1eow00nrn7ciqi7g2sjbwnepver2w5s6uz&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="avatar 3" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div key={index} className="card-footer text-muted d-flex justify-content-start align-items-center p-3 mb-3 bg-dark enviador">
                            <img
                              className='imagen_enviador'
                              src="https://media3.giphy.com/media/l41lFj8afmWIo3yW4/giphy.gif?cid=ecf05e470x3vutfokg7dkpq3qb1bmfqzfynl16zr4ivunrt0&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                              alt="avatar 3"
                            />
                            <p className='text-light m-2'>{message.text}</p>

                          </div>
                        </>
                      )}
                    </div>
                  ))}

                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-2 bg-dark send-block">
                  <img
                    src="https://media1.giphy.com/media/Bpazs9pI5X4IXhClD5/giphy.gif?cid=ecf05e47gx499c1eow00nrn7ciqi7g2sjbwnepver2w5s6uz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="avatar 3"
                    className='imagen_env'
                  />
                  <input
                    type="text"
                    className="form-control form-control-lg m-2"
                    id="exampleFormControlInput1"
                    placeholder="Escribe un mensaje"

                    value={userText}
                    onChange={onUserChangeText}
                  />
                  <button className="btn btn-transparent" onClick={() => {
                    generateEndPoint();
                  }}>
                    <i className="text-light">Enviar</i>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    </>
  )
}
