// import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { ContextHolder } from "@frontegg/rest-api";
import { AdminPortal, useAuth, useLoginWithRedirect } from "@frontegg/react";
function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect(); //use login with redirect will redirect you to login page
  //Uncomment this to redirect to login automatically
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);
  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };
  // admin user - to show the view full profile
  const handleClick = () => {
    AdminPortal.show();
  };

  const checkUser = (email,name) => {
    var requestOptions = {
      method: "GET",
      // redirect: "follow",
    };
    fetch("http://localhost:8080/customer?cemail=" + email, requestOptions)
      .then((response) => response.json())
      .then((result) => (result[0].isExisting)? showItems(email) : addCust(email,name))
      .catch((error) => console.log("error", error));
  };

  const addCust = (email, name) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    // Populate this data from e.g. form.
    var raw = JSON.stringify({
      cemail: email,
      cname: name,
    });
  
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
  
    fetch("http://localhost:8080/customer/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

  };

  const showItems = (email) => {
    var requestOptions = {
      method: "GET",
      // redirect: "follow",
    };    
    fetch("http://localhost:8080/order/cust?cemail=" + email, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      var tbl = "<table className='table'><thead><th>Cust Name</th><th>Item Name</th><th>Quantity</th><th>Shipping Date</th></thead>";
      tbl += "<tbody>";
      data.forEach(function (order) {
        tbl += `<tr>
        <td>${order.custName}</td>
        <td>${order.itemName}</td>
        <td>${order.quantity}</td>
        <td>${order.shipping_date}</td>
        </tr>`;
      });
      tbl += "</tbody></table><br>";
      document.getElementById("mypanel").innerHTML = tbl;
    })
    .catch((error) => console.log("error", error));

  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="card">
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div className="detail">
            <span className="heading">Name: {user?.name}</span>
            <span className="heading">Email: {user?.email}</span>
          </div>
          
          <h3>Shopping Orders</h3>
          {checkUser(user?.email, user?.name)} 
          <div id="mypanel">       
          </div>

          <div>
            <button onClick={() => logout()} className="button">
              Click to logout
            </button>

            <button onClick={() => handleClick()} className="button">
              View full Profile
            </button>
          </div>
        </div>
      ) : (
        // this portion will not be seen, will only be displayed fraction of second, then redirect to login page
        <div> 
          <button onClick={() => loginWithRedirect()} className="button">
            Click me to login
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
