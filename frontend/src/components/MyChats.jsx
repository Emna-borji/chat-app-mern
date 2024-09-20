import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux"; // Importing useSelector to get user info
import GroupChatModal from "./GroupChatModal";
import SearchUsers from "./SearchUsers";
import AllChats from "./AllChats";
import MyConvo from "./MyConvo";

function MyChats() {
  const [fetchAgain, setFetchAgain] = useState(false);

  // Assuming your user is stored in the Redux store
  const { user } = useSelector((state) => state.authReducer); 

  // Check if user exists
  if (!user) {
    return (
      <MDBContainer fluid className="py-5" style={{ backgroundColor: "#CDC4F9" }}>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
              <MDBCardBody>
                <h4>Please log in to view your chats.</h4>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#CDC4F9" }}>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <div className="p-3">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "30px",
                      }}
                    >
                      <p>Chats</p>
                      <GroupChatModal />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "30px",
                      }}
                    >
                      <SearchUsers />
                    </div>

                    <div
                      style={{
                        position: "relative",
                        height: "400px",
                        overflowY: "scroll",
                      }}
                    >
                      <MDBTypography listUnStyled className="mb-0">
                        <AllChats fetchAgain={fetchAgain} />
                      </MDBTypography>
                    </div>
                  </div>
                </MDBCol>
                <MDBCol md="6" lg="7" xl="8">
                  <MyConvo fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default MyChats;
