import React, { Component, Fragment } from "react";
import axios from "axios";
import Modal from "react-modal";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.handlePreviousData = this.handlePreviousData.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFormData = this.handleFormData.bind(this);
    this.state = {
      _id: "",
      // ─────────────────────────────────────────────────────────────────
      firstName: "",
      lastName: "",
      email: "",
      address2: "",
      country: "",
      zip: 0,
      // ─────────────────────────────────────────────────────────────────
      description: "about me...",
      age: 0,
      address: "",
      image: null
    };
  }

  componentDidMount() {
    this.handleIdChange();
    this.handlePreviousData();
  }

  handleIdChange() {
    const _id = JSON.parse(localStorage.getItem("_id"));
    if (!_id) {
      alert("System Bypassed!");
      window.location.assign("/");
    } else {
      this.setState(() => ({ _id }));
    }
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handlePreviousData() {
    const _id = JSON.parse(localStorage.getItem("_id"));
    axios.get("http://localhost:2020/profile/" + _id).then(res => {
      this.setState({
        description: res.data.description,
        age: res.data.age,
        address: res.data.address
      });
    });
  }

  handleFormData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("email", this.state.email);
    formData.append("address2", this.state.address2);
    formData.append("country", this.state.country);
    formData.append("zip", this.state.zip);
    // ─────────────────────────────────────────────────────────────────
    formData.append("description", this.state.description);
    formData.append("age", this.state.age);
    formData.append("address", this.state.address);
    formData.append("image", this.state.image);
    const config = { headers: { "content-type": "multipart/form-data" } };
    axios
      .put("http://localhost:2020/profile/" + this.state._id, formData, config)
      .then(res => {
        let address = JSON.stringify(this.state.address);
        localStorage.setItem("Address", address);
        let image = JSON.stringify(this.state.image);
        localStorage.setItem("Image", image);
        window.location.assign("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const style = {
      marginTop: "100px"
    };
    return (
      <Modal isOpen={this.props.modalOpen} contentLabel="Edit Profile">
        <Fragment>
          <form onSubmit={this.handleFormData} className="form-horizontal">
            <div style={style} className="container">
              <h1 className="kryptonite-text">Edit Profile</h1>
              <hr />
              <div className="row">
                {/* left column */}
                <div className="col-md-3">
                  <div className="text-center">
                    <img
                      onChange={this.onFileChange}
                      value={this.state.image}
                      src="//placehold.it/100"
                      className="avatar img-circle"
                      alt="avatar"
                      name="image"
                      required
                    />
                    <h6 className="kryptonite-text">
                      Upload a different photo...
                    </h6>
                    <input type="file" className="form-control" />
                  </div>
                </div>
                {/* edit form column */}
                <div className="col-md-9 personal-info">
                  <h3 className="kryptonite-text">Personal info</h3>

                  <div className="form-group">
                    <label className="col-lg-3 control-label">
                      First name:
                    </label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        name="firstName"
                        onChange={this.onChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Last name:</label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        name="lastName"
                        onChange={this.onChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Email:</label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        name="email"
                        onChange={this.onChange}
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Address:</label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        name="address"
                        onChange={this.onChange}
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">
                      Current Location:
                    </label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        name="address2"
                        onChange={this.onChange}
                        type="text"
                        placeholder="Apartement"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Country:</label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        name="country"
                        onChange={this.onChange}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Zip:</label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        name="zip"
                        onChange={this.onChange}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Bio:</label>
                    <div className="col-lg-8">
                      <textarea
                        className="form-control"
                        name="description"
                        onChange={this.onChange}
                        value={this.state.description}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Age:</label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        name="age"
                        onChange={this.onChange}
                        value={this.state.age}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-3 control-label" />
                    <div className="col-md-8">
                      <input
                        type="button"
                        className="kryptonite-button btn btn-primary"
                        defaultValue="Save Changes"
                      />
                      <span />
                      <input
                        type="reset"
                        className="btn btn-default"
                        defaultValue="Cancel"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <hr />
          <button onClick={() => console.log(this.state)}>get</button>
        </Fragment>
      </Modal>
    );
  }
}
