import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./file_upload.css";
import { Box, Button, Input, TextField } from "@material-ui/core";
import Header from "../templetes/_common/header";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      description: "",
      previewUrl: "",
    };
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      selectedFile: file,
      previewUrl: URL.createObjectURL(file),
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleRemove = () => {
    this.setState({
      selectedFile: null,
      description: "",
      previewUrl: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Perform your file upload logic and send the description to the server
    console.log("Selected File:", this.state.selectedFile);
    console.log("Description:", this.state.description);
  };

  render() {
    const { previewUrl } = this.state;
    const { selectedFile } = this.state;
    return (
      // <div className='file-upload-container'>
      //   <form onSubmit={this.handleSubmit}>
      //     <input type="file" onChange={this.handleFileChange} />
      //     <br />
      //     <textarea
      //       value={this.state.description}
      //       onChange={this.handleDescriptionChange}
      //       placeholder="Enter image description"
      //     />
      //     <br />
      //     {previewUrl && <img src={previewUrl} alt="Preview" />}
      //     <br />
      //     <button type="submit">Upload</button>
      //   </form>
      // </div>
      <div>
      <Header openFeedback={this.toggleFeedbackState} />
      <section>
        <div className="dashboard-txt-wrapper">
          <div className="conatiner-fluid own-container-sm">
            <div className="row">
              <div className="col-12 text-center">
                <h3 className="main-heading pt-1">Hi, Admin</h3>
                {/* <div className="normal-txt pb-3 color-blue-two">{this.props.userDesignation}</div> */}
                <div className="own-txt own-close-txt color-blue-three">
                  You can create job, please fulfill the below details.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* upload */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="dashboard-tab-wrapper">
                <div className="tab-wrapper">
                  <ul className="own-tab list-unstyled font-poppins">
                    <li>
                      <span className={`tab-text cursor active`}>
                        Upload Documents
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Container */}

        <div className="">
          <div className="container">
            <div className="row px-3">
              <div className="col-12 below-box-wrapper pt-2">
                <h3 className="table-heading pt-2 pb-3 color-black text-center justify-content-center">
                  Add Documents
                </h3>
                {/* Form */}

                <form
                  className="form-own d-flex flex-wrap px-2 text-center justify-content-center"
                  noValidate
                  autoComplete="off"
                  onSubmit={(ev) => this.userSignup(ev)}
                >
                  <div className="form-group-icon position-relative form-group col-md-6 px-2 pb-1">
                    <TextField
                      type="text"
                      id="outlined-textarea-own"
                      label="File Name"
                      placeholder="File Name"
                      className="mt-0 mb-0 d-flex"
                      margin="normal"
                      variant="outlined"
                      name="userId"
                      // onChange={(ev) => this.changeValue(ev)}
                      value={this.state.userId}
                    />

                    <div className="error-wrapper">
                      {this.state.emptyUserId ? (
                        <span>Title is empty</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group-icon position-relative form-group col-md-6 px-2 pb-5">
                    <TextField
                      id="outlined-textarea"
                      label="Description"
                      placeholder="Description"
                      className="mt-0 mb-0 d-flex"
                      margin="normal"
                      variant="outlined"
                      name="Description"
                      // onChange={(ev) => this.changeValue(ev)}
                      value={this.state.lastname}
                    />
                  </div>

                  <div className="form-group-icon position-relative form-group col-md-6 px-2 pb-5">
                    <Box border={1} padding={5} width={500}>
                      <div className="form-own d-flex flex-wrap px-2 text-center justify-content-center">
                        <label
                          htmlFor="file-upload"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 10,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginRight: 5 }}
                          >
                            <path d="M21 15a1 1 0 0 1-1 1h-4.586l1.293 1.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1-.087-1.316l.087-.094 4-4a1 1 0 0 1 1.414 1.414L15.414 12H20a1 1 0 0 1 1 1z" />
                            <path d="M3 4v7a1 1 0 0 0 1 1h3.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4a1 1 0 0 0-1.414 1.414L7.586 9H4a1 1 0 0 0-1 1z" />
                          </svg>
                          {selectedFile ? (
                            <>
                              <Button
                                onClick={this.handleRemove}
                                style={{ marginRight: 5 }}
                              >
                                Remove
                              </Button>
                              {selectedFile.name}
                            </>
                          ) : (
                            "Add Files"
                          )}
                        </label>
                        <Input
                          type="file"
                          id="file-upload"
                          onChange={this.handleFileChange}
                          style={{ display: "none" }}
                          inputProps={{ accept: "image/*" }}
                        />
                      </div>
                    </Box>
                  </div>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      marginBottom: 10,
                      display: previewUrl ? "block" : "none",
                    }}
                  />

                  <div className="pb-3 px-3 col-12 text-center btn-wrapper">
                    <Button type="submit" variant="contained" color="primary">
                      Upload
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }
}

export default withRouter(FileUpload);
