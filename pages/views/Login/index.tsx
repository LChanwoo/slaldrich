import useInput from '../../../hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from './styles';
import fetcher from '../../../utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
const LogIn = () => {
  const router = useRouter();
  const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          mutate();
          // console.log('res.data: ', res.data)
          sessionStorage.setItem('user', JSON.stringify(res.data));
          // console.log(sessionStorage.getItem('user'))
        })
        .catch((error) => {
          setLogInError(error.response?.data?.code === 401);
        });
    },
    [email, password, mutate],
  );

  console.log(error, userData);
  if (!error && userData) {
    console.log('로그인됨', userData);
    // return <Link href="/workspace/slald/channel/일반">go to workspace</Link>;
    // return router.push('/workspace/slald/channel/일반');
    return window.location.href = '/workspace/slald/channel/일반';
  }

  return (
    <div id="container">
      <Header>Slald</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        <>
              아직 회원이 아니신가요?&nbsp;
        <a href="/signup">회원가입 하러가기</a>
        </>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
