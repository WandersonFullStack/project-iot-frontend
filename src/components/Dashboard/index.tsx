import { useState } from "react";
import { useAuth } from "../../contexts/index";
import { Header, CreateDevice } from "../index";

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
                    <a onClick={handleAddDevice} >
                        Add Device
                    </a>
                </Menu>
                
                <Content>

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