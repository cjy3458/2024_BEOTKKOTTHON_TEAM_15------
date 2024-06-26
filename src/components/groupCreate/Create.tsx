'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ProfileImg from '@/components/common/ProfileImg';
import Modal from '@/components/common/Modal';
import { createTeam } from '@/apis/group';

const Create = () => {
	const [description, setDescription] = useState<string>('');
	const [groupName, setGroupName] = useState<string>('');
	const [groupImage, setGroupImage] = useState<any>(null);
	const [modal, setModal] = useState(false);
	const router = useRouter();

	const onModal = () => {
		setModal(true);
	};

	function handleGroupImageUpload(groupImage: File, groupName: string, description: string) {
		const formData = new FormData();
		if (groupImage) {
			formData.append('imageFile', groupImage);
		} else {
			formData.append('imageFile', 'null');
		}

		// 객체를 JSON 문자열로 변환하여 추가
		const dto = JSON.stringify({ name: groupName, description: description });
		console.log(dto);
		const blob = new Blob([dto], { type: 'application/json' });
		formData.append('teamSaveRequestDto', blob);
		// formData.append('name', groupName);
		// formData.append('decription', description);
		// const body = {
		// 	name: groupName,
		// 	description: description,
		// };
		createTeam(formData);
		onModal();
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log(groupImage);
		if (!groupName) {
			alert('그룹 이름을 적어주세요!');
			return;
		} else if (groupName.length > 20) {
			alert('그룹 이름은 20자 제한입니다.😭');
			return;
		}
		if (!description) {
			alert('그룹 목적을 적어주세요!');
			return;
		} else if (description.length > 50) {
			alert('그룹 목적은 50자 제한입니다.😓');
		}
		handleGroupImageUpload(groupImage, groupName, description);
	};

	return (
		<Wrapper>
			{modal && (
				<Modal
					homeUrl="/home"
					pageUrl="/groups"
					text1="그룹이 생성되었습니다."
					text2="멤버들을 초대해보세요!"
					text3="그룹페이지로 이동"
					share={true}
				/>
			)}
			<Container>
				<Title>그룹 생성을 위한 기본적인 정보를 입력해주세요.</Title>
				<ProfileImg id={'imageInput'} text={'이미지 업로드'} setImage={setGroupImage} />
				<Information>
					<GroupName
						id="groupName"
						name="groupName"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						placeholder="그룹명을 입력해주세요. *(최대 20자)"
					/>
					<GroupPurpose
						id="description"
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="그룹 생성 목적을 입력해주세요. *(최대 50자)"
					/>
				</Information>
				<BtnWrapper>
					<JoinBtn onClick={handleSubmit}>생성하기</JoinBtn>
				</BtnWrapper>
			</Container>
		</Wrapper>
	);
};

export default Create;

const Wrapper = styled.div`
	height: 90vh;
	display: flex;
	flex-direction: column;
	/* background: #fff5e0; */
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
`;

const Title = styled.div`
	margin-top: 4rem;
	font-size: 2.4rem;
	color: black;
	font-weight: bold;
`;

const Information = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
`;

const GroupName = styled.input`
	width: 160%;
	border-radius: 1rem;
	background-color: #f4e6c8;
	padding: 1rem 7rem 1rem 2rem;
	border: none;
	outline: none;
	font-size: 1.5rem;
`;

const GroupPurpose = styled.input`
	width: 160%;
	border-radius: 1rem;
	background-color: #f4e6c8;
	padding: 1rem 7rem 1rem 2rem;
	border: none;
	outline: none;
	font-size: 1.5rem;
`;

const BtnWrapper = styled.div`
	width: 54rem;
	display: flex;
	justify-content: flex-end;
`;

const JoinBtn = styled.div`
	width: 60px;
	text-align: center;
	padding: 0.5rem 2rem;
	border: 1px solid #4f7b59;
	border-radius: 2.5rem;
	font-size: 1.5rem;
	color: #4f7b59;
	&:hover {
		color: white;
		background-color: #4f7b59;
	}
`;
