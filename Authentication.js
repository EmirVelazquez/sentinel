// https://blog.theodo.com/2017/03/how-to-create-an-authentication-system-and-a-persistent-user-session-with-react-native/

import { AsyncStorage, (...)} from 'react-native'

// Receives token from API in async storage
class Authentication extends Component {
  (...)

  async saveItem(item, selectedValue) {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

(...)
}

export default Authentication;

userSignup() {
    if (!this.state.username || !this.state.password) return;
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    fetch('/users', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            this.saveItem('id_token', responseData.id_token),
                Alert.alert('Signup Success!', 'Click the button to get a Chuck Norris quote!'),
                Actions.HomePage();
        })
        .done();
}

userLogin() {
    if (!this.state.username || !this.state.password) return;
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
    fetch('/sessions/create', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            this.saveItem('id_token', responseData.id_token),
                Alert.alert('Login Success!', 'Click the button to get a Chuck Norris quote!'),
                Actions.HomePage();
        })
        .done();
}