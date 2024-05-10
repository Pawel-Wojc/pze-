import axios from "axios"
import { jwtDecode } from 'jwt-decode'


 const login = (user) => {
  let data = JSON.stringify(user);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: localStorage.getItem("api_path") + 'login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios.request(config)
    .then((response) => {
      if (response.request.status === 200) {
        sessionStorage.setItem("user_jwt", response.data)
      }
    }
    )
    .catch((error) => {
      console.log(error);
    });
}

 const register = (user) => {
  let data = JSON.stringify(user);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: localStorage.getItem("api_path") + 'register',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios.request(config)
    .then((response) => {
      if (response.request.status === 200) {
      }
    }
    )
    .catch((error) => {
      console.log(error);
    });

}

 function getCurrentUser() { //get information about current loged user
  let jwt = sessionStorage.getItem("user_jwt")
  if (jwt) {
    let config = {
      headers: {
        Authorization: "Bearer " + jwt
      }
    }
    const user = jwtDecode(jwt);
    return axios.get(localStorage.getItem("api_path") + 'get/user/' + user.id, config)
      .then(res => {
        return res.data
      }).catch(error => {
        console.log(error)
      })

  }else {return ("user not found")}

};


const AuthService = {
  login,
  register,
  getCurrentUser
};

export default AuthService