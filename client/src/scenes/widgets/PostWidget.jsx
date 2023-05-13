import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [Comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  // const loggedName = useSelector((state) => state.user.firstname);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [isSendClicked, setisSendClicked] = useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {

    fetchComments();


  }, [showComments, isSendClicked]);



  const fetchComments = async () => {
    try {
      console.log('fetching');
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comment`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

      const data = await response.json(comments);

      setComments(data);
      console.log(data);
      console.log(Comments);

    } catch (error) {
      console.error(error.message);
    }
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment, userId: loggedInUserId }) // Include the user ID in the comment object sent to the server
      });
      const data = await response.json();
      // console.log(newComment);

      setComments([...Comments, data]);
      setisSendClicked(!isSendClicked);
      // setcommentCount(commentCount+1);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => {
              setShowComments(!showComments)
              console.log('comment button clicked')
            }
            }>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{Comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {showComments && (
        <Box mt="0.5rem">
          <FlexBetween>
            <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}
              style={{
                width: '90%', outline: 'none', border: 'none', backgroundColor: 'transparent', color: 'white', fontSize: '15px', wordWrap: 'break-word',
                wordBreak: 'break-all'
              }}
            />
            <IconButton onClick={handleCommentSubmit}>
              <SendIcon />
            </IconButton>
          </FlexBetween>

          {Comments.map((comment) => (
            <Box key={crypto.randomUUID()}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                <Box display="flex" gap="1rem" padding="1rem">
                  <img src={`http://localhost:3001/assets/${comment.userpicture}`} alt="user profile picture" style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
                  <Box>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: "gray" }}>{comment.username}</div>
                    <div style={{ fontSize: '15px' }}>{comment.text}</div>
                  </Box>
                </Box>

              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
