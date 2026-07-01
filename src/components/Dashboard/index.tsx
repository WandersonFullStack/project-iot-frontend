import { useState, useEffect } from "react";
import { 
    Plus, 
    GalleryVerticalEnd, 
    Cpu, 
    ChevronUp, 
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import { plcService } from "../../services/deviceService";
import { PLCOut } from "../../types";

import { useAuth } from "../../contexts/index";
import { 
    Header, 
    CreateDevice, 
    AllDevices, 
    Plc, 
    CancelButton,
    Popup 
} from "../index";

import { 
    PageWrapper, 
    Content, 
    Menu, 
    Main,
    PlcList,
    MenuTitle,
    InsertMenu
} from "./styles";

type PropsPlc = {
    children?: React.ReactNode;
};

type ActiveView = "devices" | "plc";


export function Dashboard({children}: PropsPlc)  {

    const { user, logout } = useAuth();

    const [ addDevice, setAddDevice ] = useState(false);
    const [ listPlcs, setListPlcs ] = useState<PLCOut[]>([]);
    const [ loadList, setLoadList ] = useState(false);
    const [ menuOpen, setMenuOpen ] = useState(true);
    const [ activeView, setActiveView ] = useState<ActiveView>("devices");

    useEffect(() => {
        const loadListPlc = async () => {
            try {
                const response = await plcService.list();
                setListPlcs(response);
            } catch {
                setListPlcs([]);
            }
        };

        loadListPlc();
    }, []);

    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    const handleInsertMenu = () => {
        setMenuOpen(true);
    };

    const handleAddDevice = () => {
        setAddDevice(true);
    };

    const handleClosePopup = () => {
        setAddDevice(false);
    };

    const handleAllDevices = () => {
        setActiveView("devices");
    };

    const handleListPlcs = () => {
        setLoadList(true);
    };

    const handleListPlcsClose = () => {
        setLoadList(false);
    };

    const handlePlc = () => {
        setActiveView("plc")
    };
    

    return (
        <PageWrapper>
            <Header user={user} onLogout={logout} />
            
            <Main >
                {menuOpen ? (
                    <Menu>
                        <MenuTitle>
                            <h3> Menu </h3>
                            <button className="close-menu-button" onClick={handleCloseMenu}>
                                <ChevronLeft size={20} strokeWidth={2.5}/>
                            </button>
                        </MenuTitle>
                        
                        <div className="nav-section">
                            <a className="menu-link" onClick={handleAddDevice} >
                                <Plus size={16} /> 
                                New Device 
                            </a>
                            <a className="menu-link" onClick={handleAllDevices}>
                                <GalleryVerticalEnd size={16} />
                                Devices
                            </a>
                            <a className="menu-link" onClick={handleListPlcs}>
                                <Cpu size={16}/>
                                PLCs
                            </a>
                            <>
                                {loadList && (
                                    <PlcList>
                                        {children}
                                        {listPlcs.map((plc) => (
                                            <a className="nav-link" key={plc.id} onClick={handlePlc} >
                                                {plc.name}
                                            </a>
                                        ))}
                                        <button className="close-button" onClick={handleListPlcsClose}>
                                            <ChevronUp size={16}/>
                                        </button>
                                    </PlcList>
                                )}
                            </>
                        </div>
                    </Menu>
                ) : (
                    <InsertMenu >
                        <button className="insert-menu-button" onClick={handleInsertMenu}>
                            <ChevronRight size={20} strokeWidth={2.5}/>
                        </button>
                    </InsertMenu>
                )}

                
                
                <Content $menuOpen={menuOpen}>
                    {activeView === "devices" && 
                        <AllDevices />
                    }
                    
                    {activeView === "plc" && 
                        < >
                            {children}
                            {listPlcs.map((plc) => (
                                <Plc key={plc.id}
                                    controllerId={plc.id}/>
                            ))}
                        </>
                    }
                </Content>
            </Main>

            {addDevice && (
                <Popup>
                    <CreateDevice />
                    <CancelButton onClick={handleClosePopup}>Cancel</CancelButton>  
                </Popup>
            )}

        </PageWrapper>
    )
}