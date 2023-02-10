import React from 'react'
import { Button, Image, Modal,Header } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

function ModalScrollingExample({active,setActive,profileData}) {
  const navigate = useNavigate();

  const handlehelp = ()=>{
    navigate("/transaction");
    setActive(false);
  }

  return (
    
    <div>
      {
        active &&
        <Modal 
        open={active}
        >
        <Modal.Header>User Profile</Modal.Header>
        <Modal.Content image>
          <Image size='medium' src={profileData.imageLink} wrapped />
          <Modal.Description>
            <h2> Title : </h2>
            <p> {profileData.postTitle}</p>
            <Header as ='h2' > Amount Needed </Header>
            <p> Rs. {profileData.amountRequired}/-</p>
            <h2>About My Issue: </h2>
            <p class='issue'>{profileData.postContent}</p>
            <a href={profileData.docLink} target="_blank" rel="noopener noreferrer">See Supporting Documents</a>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => setActive(false)}>
            Close
          </Button>
          <Button primary onClick={handlehelp}>
            Proceed to help
          </Button>
        </Modal.Actions>
      </Modal>
      }
    </div>

  )
}

export default ModalScrollingExample