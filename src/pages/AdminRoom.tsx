import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import {  useParams, useNavigate, Navigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import  { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';
import deleteImg from '../assets/images/delete.svg';
import { database } from '../services/firebase';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

type RoomParams = {
    id: string;
}

export function AdminRoom () {

   // const {user} = useAuth();
    const params = useParams<RoomParams>();
    const navigate = useNavigate();
    const roomId = params.id;

    const {title, questions} = useRoom(roomId);
    async function handleEndRoom(){
       await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        navigate(`/`)
    }

    async function handleCheckQuestionAnswered(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
        }
    
    async function handleHighlightQuestion(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    async function handleDeleteQuestion (questionId:string){
        if(window.confirm('Tem certeza que você deseja excluir essa peegunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                    <RoomCode code={roomId!}/>
                    <Button  onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
                    </div>
                   
                </div>
            </header>

            <main className='content'>
                <div className="room-title">
                    <h1>Sala: <span> {title} </span> </h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>


              <div className="question-list">
              {questions.map(question => {
                  return(
                      <Question
                      key={question.id}
                       content={question.content}
                       author={question.author}
                       isAnswered={question.isAnswered}
                       isHighlighted={question.isHighlighted}
                      >

                          {!question.isAnswered && (
                              <>
                            <button
                             type="button"
                             onClick={() => handleCheckQuestionAnswered(question.id)}
                             >
                             <img src={checkImg} alt="Marcar pergunta como respondida" />
                            </button>

                             <button
                              type="button"
                                 onClick={() => handleHighlightQuestion(question.id)}
                                 >
                                 <img src={answerImg} alt="Dar destaque á pergunta" />
                             </button>
                              </>
                          )}

                        <button
                          type="button"
                             onClick={() => handleDeleteQuestion(question.id)}
                             >
                             <img src={deleteImg} alt="Remover pergunta" />
                        </button>
                </Question>
                  )
              })}
              </div>
            </main>
        </div>
    )
}