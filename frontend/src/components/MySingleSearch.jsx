import React from 'react'
import { accessChat } from '../redux/actions/chatsActions';
import { useDispatch } from 'react-redux';

export const MySingleSearch = ({user,handleFunction}) => {
    
  return (
    <li className="p-2 border-bottom">
                          <a
                            href="#!"
                            className="d-flex justify-content-between"
                            onClick={handleFunction}
                          >
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  src={`data:image/jpeg;base64,${user.pic}`} 
                                  alt="avatar"
                                  className="d-flex align-self-center me-3"
                                  width="60"
                                />
                                <span className="badge bg-success badge-dot"></span>
                              </div>
                              <div className="pt-1">
                                <p className="fw-bold mb-0">{user?.name || "Unknown"}</p>
                                
                              </div>
                            </div>
                            
                          </a>
                        </li>
  )
}
