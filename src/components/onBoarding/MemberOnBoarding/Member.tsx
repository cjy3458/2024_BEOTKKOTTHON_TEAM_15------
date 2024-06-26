'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import GroupCard from './GroupCard';
import { LuSearch } from 'react-icons/lu';
import Modal from '@/components/common/Modal';
import { searchGroup } from '@/apis/search';
import { useRecoilValue } from 'recoil';
import { userNameAtom } from '@/app/recoilContextProvider';

interface DataType {
	name: string;
	description: string;
	id: string;
	imageUrl: string;
}

const Member = () => {
	const [modal, setModal] = useState(false);
	const [text, setText] = useState<string>('');
	const [data, setData] = useState<DataType[]>([]);
	const userName = useRecoilValue(userNameAtom);

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const onModal = () => {
		setModal(true);
	};

	// 엔터키 눌렀을때
	const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const result = await searchGroup(text);
			// axios 응답에서 실제 데이터를 추출합니다.
			const data = result;
			console.log(data);
			// 'data'가 배열인지 확인합니다. 배열이 아니라면, 빈 배열을 대신 전달합니다.
			if (Array.isArray(data)) {
				setData(data);
			} else {
				console.error('받은 데이터가 배열 형식이 아닙니다.');
				setData([]);
			}
		}
	};
	// 검색 아이콘 눌렀을때
	const handleClick = () => {
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
		// 검색함수 호출
	};

	return (
		<Wrapper>
			{modal && (
				<Modal
					homeUrl="/home"
					pageUrl="/mypage"
					text1="참여 요청을 전송했습니다!"
					text2="리더가 수락하면 알림을 보내드릴게요"
					text3="마이페이지로 이동"
				/>
			)}
			<Container>
				<TextWrapper>
					<Text>{userName} 멤버님 환영합니다</Text>
					<Ask>{userName}님이 속한 그룹은 어디인가요?</Ask>
				</TextWrapper>
				<SearchBox>
					<LuSearch size="2rem" color="#93613B" style={{ strokeWidth: 3 }} onClick={handleClick} />
					<SearchInput className="searchInputBox" onChange={handleTextChange} onKeyDown={handleKeyDown} />
				</SearchBox>
				{data.map((result, idx) => (
					<GroupCard
						key={idx}
						onModal={onModal}
						title={result.name}
						des={result.description}
						id={result.id}
						imageUrl={result.imageUrl}
					/>
				))}
			</Container>
			<Character alt={'ch'} src={'/img/PaperMan.png'} />
		</Wrapper>
	);
};

export default Member;

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: linear-gradient(to bottom, #93613b 50%, #fff5e0 50%);
`;

const Container = styled.div`
	width: 37rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 6rem;
	margin-top: 7%;
	margin-left: 15%;
	@media (max-width: 1200px) {
		margin-top: 13%;
		margin-left: 10%;
	}
`;

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	color: white;
`;

const Text = styled.div`
	font-size: 2rem;
`;

const Ask = styled.div`
	font-size: 3rem;
`;

const Character = styled.img`
	width: 30%;
	min-width: 300px;
	position: absolute;
	top: 13rem;
	right: 25rem;
	@media (max-width: 1200px) {
		top: 20rem;
		right: 2rem;
	}
`;
const SearchBox = styled.div`
	height: 4rem;
	width: 100%;
	background-color: #fff5e0;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 1rem;
	margin-bottom: 2rem;
`;

const SearchInput = styled.input`
	width: 100%;
	height: 100%;
	font-size: 2rem;
	border: none;
	outline: none;
	padding-left: 1rem;
	background-color: transparent;
`;
