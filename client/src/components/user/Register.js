import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

// import Loader from "../layouts/Loader";
import MetaData from "../layouts/metadata";

import { register, clearErrors } from "../../actions/userAction";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(null); // Updated to null to handle file selection
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/defaultImage.png"
  );

  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      alert.success("Registered successfully");
      navigate("/");
    }

    if (error) {
      alert.error(`${error} \n Check your credentials`);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, alert, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    if (avatar) {
      formData.append("avatar", avatar); // Append the file directly if it exists
    }

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result); // Set the preview for UI
            setAvatar(reader.result); // Set the file directly
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <MetaData title={`Register new user`} />
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form
              className="shadow-lg"
              encType="multipart/form-data"
              onSubmit={submitHandler}
            >
              <h1 className="mb-3">Register</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="avatar preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";
// import MetaData from "../layouts/metadata";
// import { register, clearErrors } from "../../actions/userAction";

// const Register = ({ history }) => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const { name, email, password } = user;
//   const [avatar, setAvatar] = useState({ public_id: "", url: "" });
//   const [avatarPreview, setAvatarPreview] = useState(
//     "/images/defaultImage.png"
//   );

//   const alert = useAlert();
//   const dispatch = useDispatch();

//   const { isAuthenticated, error, loading } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isAuthenticated) {
//       alert.success("Logged in successfully");
//       navigate("/");
//     }

//     if (error) {
//       alert.error(`${error} Wrong email or Password`);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, isAuthenticated, alert, history, error, loading]);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const userData = {
//       name,
//       email,
//       password,
//       avatar, // Ensure avatar is part of the userData
//     };

//     dispatch(register(userData));
//   };

//   const onChange = (e) => {
//     if (e.target.name === "avatar") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setAvatarPreview(reader.result);
//           setAvatar({ public_id: "", url: reader.result }); // Update avatar object correctly
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     } else {
//       setUser({ ...user, [e.target.name]: e.target.value });
//     }
//   };

//   return (
//     <>
//       <MetaData title={`Register new user`} />
//       <div className="container container-fluid">
//         <div className="row wrapper">
//           <div className="col-10 col-lg-5">
//             <form
//               className="shadow-lg"
//               encType="multipart/form-data"
//               onSubmit={submitHandler}
//             >
//               <h1 className="mb-3">Register</h1>

//               <div className="form-group">
//                 <label htmlFor="email_field">Name</label>
//                 <input
//                   type="name"
//                   id="name_field"
//                   className="form-control"
//                   name="name"
//                   value={name}
//                   onChange={onChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email_field">Email</label>
//                 <input
//                   type="email"
//                   id="email_field"
//                   className="form-control"
//                   name="email"
//                   value={email}
//                   onChange={onChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password_field">Password</label>
//                 <input
//                   type="password"
//                   id="password_field"
//                   className="form-control"
//                   name="password"
//                   value={password}
//                   onChange={onChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="avatar_upload">Avatar</label>
//                 <div className="d-flex align-items-center">
//                   <div>
//                     <figure className="avatar mr-3 item-rtl">
//                       <img
//                         src={avatarPreview}
//                         className="rounded-circle"
//                         alt="avatar preview"
//                       />
//                     </figure>
//                   </div>
//                   <div className="custom-file">
//                     <input
//                       type="file"
//                       name="avatar"
//                       className="custom-file-input"
//                       id="customFile"
//                       accept="image/*"
//                       onChange={onChange}
//                     />
//                     <label className="custom-file-label" htmlFor="customFile">
//                       Choose Avatar
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 id="register_button"
//                 type="submit"
//                 className="btn btn-block py-3"
//                 disabled={loading ? true : false}
//               >
//                 REGISTER
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
