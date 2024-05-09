import axios from "axios"
import { jwtDecode } from 'jwt-decode'
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
      if (response.request.status == 200) {  
        sessionStorage.setItem("user_jwt", response.data)
        getCurrentUser()
        window.location.reload()
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
      if (response.request.status == 200) {
        console.log("user registered ok!");
        
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
  axios.get(localStorage.getItem("api_path") + 'get/user/' + user.id, config)
      .then(res => {
        sessionStorage.setItem('user', JSON.stringify(res.data))
        return res
      }).catch(err => {
        console.log(err)
      })
    
  }

};

const logout = () => {
  sessionStorage.removeItem("user_jwt");
  sessionStorage.removeItem("user");
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser
};

export default AuthService