import { useState, useEffect } from "react";
import { Plus, GalleryVerticalEnd, Cpu, ChevronUp } from "lucide-react";

import { plcService } from "../../services/deviceService";
import { PLCOut } from "../../types";

import { useAuth } from "../../contexts/index";
import { Header, CreateDevice, AllDevices, Plc } from "../index";

import { 
    PageWrapper, 
    Content, 
    Menu, 
    Main, 
    AddDevicePopup, 
    AddDeviceForm, 
    ClosePopup 
} from "./styles";

type PropsPlc = {
    children?: React.ReactNode;
}


export function Dashboard({children}: PropsPlc)  {

    const { user, logout } = useAuth();
    const [ addDevice, setAddDevice ] = useState(false);
    const [ allDevices, setAllDevices ] = useState(false);
    const [ listPlcs, setListPlcs ] = useState<PLCOut[]>([]);
    const [ loadList, setLoadList ] = useState(false);

    const handleAddDevice = () => {
        setAddDevice(true);
    };

    const handleClosePopup = () => {
        setAddDevice(false);
    };

    const handleAllDevices = () => {
        setAllDevices(true);
    };


    useEffect(() => {
        const loadListPlc = async () => {
            try {
                const response = await plcService.list();
                setListPlcs(response);
            } catch (error) {
                return error
            }
        };

        loadListPlc();
    }, []);

    const handleListPlcs = () => {
        setLoadList(true);
    };

    const handleListPlcsClose = () => {
        setLoadList(false);
    };
    

    return (
        <PageWrapper>
            <Header user={user} onLogout={logout} />
            
            <Main>
                <Menu>
                    <h3>Menu </h3>
                    
                    <div className="nav-section">
                        <a onClick={handleAddDevice} >
                            Add Device 
                            <Plus size={18} /> 
                        </a>
                        <a onClick={handleAllDevices}>
                            All Devices
                            <GalleryVerticalEnd size={18} />
                        </a>
                        <a onClick={handleListPlcs}>
                            PLCs
                            <Cpu size={18}/>
                        </a>
                        <div>
                            {loadList && (
                                <ul>
                                    {children}
                                    {listPlcs.map((plc) => (
                                        <li key={plc.id}>{plc.name}</li>
                                    ))}
                                    <button onClick={handleListPlcsClose}><ChevronUp size={16}/></button>
                                </ul>
                            )}
                        </div>
                    </div>
                </Menu>
                
                <Content>
                    {allDevices && (
                        <AllDevices />
                    )}
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