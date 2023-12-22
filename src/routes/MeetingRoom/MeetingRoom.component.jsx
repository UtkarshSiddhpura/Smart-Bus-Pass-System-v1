import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { createNewRoom, getPeer } from "@/lib/peer";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function MeetingRoom() {
	const { meetingID } = useParams();
	const myVideoRef = useRef(null);
	const [showStream, setShowStream] = useState(false);
	const myStream = useRef(null);

	const videoRefs = useRef([]);
	const [videoElements, setVideoElements] = useState([
		// { key: 1, ele: "video1" },
		// { key: 2, ele: "video2" },
		// { key: 3, ele: "video3" },
	]);

	const getMedia = async () => {
		if (myStream.current && myVideoRef.current.srcObject) return;
		const videoStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false, //TODO
		});
		setShowStream(true);
		myStream.current = videoStream;
		myVideoRef.current.srcObject = videoStream;
	};
	useEffect(() => {
		if (meetingID === "new") createRoom();
		else joinRoom();
	}, []);

	const addNewVideoStream = (userVideoStream) => {
		const newVideoEle = (
			<video
				autoPlay
				ref={(el) => {
					el.srcObject = userVideoStream;
					videoRefs.current.push(el);
				}}
			/>
		);
		setVideoElements((prevElement) => {
			return [...prevElement, { key: new Date().getTime(), ele: newVideoEle }];
		});
	};

	const peers = useRef([]);
	//TODO remove room name
	const createRoom = async (e) => {
		await getMedia();
		const myPeer = await createNewRoom("New Room name");
		// Answer user call
		myPeer.on("call", (call) => {
			call.on("stream", addNewVideoStream, (e) => {
				console.log(e);
			});
			call.answer(myStream.current);
		});

		myPeer.on("connection", function (conn) {
			conn.on("open", function () {
				conn.on("data", function (data) {
					console.log("Received at Host", data);
				});
				peers.current.forEach((peer) => {
					conn.send(peer);
				});
				peers.current.push(conn.peer);
			});
		});
	};

	const callPeer = (peerID, myPeer) => {
		const call = myPeer.call(peerID, myStream.current);
		call.on("stream", addNewVideoStream, (e) => {
			console.log(e);
		});
		call.on("open", () => {
			console.log("conn opened");
		});
		call.on("close", () => {
			console.log("conn close");
		});
	};

	const joinRoom = async (e) => {
		console.log("joining:", meetingID);
		await getMedia();
		const { myPeer } = await getPeer();

		const peerID = meetingID;
		const conn = myPeer.connect(peerID);
		myPeer.on("call", (call) => {
			call.on("stream", addNewVideoStream, (e) => {
				console.log(e);
			});
			call.answer(myStream.current);
		});
		conn.on("open", function () {
			conn.on("data", function (data) {
				console.log("Received", data);
				callPeer(data, myPeer);
			});
		});
		callPeer(meetingID, myPeer);
	};

	return (
		<ImageList cols={3}>
			<ImageListItem>
				<video autoPlay muted ref={myVideoRef} style={{ display: showStream ? "" : "none" }} />
			</ImageListItem>
			{videoElements.map((video, i) => (
				<ImageListItem key={video.key}>{video.ele}</ImageListItem>
			))}
		</ImageList>
	);
}
