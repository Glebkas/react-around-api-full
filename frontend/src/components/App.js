import '../index.css';
import Header from './Header';
import Main from './Main';
import React from 'react';
import Login from './Login';
import Register from './Register';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import api from '../utils/api';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function App() {
    const [token, setToken] = React.useState(
        localStorage.getItem('token') ? localStorage.getItem('token') : ''
    );

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [isInfoTooltipOpen, setIsnfoTooltipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState('');
    const [registerMessage, setRegisterMessage] = React.useState('');

    const history = useHistory();

    function getCards() {
        api.getInitialCards()
            .then((res) => setCards([...res.data]))
            .catch(console.log);
    }

    function closeAllPopups() {
        setIsEditProfileOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsnfoTooltipOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfileOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((res) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? res.data : c))
                );
            })
            .catch(console.log);
    }

    function handleUpdateUser(user) {
        api.patchProfileInfo(user)
            .then((userData) => {
                setCurrentUser(userData.data);
                closeAllPopups();
            })
            .catch(console.log);
    }

    function handleUpdateAvatar({ avatar }) {
        api.changeProfileImg(avatar)
            .then((userData) => {
                setCurrentUser(userData.data);
                closeAllPopups();
            })
            .catch(console.log);
    }

    function handleAddPlaceSubmit(card) {
        return api
            .postCard(card)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            })
            .catch(console.log);
    }
    function handleRemoveClick(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch(console.log);
    }

    function onRegister({ email, password }) {
        auth.register(email, password)
            .then((res) => {
                if (res.data._id) {
                    setTooltipStatus('success');
                    setRegisterMessage(
                        'Success! You have now been registered.'
                    );
                    setIsnfoTooltipOpen(true);
                    const userData = {
                        email,
                        password,
                    };
                    onLogin(userData);
                } else {
                    setTooltipStatus('fail');
                    setIsnfoTooltipOpen('true');
                }
            })
            .catch((err) => {
                if (err === 400) {
                    console.log(
                        '400 - one of the fields was filled in incorrectly'
                    );
                } else if (err === 409) {
                    console.log('409 - email is already used');
                } else {
                    console.log(err);
                }

                setTooltipStatus('fail');
                setRegisterMessage(
                    'Oops, something went wrong! Please try again.'
                );
                setIsnfoTooltipOpen('true');
            });
    }

    function onLogin({ email, password }) {
        auth.login(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setToken(res.token);
                    setIsLoggedIn(true);
                    setEmail(email);
                    api.getInitialProfile().then((user) => {
                        setCurrentUser(user.data);
                        getCards();
                        history.push('/');
                    });
                } else {
                    throw new Error(`Login error`);
                }
            })
            .catch((err) => {
                if (err === 400) {
                    console.log(
                        '400 - one or more of the fields were not provided'
                    );
                } else if (err === 401) {
                    console.log(
                        '401 - wrong email or password'
                    );
                } else {
                    console.log(err);
                }
            });
    }

    function onSignOut() {
        localStorage.removeItem('token');
        setToken('');
        setIsLoggedIn(false);
        Redirect('/signin');
    }
    React.useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        };

        document.addEventListener('keydown', closeByEscape);

        return () => document.removeEventListener('keydown', closeByEscape);
    }, []);

    React.useEffect(() => {
        if (token.length > 0) {
            api.getInitialProfile()
                .then((res) => {
                    if (res.data) {
                        setCurrentUser(res.data);
                        getCards();
                        setIsLoggedIn(true);
                        history.push('/');
                    } else {
                        localStorage.removeItem('token');
                        setToken('');
                    }
                })
                .catch(console.log);
        }

        // eslint warns about missing dependencies that don't seem to be
        // neccessary for this hook to work.

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='App'>
                <div className='root'>
                    <Header
                        loggedIn={isLoggedIn}
                        email={email}
                        onSignOut={onSignOut}
                    />
                    <Switch>
                        <ProtectedRoute
                            exact
                            path='/'
                            component={Main}
                            onEditAvatarClick={handleEditAvatarClick}
                            onEditProfileClick={handleEditProfileClick}
                            onAddPlaceClick={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onRemoveClick={handleRemoveClick}
                            cards={cards}
                            loggedIn={isLoggedIn}
                        />
                        <Route path='/signin'>
                            <Login onLogin={onLogin}></Login>
                        </Route>
                        <Route path='/signup'>
                            <Register onRegister={onRegister}></Register>
                        </Route>
                    </Switch>

                    <EditProfilePopup
                        isOpen={isEditProfileOpen}
                        onClose={closeAllPopups}
                        onUserInfoUpdate={handleUpdateUser}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlaceSubmit={handleAddPlaceSubmit}
                    />

                    <ImagePopup
                        name='display-image'
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    ></ImagePopup>
                    <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        onClose={closeAllPopups}
                        status={tooltipStatus}
                        registerMessage={registerMessage}
                    ></InfoTooltip>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
