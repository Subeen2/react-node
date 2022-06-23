import React, { Fragment, useState } from 'react';
import { Input, Row, Col } from 'antd';
import MovieCard from '../Component/MovieCard';
// import jsonData from './item.json';
import axios from 'axios';
// import styled from 'styled-components';
const { Search } = Input;

// const Text = styled.p`
//   color: red;
//   font-size: ${(props) => props.fontSize};
// `;

// const Memo = styled.div`
//     width:100px;
//     height:100px;
// `

// const ShadowText = styled(Text)`
//       font-weight: bold;
//       ${Memo} {
//         background-color:black;
//         color: white;
//       }
//   `
// eslint-disable-next-line no-lone-blocks
{/* <Text fontSize="22px">안녕</Text>
    <Text fontSize="24px">하세요</Text>
    <ShadowText fontSize="30px">
      <Text fontSize="24px">하세요</Text>
      <Memo fontSize="10px">hi</Memo>
    </ShadowText> */}
const MovieSearchContainer  = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState();

  const handleQuery = (e) => {
    setQuery(e.target.value);
  }

  const handleButton = async () => {
    try {
      //응답 비동기로 받아온다.
      const res = await axios.get('http://localhost:3000/naver/getNaverMovie', {
        params: {
          query: query
        }
      });
      //응답이 정상이면
      if(res && res.statue === 200) {
        const {data} = res;
        console.log(data);
        setItems(data.items);
      }
    }catch (e) {
      console.log('error', e);
    }
  }

  return (
    <Fragment>
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <Search
          placeholder="영화를 검색해 보세요!"
          onSearch={(value) => console.log(value)}
          onChange={handleQuery}
          onClick={handleButton}
          style={{ width: 200 }}
        />
      </div>
      <div>
        <Row>
        {items && items.map((item) => {
            return (
              <Col xs={24} sm={12} md={6} lg={4} xl={4}>
                <MovieCard item={item}></MovieCard>;
              </Col>
            );
          })}
        </Row>
      </div>
    </Fragment>
  );
};

// eslint-disable-next-line no-undef
export default MovieSearchContainer;