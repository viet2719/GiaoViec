'use client';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './Detail.module.css';
import { Button, Input, Space } from 'antd';
import { POST, getCurrentID, getType } from '@/pages/api/auth';
import dayjs from 'dayjs';

const CMT: React.FC<any> = ({
  dataAll,
  data,
  setReload,
  idMeeting,
}: {
  dataAll: any;
  data: any[];
  setReload: Function;
  idMeeting: Number;
}) => {
  const admin = getType() === '1';
  const userOwn = getCurrentID();
  const chatContainerRef = useRef<any>(null);
  const lastChildRef = useRef<any>(null);
  const [comments, setComments] = useState<any[]>();
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [deleted, setDeleted] = useState<boolean>(false);
  useEffect(() => {
    setComments(data);
  }, [data]);
  useLayoutEffect(() => {
    if (chatContainerRef.current && !deleted) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);
  const handleComment = () => {
    if (newCommentContent.trim() !== '') {
      const newComment = {
        content: newCommentContent,
      };
      POST(
        `meetings/chi-tiet-cuoc-hop/${idMeeting}/add-comment`,
        newComment
      ).then((res) => {
        if (res) {
          setNewCommentContent('');
          setReload(true);
          setDeleted(false);
        }
      });
    }
  };
  const handleDeleteComment = (id: string) => {
    POST(`meetings/chi-tiet-cuoc-hop/${idMeeting}/delete-comment/${id}`).then(
      (res) => {
        if (res) {
          setReload(true);
          setDeleted(true);
        }
      }
    );
  };
  const deleteCMT = (comment: any) => {
    if (admin || dataAll?.staff_owner?.includes(userOwn.toString())) {
      return (
        <p
          onClick={() => handleDeleteComment(comment?.id)}
          style={{ cursor: 'pointer', color: 'red' }}
        >
          Xóa
        </p>
      );
    }
  };
  return (
    <div className={styles.meet_ifmt_tv}>
      <div className={styles.title_detl_meet}>
        <h4>THẢO LUẬN</h4>
      </div>
      <div className={styles.detl_infm_meet}>
        <div className={styles.scr_cmt} ref={chatContainerRef}>
          {comments?.map((comment, index) => (
            <div
              key={index}
              className={styles.comment}
              style={{
                display: 'flex',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'max-content',
                }}
              >
                <p
                  style={{
                    color: '#4c5bd4',
                    fontWeight: '600',
                    fontSize: '16px',
                    width: 'max-content',
                  }}
                >
                  {comment?.staff_name}
                </p>
                <p style={{ width: 'max-content' }}>
                  {dayjs
                    .unix(comment?.created_at)
                    .format('HH:mm:ss DD/MM/YYYY')}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100% ',
                  marginTop: '10px',
                }}
              >
                <p
                  style={{ marginLeft: '50px' }}
                  ref={index === comments.length - 1 ? lastChildRef : null}
                  tabIndex={0}
                >
                  {comment?.content}
                </p>
                {deleteCMT(comment)}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cmt}>
          <Space.Compact style={{ width: '100%' }} className={styles.ip_cmt}>
            <Input
              placeholder="Hãy viết thảo luận của bạn ở đây"
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              onPressEnter={handleComment}
            />
            <Button type="primary" onClick={handleComment}>
              Bình luận
            </Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  );
};

export default CMT;
