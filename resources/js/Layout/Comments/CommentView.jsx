import React, { useState, useEffect } from 'react'
import '../../../css/Commentstye/Comments.css'
import { useParams } from 'react-router-dom';

function CommentView({ id }) {
    ///getReviewes/{id}
    const [comments,setComments] = useState([]);
    const idCar = id;
   //const { id } = useParams(); // This will give you the value of "id" from the URL

    const getComments = async () => {
        console.log("get car By Id ")
    const token = localStorage.getItem("token")

        console.log(idCar)
        try {
            const response = await axios.get(`/getReviewes/${idCar}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
            const data = response.data;
            setComments(data.data.comments);
            console.log(data.data);
        } catch (error) {
            console.error(error);
        } 
    };
    useEffect(() => {
        getComments()
    }, []);

    /*   try {
        const response = await axios.get('/cars');
        const data = response.data;
        onSuccess(data)
        console.log(data);
    } catch (error) {
        console.error(error);
    } */


    const appendComment = (comments) => {
        setComments([comments, ...comments])
    }
  return (
      <div className=''>
       
              {comments.map((comment, index) => ( 
                  <div className={'comment '} key={index}>
                      <div className='row comment_user'>
                          <div className='col-2 comment_user_img'>
                       <img src={comment.owner_of_comment.photo_user} alt='' className={'comment__avatar'} />

                  </div>
                    <div className='col-10 comment_body'>
                                    <h4 className={'comment__author '}>{comment.owner_of_comment.name}</h4> 
                              <div className={'comment__content '}>
                                  <p className={'comment__text '}>{comment.comment}</p>

                              </div>

                  </div>
                          <div className='timeago'>
                              <p className={'comment__text_timeago'}>{comment.timeago}</p>

                          </div>

                          

                  </div>
                  
                 
            
                
                  
                  </div>
                
              ))}
          </div>
              

        
        
  )
}
 /*  <div className="comment-view">
               {comments.map((comment, index) => ( 
                   <div key = { index }  className="comment">
                       <span className="author">{comment.owner_of_comment.name

}</span>
                       <span className="text">{comment.comment}</span>
                  </div>
               ))} 
          </div> 
    </div>
  */
export default CommentView