import { useState } from "react";
import { useAuth } from "../../contexts/index";
import { Header, CreateDevice, AllDevices } from "../index";

import { 
    PageWrapper, 
    Content, 
    Menu, 
    Main, 
    AddDevicePopup, 
    AddDeviceForm, 
    ClosePopup 
} from "./styles";

export function Dashboard()  {

    const { user, logout } = useAuth();
    const [ addDevice, setAddDevice ] = useState(false);

    const handleAddDevice = () => {
        setAddDevice(true);
    }

    const handleClosePopup = () => {
        setAddDevice(false);
    }

    return (
        <PageWrapper>
            <Header user={user} onLogout={logout} />
            
            <Main>
                <Menu>
                    <div className="nav-section">
                        <a onClick={handleAddDevice} >Add Device</a>
                    </div>
                </Menu>
                
                <Content>
                    <AllDevices />
                </Content>
            </Main>

            {addDevice && (
                <AddDevicePopup>
                    <AddDeviceForm>
                        <CreateDevice />
                        <ClosePopup onClick={handleClosePopup}>Cancel</ClosePopup>  
                    </AddDeviceForm>
                </AddDevicePopup>
            )}

        </PageWrapper>
    )
}