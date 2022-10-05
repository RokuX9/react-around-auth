import React from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import "../blocks/App.css";
import api from "../utils/api";
import auth from "../utils/auth";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoTooltip";

function App() {
	const [cards, setCards] = React.useState([]);
	const [selectedCard, setSelectedCard] = React.useState({
		name: "",
		link: "",
	});
	const deleteLocationInitial = {
		id: "",
	};
	const [deleteLocationData, setDeleteLocationData] = React.useState(
		deleteLocationInitial
	);
	const addLocationInitial = {
		name: "",
		link: "",
	};
	const [addLocationData, setAddLocationData] =
		React.useState(addLocationInitial);

	const dashInfoInitial = {
		name: "",
		about: "",
	};
	const [dashInfoData, setDashInfoData] = React.useState(dashInfoInitial);
	const dashImageInitial = { avatar: "" };
	const [dashImageData, setDashImageData] = React.useState(dashImageInitial);
	const loginInitialData = {
		email: "",
		password: "",
	};
	const [loginData, setLoginData] = React.useState(loginInitialData);
	const [registerData, setRegisterData] = React.useState(loginInitialData);
	const [currentUser, setCurrentUser] = React.useState({
		name: "",
		about: "",
		avatar: "",
		id: "",
	});
	const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false);
	const [isEditProfileImagePopupOpen, setIsEditProfileImagePopupOpen] =
		React.useState(false);
	const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
	const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
		React.useState(false);
	const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [toolTipState, setToolTipState] = React.useState({
		success: false,
		message: "",
	});
	const [userEmail, setUserEmail] = React.useState("");
	const closeAllOverlays = () => {
		setIsImagePopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsEditProfileImagePopupOpen(false);
		setIsAddCardPopupOpen(false);
		setIsDeleteCardPopupOpen(false);
		setIsToolTipOpen(false);
	};
	const openAndUpdateToolTipOverlay = (newState) => {
		setToolTipState(newState);
		setIsToolTipOpen(true);
	};
	const openImageOverlay = () => {
		setIsImagePopupOpen(true);
	};
	const openDashInfoOverlay = () => {
		setDashInfoData({
			...dashInfoData,
			name: currentUser.name,
			about: currentUser.about,
		});
		setIsEditProfilePopupOpen(true);
	};
	const openDashImageOverlay = () => {
		setIsEditProfileImagePopupOpen(true);
	};
	const openDeleteLocationOverlay = () => {
		setIsDeleteCardPopupOpen(true);
	};
	const openAddLocationOverlay = () => {
		setIsAddCardPopupOpen(true);
	};
	const submitDashInfo = (e) => {
		e.preventDefault();
		api
			.setUserInfo(dashInfoData)
			.then((res) => {
				setCurrentUser(res);
				closeAllOverlays();
			})
			.catch(api.logError);
	};
	const submitDashImage = (e) => {
		e.preventDefault();
		api
			.changeProfilePicture(dashImageData)
			.then((res) => setCurrentUser(res))
			.then(closeAllOverlays)
			.catch(api.logError);
	};
	const submitDeleteLocation = (e) => {
		e.preventDefault();
		console.log(deleteLocationData);
		api
			.deleteCard(deleteLocationData)
			.then(() =>
				setCards(
					cards.filter((location) => location._id !== deleteLocationData.id)
				)
			)
			.then(closeAllOverlays)
			.catch(api.logError);
	};
	const submitAddLocation = (e) => {
		e.preventDefault();
		api
			.addNewCard(addLocationData)
			.then((res) => setCards([res, ...cards]))
			.then(closeAllOverlays)
			.catch(api.logError);
	};
	const updateLocationState = (newState) => {
		setCards(
			cards.map((card) => (card._id === newState._id ? newState : card))
		);
	};
	const likeCard = (id) => {
		api
			.likeCard(id)
			.then((res) => updateLocationState(res))
			.catch((err) => console.log(err));
	};
	const unlikeCard = (id) => {
		api
			.unlikeCard(id)
			.then((res) => updateLocationState(res))
			.catch((err) => console.log(err));
	};

	const handleLikePress = (isLiked, id) => {
		if (!isLiked) {
			likeCard(id);
		} else {
			unlikeCard(id);
		}
	};
	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		auth
			.register(registerData)
			.then((res) => {
				if (res) {
					setToolTipState({
						success: true,
						message: "Success! You have now been registered.",
					});
					setIsToolTipOpen(true);
				}
			})
			.catch(() => {
				setToolTipState({
					success: false,
					message: "Oops, something went wrong! Please try again.",
				});
				setIsToolTipOpen(true);
			});
	};
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		auth
			.login(loginData)
			.then((res) => {
				localStorage.setItem("jwt", res.token);
				setLoggedIn(true);
				history.push("/");
			})
			.catch(() => {
				setToolTipState({
					success: false,
					message: "Oops, something went wrong! Please try again.",
				});
				setIsToolTipOpen(true);
			});
	};
	const checkTokenValidity = () => {
		auth
			.checkTokenValidity(localStorage.getItem("jwt"))
			.then((res) => {
				console.log(res);
				setLoggedIn(true);
				setUserEmail(res.data.email);
				history.push("/");
			})
			.catch(() => {
				history.push("/signin");
				localStorage.removeItem("jwt");
			});
	};

	React.useEffect(() => {
		Promise.all([api.getInitialCards(), api.getUserInfo()])
			.then(([locations, info]) => {
				setCurrentUser({
					...currentUser,
					name: info.name,
					about: info.about,
					avatar: info.avatar,
					id: info._id,
				});
				setCards(locations);
			})
			.catch(api.logError);
	}, []);

	React.useEffect(() => {
		if (
			!isAddCardPopupOpen &&
			!isDeleteCardPopupOpen &&
			!isEditProfileImagePopupOpen &&
			!isEditProfilePopupOpen &&
			!isImagePopupOpen
		)
			return;
		const closeByKey = (e) => {
			if (e.key === "Escape") closeAllOverlays();
		};

		window.addEventListener("keydown", closeByKey);
		return () => {
			window.removeEventListener("keydown", closeByKey);
		};
	}, [
		isAddCardPopupOpen,
		isDeleteCardPopupOpen,
		isEditProfileImagePopupOpen,
		isEditProfilePopupOpen,
		isImagePopupOpen,
	]);

	const handleOverlayClick = (e) => {
		if (e.target.classList.contains("overlay")) closeAllOverlays();
	};

	const history = useHistory();

	return (
		<div className="App">
			<CurrentUserContext.Provider value={currentUser}>
				<Header
					loggedIn={loggedIn}
					userEmail={userEmail}
					history={history}
				/>
				<Switch>
					<ProtectedRoute
						exact
						path="/"
						loggedIn={loggedIn}
						checkTokenValidity={checkTokenValidity}
					>
						<div className="page">
							<Main
								setDashInfoData={setDashInfoData}
								openAddLocationOverlay={openAddLocationOverlay}
								openDashImageOverlay={openDashImageOverlay}
								openDashInfoOverlay={openDashInfoOverlay}
								handleLikePress={handleLikePress}
								openDeleteLocationOverlay={openDeleteLocationOverlay}
								setDeleteLocationData={setDeleteLocationData}
								setImageOverlayData={setSelectedCard}
								openImageOverlay={openImageOverlay}
								locationsData={cards}
							></Main>
							<Footer />
						</div>
					</ProtectedRoute>
					<Route
						exact
						path="/signup"
					>
						<Register
							formState={registerData}
							initialState={loginInitialData}
							setFormState={setRegisterData}
							submit={handleRegisterSubmit}
						/>
					</Route>
					<Route
						exact
						path="/signin"
					>
						<Login
							formState={loginData}
							initialState={loginInitialData}
							setFormState={setLoginData}
							submit={handleLoginSubmit}
						/>
					</Route>
				</Switch>
				<ImagePopup
					isOpen={isImagePopupOpen}
					closeAllOverlays={closeAllOverlays}
					locationData={selectedCard}
					onClick={handleOverlayClick}
				/>
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					closeAllOverlays={closeAllOverlays}
					formState={dashInfoData}
					initialState={dashInfoInitial}
					setFormState={setDashInfoData}
					submit={submitDashInfo}
					onClick={handleOverlayClick}
				/>
				<EditAvatarPopup
					isOpen={isEditProfileImagePopupOpen}
					formState={dashImageData}
					initialState={dashImageInitial}
					setFormState={setDashImageData}
					submit={submitDashImage}
					closeAllOverlays={closeAllOverlays}
				/>
				<AddPlacePopup
					isOpen={isAddCardPopupOpen}
					formState={addLocationData}
					initialState={addLocationInitial}
					setFormState={setAddLocationData}
					submit={submitAddLocation}
					closeAllOverlays={closeAllOverlays}
					onClick={handleOverlayClick}
				/>
				<DeletePlacePopup
					isOpen={isDeleteCardPopupOpen}
					formState={deleteLocationData}
					initialState={deleteLocationInitial}
					setFormState={setDeleteLocationData}
					submit={submitDeleteLocation}
					closeAllOverlays={closeAllOverlays}
					onClick={handleOverlayClick}
				/>
				<InfoToolTip
					isOpen={isToolTipOpen}
					success={toolTipState.success}
					message={toolTipState.message}
					closeAllOverlays={closeAllOverlays}
				/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
