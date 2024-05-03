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
      if (response.request.status == 200) {
        
        sessionStorage.setItem("user_jwt", response.data)
        getCurrentUser();
        console.log("after" + localStorage.getItem("user"))
        if (localStorage.getItem("user")) {
          window.location.reload()
        }
        
        console.log("login ok " + response.data)
        
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
        //sessionStorage.setItem("user_jwt", response.data)
        //window.location.reload()
      }
    }
    )
    .catch((error) => {
      console.log(error);
    });
    return

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
        console.log("tutajd")
        sessionStorage.setItem('user', JSON.stringify(res.data))
        console.log(sessionStorage.getItem("user"))
        return res
      }).catch(err => {
        console.log(err)
      })
    
  }

};

const logout = () => {
  sessionStorage.removeItem("user_jwt");
  sessionStorage.removeItem("user");
  window.location.reload();
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser
};

export default AuthService